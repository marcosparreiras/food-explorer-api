# Food Explorer API

Backend of a digital menu application for a fictional restaurant, named Food Explorer.

## Getting Started

Follow these steps to set up and run the Food Explorer API on your local machine:

1. Clone this repository:

    ```bash
    git clone https://github.com/marcosparreiras/food-explorer-api.git
    ```

2. Install dependencies using your preferred package manager:

    ```bash
    npm install
    # or
    yarn install
    ```

3. Run the database migrations:

    ```bash
    npx knex migrate:latest
    ```

4. Start the server:

    ```bash
    npm run dev
    # or
    yarn dev
    ```

5. Create a `.env` file similar to the example provided, and add your `PORT` and `AUTH_SECRET`.

## How to Use

### As an Admin:

Log in with the admin account:

-   Email: admin@test.com
-   Password: 123456

Experiment by:

-   Creating new dishes
-   Editing existing dishes

### As a Customer:

Create your account and log in.
Experiment by:

-   Searching for the dishes

## API Details

### Database

The database consists of 3 entities:

| Entity          | Field       | Type                             |
| --------------- | ----------- | -------------------------------- |
| **users**       | id          | Integer                          |
|                 | name        | String                           |
|                 | password    | String                           |
|                 | email       | String                           |
|                 | role        | Enum ('admin', 'customer')       |
|                 | created_at  | DateTime                         |
|                 | updated_at  | DateTime                         |
| **meals**       | id          | Integer                          |
|                 | image       | String                           |
|                 | name        | String                           |
|                 | description | String                           |
|                 | price       | Float                            |
|                 | category    | Enum ('meal', 'desert', 'drink') |
|                 | user_id     | Integer                          |
|                 | created_at  | DateTime                         |
|                 | updated_at  | DateTime                         |
| **Ingredients** | id          | Integer                          |
|                 | name        | String                           |
|                 | meal_id     | Integer                          |

### Routes

This API provides eight essential routes for managing users and meals:

-   **POST /users**: Create a new user.
-   **POST /sessions**: Perform user authentication.
-   **GET /meals**: List available dishes.
-   **POST /meals**: Create a new dish.
-   **GET /meals/:id**: Read details about a specific dish.
-   **PUT /meals/:id**: Edit an existing dish.
-   **PATCH /meals/:id/image**: Add or change the photo of a dish.
-   **DELETE /meals/:id**: Delete an existing dish.

# Deploy

[FoodExplorerApi](URL)
