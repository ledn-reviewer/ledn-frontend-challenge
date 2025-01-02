<div align='center'>
  <img width='100%' src='https://blog.ledn.io/hs-fs/hubfs/Ledn_Animation_short-1.gif?width=1017&name=Ledn_Animation_short-1.gif'/>
  <br><br>
  <h3>Where digital assets come to life</h3>
  <br><br>
  <h1>Frontend technical challenge</h1>
</div>

## Introduction
Welcome to the Ledn frontend technical challenge! This challenge was designed to try to reproduce challenges Ledn faces actively.

To make this experience both engaging and relevant, we've infused the challenge with a touch of creativity, drawing inspiration from the Star Wars theme.

## Starting and submitting the application
1. Create a new private repository on your personal GitHub account.
2. Copy the content of Ledn challenge in your new private repository.
3. Install dependencies with `npm install`.
4. Start the application using `npm start`.
5. Open [http://localhost:3000](http://localhost:3000) in your browser to test the app.
6. Invite `ledn-reviewer` to your project once it is ready.
7. Email your contact at Ledn with a confirmation that ledn-reviewer has been added as a contributor and your project is ready for review.
8. Please include a screen capture of your solution, so we can assess whether there is differences between your environment and ours.
9. While we advocate the use of AI on our day to day at Ledn, in the case of this interview challenge, we expect it to be entirely done by you, the developer. 
   1. Keep in mind that we reserve ourselves the right to immediately dismiss a candidate if we suspect its challenge has been coded by an AI.
10. Around 5 to 6 hours are expected to be invested in the challenge.

## The challenge
### Introduction
Welcome to the Coruscant Bank's engineering department. In a galaxy far, far away, following the fall of the Empire, the financial landscape is in disarray, and you, esteemed engineer, have been entrusted with a crucial mission.

You are now responsible for managing the financial affairs of high-net-worth clients in the tumultuous aftermath of the Empire's collapse. Your role is pivotal as you navigate through the remnants of the Imperial financial system to bring order to the chaos left in its wake.

As the chosen engineer, you have access to critical information:

* **Users:** A roster of high-net-worth individuals whose fortunes are entwined with the fate of the galaxy.

* **Planets:** The vast array of planets where Coruscant Bank operates, each with its unique economic challenges and opportunities.

* **Transactions:** Detailed records of your clients' financial transactions, recorded in both the now obsolete "Imperial Crown Standard" and the widely accepted "Galactic Credit Standard".

* **Exchange rates:** The fluctuating exchange rates between the "Imperial Crown Standard" and the "Galactic Credit Standard", adding an extra layer of complexity to financial reconciliation.

In the wake of the Empire's fall, the Republic has turned to Coruscant Bank to aid in rectifying the administrative chaos left behind. Your mission is to build the foundation of the administrative application, which will eventually ensure the seamless transition of high-net-worth clients into the new era.

## Requirements

Your task is to design the foundation of a responsive user interface capable of identifying planets susceptible to uprisings and enabling proactive intervention. The objective is to build a UI that assists administrators in analyzing transactions across various planets. To meet this goal, adhere to the following guidelines:

1. **Summary**
  - The administrators would like to see a summary of all the planets of the galaxy.
  - From those planets, they would like to be able to search for a planet by its name.

2. **Detail**
  - The administrators would like to access detailed information of the planet.
  - They would like to filter the transactions by its currency type (GSC (Galactic Credit Standard) and ICS (Imperial Crown Standard)).
  - They would like to see each transaction in each currency (GSC and ISC) according to a real-time exchange rate.
  - They would like to see the total amount transacted (displayed in both GSC and in ISC).

### Technical requirements
To ensure the success of your mission, adopt the following technical specifications:

* **Technologies & languages:**
  - Use `React Query` to execute all the requests to the endpoints.
  - Build the solution using `Typescript` and `React`.
  - In order to allow us to review a similar set of challenges, do not update, change or edit the mock server.
  - You're free to add more libraries to package.json that you feel are important for this project, except for:
    - UI component libraries. In order to allow us to review a similar set of challenges, use only Mantine (already included in package.json).

* **User interface:**
  - Organize the UI to the best of your knowledge and judgment as if this was a real application.
  - Ensure the UI is responsive, even in very small screens.
  - In order to allow us to review HTML and CSS knowledge, the component to filter the transactions by its currency type should be coded from scratch, without using the UI component libraries.

* **Flexible requirements:**
You MUST choose 2 of the following requirements:

  - Implement a solution capable of turning all transactions with a status of `inProgress` for a given planet to `blocked` using a planet ID.
  - Add additional controls to filter the planets by terrain and climate.
  - Create the UI from scratch without using any UI component libraries.
  - Add multiple languages to the application.
    - This should be built from scratch, without the addition of a i18n library for it (such as react-i18next or react-intl).
  - Add automated tests.
 
* **Testing and validation:**
  - Provide screenshots or recording of the final implementation.
  - Provide comprehensive guidelines for testing your data architecture.
  - Include step-by-step instructions for starting the solution.
  - Provide which flexible requirements you have chosen.

## Technical documentation
### Backend data information
* ExchangeRate:
  * `rate`: Value of ICS in the GCS currency

* Planet:
  * `id`: Unique ID of the planet
  * `residents`: List of IDs belonging to users

* User:
  * `id`: Unique ID of the user
  * `homeworld`: ID of the homeworld of a user

* Transaction:
  * `id`: Unique transaction ID
  * `user`: ID of the user the transaction belongs to
  * `amount`: Amount of a given transaction
  * `currency`: Currency of the transaction (either `ICS` or `GCS`)
  * `date`: Date in ISO-8601 format
  * `status`: Status of the transaction which can be `inProgress`, `completed` or `blocked`

### Swagger
#### PLANETS
##### Get all planets
* **Endpoint**: `/api/planets`
* **Method**: GET
* **Description**: Retrieve all planets.
* **Response**:
```json
{
  "planets": [
    {
      "name": "Planet 1",
      "rotation_period": "24",
      "orbital_period": "365",
      "diameter": "12742",
      "climate": "temperate",
      "gravity": "1",
      "terrain": "grasslands",
      "surface_water": "40",
      "population": "1000000000",
      "residents": [],
      "films": [],
      "created": "2024-01-18T12:00:00Z",
      "edited": "2024-01-18T12:00:00Z",
      "id": "1"
    },
    // ... other planets ...
  ]
}
```

##### Get planet by ID
* **Endpoint**: `/api/planets/:id`
* **Method**: GET
* **Description**: Retrieve a planet by ID.
* **Parameters**:
  * **id** (path): ID of the planet.
* **Response**:
```json
{
  "name": "Planet 1",
  "rotation_period": "24",
  "orbital_period": "365",
  "diameter": "12742",
  "climate": "temperate",
  "gravity": "1",
  "terrain": "grasslands",
  "surface_water": "40",
  "population": "1000000000",
  "residents": [],
  "films": [],
  "created": "2024-01-18T12:00:00Z",
  "edited": "2024-01-18T12:00:00Z",
  "id": "1"
}
```

#### USERS
##### Get all users
* **Endpoint**: `/api/users`
* **Method**: GET
* **Description**: Retrieve all users.
* **Response**:
```json
{
  "users": [
    {
      "name": "User 1",
      "height": "170",
      "mass": "70",
      // ... other user properties ...
      "id": "1"
    },
    // ... other users ...
  ]
}
```

##### Get user by ID
* **Endpoint**: `/api/users/:id`
* **Method**: GET
* **Description**: Retrieve a user by ID.
* **Parameters**:
  * **id** (path): ID of the user.
* **Response**:
```json
{
  "name": "User 1",
  "height": "170",
  "mass": "70",
  // ... other user properties ...
  "id": "1"
}
```

##### Get users by homeworld
* **Endpoint**: `/api/users/planet/:planetId`
* **Method**: GET
* **Description**: Retrieve users by homeworld.
* **Parameters**:
  * **planetId** (path): ID of the homeworld planet.
* **Response**:
```json
{
  "users": [
    {
      "name": "User 1",
      "height": "170",
      "mass": "70",
      // ... other user properties ...
      "id": "1"
    },
    // ... other users ...
  ]
}
```
#### TRANSACTIONS
##### Get all transactions
* **Endpoint**: `/api/transactions`
* **Method**: GET
* **Description**: Retrieve all transactions.
* **Response**:
```json
{
  "transactions": [
    {
      "id": "1",
      "user": 1,
      "amount": 100,
      "currency": "GCS",
      "date": "2024-01-18T12:00:00Z"
    },
    // ... other transactions ...
  ]
}
```
##### Get transaction by ID
* **Endpoint**: `/api/transactions/:id`
* **Method**: GET
* **Description**: Retrieve a transaction by ID.
* **Parameters**:
  * **id** (path): ID of the transaction.
* **Response**:
```json
{
  "id": "1",
  "user": 1,
  "amount": 100,
  "currency": "GCS",
  "date": "2024-01-18T12:00:00Z"
}
```

##### Get transactions by user ID
* **Endpoint**: `/api/transactions/user/:userId`
* **Method**: GET
* **Description**: Retrieve transactions by user ID.
* **Parameters**:
  * **userId** (path): ID of the user.
* **Response**:
```json
{
  "transactions": [
    {
      "id": "1",
      "user": 1,
      "amount": 100,
      "currency": "ICS",
      "date": "2024-01-18T12:00:00Z",
      "status": "inProgress"
    },
    // ... other transactions ...
  ]
}
```

##### Get transactions for multiple user IDs
* **Endpoint**: `/api/transactions/users/:userIds`
* **Method**: GET
* **Description**: Retrieve transactions by user ID.
* **Parameters**:
  * **userIds** (path): ID of the user.
* **Response**:
```json
{
  "transactions": [
    {
      "id": "1",
      "user": 1,
      "amount": 100,
      "currency": "ICS",
      "date": "2024-01-18T12:00:00Z",
      "status": "inProgress"
    },
    // ... other transactions ...
  ]
}
```

##### Update batch of transactions
* **Endpoint**: `/api/transactions/update-batch`
* **Method**: PUT
* **Description**: Update a batch of transactions at once.
* **Request payload**:
```json
{
  "transactions": [
    {
      "id": "1",
      "user": 1,
      "amount": 150,
      "currency": "USD",
      "date": "2024-01-18T12:00:00Z",
      "status": "processed"
    },
    // ... other transactions in the batch
  ]
}
```

* **Response**:
```json
{
  "message": "Batch of transactions updated successfully"
}
```

#### EXCHANGE RATE
##### Get exchange rate
* **Endpoint**: `/api/exchange-rate`
* **Method**: GET
* **Description**: Retrieve the current exchange rate between GCS and ICS. The rate is how many GCS (Galactic Credit Standard) it takes to amount to 1 ICS (Imperial Crown Standard)
* **Response**:
```json
{
  "rate": "1.123456"
}
```

<div align='center'>
  <h3>Do not hesitate to send us any questions if you have any.</h3>
  <h1>May the Force be with you!</h1>
</div>