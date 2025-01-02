// mirage/server.ts
import { createServer, Model, Factory } from 'miragejs';
import planets from './mockData/planets';
import users from './mockData/users';
import transactions from './mockData/transactions';

// DO NOT CHANGE THIS FILE (INCLUDING EXPORTING THE TYPES).
// Treat this file as if it lived in a separate codebase that you can't change or share.
interface ExchangeRate {
  rate: string;
}

interface Planet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  id: string;
}

interface User {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  id: string;
}

interface Transaction {
  id: string;
  user: number; // Assuming user reference by id
  amount: number;
  currency: string;
  date: string;
  status: string;
}

export function makeServer({ environment = 'development' } = {}) {
  let server = createServer({
    environment,

    models: {
      planet: Model.extend<Planet[]>([]),
      user: Model.extend<User[]>([]),
      transaction: Model.extend<Transaction[]>([]),
      exchangeRate: Model.extend<ExchangeRate>({
        rate: '1.000000',
      }),
    },

    factories: {
      exchangeRate: Factory.extend<ExchangeRate>({
        rate: '1.000000',
      }),
    },

    seeds(server) {
      server.createList('exchangeRate', 1);
      planets.forEach((planet) => {
        server.create('planet', planet);
      });
      users.forEach((user) => {
        server.create('user', user);
      });
      transactions.forEach((transaction) => {
        server.create('transaction', transaction);
      });
    },

    routes() {
      this.namespace = 'api';

      // PLANETS
      this.get('/planets', (schema: any) => {
        const planetsData = schema.planets.all();
        return {
          planets: planetsData.models,
        };
      });

      this.get('/planets/:id', (schema: any, request) => {
        const id = request.params.id;
        const planet = schema.planets.find(id);

        if (planet) {
          return planet;
        } else {
          return {
            error: 'Planet not found',
          };
        }
      });

      // USERS
      this.get('/users', (schema: any) => {
        return {
          users: schema.users.all().models,
        };
      });

      // Fetch user by ID
      this.get('/users/:id', (schema: any, request) => {
        const id = request.params.id;
        const user = schema.users.find(id);

        if (user) {
          return user;
        } else {
          return {
            error: 'User not found',
          };
        }
      });

      // Fetch users by homeworld
      this.get('/users/planet/:planetId', (schema: any, request) => {
        const homeworld = request.params.planetId;
        const users = schema.users.where({ homeworld }).models;

        return {
          users,
        };
      });

      // TRANSACTIONS
      this.get('/transactions', (schema: any) => {
        return {
          transactions: schema.transactions.all().models,
        };
      });

      // Fetch transaction by ID
      this.get('/transactions/:id', (schema: any, request) => {
        const id = request.params.id;
        const transaction = schema.transactions.find(id);

        if (transaction) {
          return transaction;
        } else {
          return {
            error: 'Transaction not found',
          };
        }
      });

      // Fetch transactions by user ID
      this.get('/transactions/user/:id', (schema: any, request) => {
        const userId = request.params.id;
        const transactions = schema.transactions.where({ user: userId }).models;

        return {
          transactions,
        };
      });

      // Fetch transactions by a list of user IDs
      this.get('/transactions/users/:ids', (schema: any, request) => {
        const userIds = JSON.parse(request.params.ids);
        
        // Retrieve transactions for the specified user IDs
        const transactions = schema.transactions.where((transaction: Transaction) => userIds.includes(transaction.user)).models;

        return {
          transactions,
        };
      });

      // Update batch of transactions
      this.put('/transactions/update-batch', (schema: any, request) => {
        const requestData = JSON.parse(request.requestBody);
        const updatedTransactions = requestData.transactions;

        // Update each transaction in the batch
        updatedTransactions.forEach((updatedTransaction: Transaction) => {
          const existingTransaction = schema.transactions.find(updatedTransaction.id);

          if (existingTransaction) {
            existingTransaction.update(updatedTransaction);
          }
        });

        return {
          message: 'Batch of transactions updated successfully',
          transactions: updatedTransactions,
        };
      });

      // EXCHANGE RATE
      this.get('/exchange-rate', (schema: any) => {
        const latestRate = schema.first('exchangeRate') as ExchangeRate;
        return {
          rate: latestRate.rate,
        };
      });
    },
  });

  // Function to simulate rate variation between two currencies
  function simulateRateVariation(baseRate: string): string {
    const base = parseFloat(baseRate);
    const maxVariation = 0.01; // Maximum allowed variation from the base rate

    // Generate a random variation between -maxVariation and maxVariation
    const variation = Math.random() * maxVariation * 2 - maxVariation;

    // Calculate the new rate ensuring it stays close to a 1.5 ratio
    const updatedRate = base * (1 + variation);

    // Format the rate as a string with a maximum of 6 decimals
    const formattedRate = updatedRate.toFixed(6);

    return formattedRate;
  }

  // Update the exchange rate every second
  function updateExchangeRate(): void {
    const latestRate = server.schema.first('exchangeRate');
    const updatedRate = simulateRateVariation(latestRate!.rate);
    latestRate!.update({ rate: updatedRate });
  }

  // Update the exchange rate every second
  setInterval(updateExchangeRate, 1000);

  return server;
}
