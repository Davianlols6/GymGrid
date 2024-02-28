## Prerequisites

Before running the tests, ensure that the following dependencies are installed:

- Node.js
- npm (Node Package Manager)

## Clone the Repository

1. Open Visual Studio Code (VSCode) on your local machine.

2. Click on the "Source Control" icon in the left sidebar (the icon looks like a branch).

3. Click on the "Clone Repository" button.

4. In the repository URL input field, enter `https://github.com/Davianlols6/GymGrid`.

5. Choose a local directory where you want to clone the repository.

6. Click on the "Clone" button to start the cloning process.

## Set Up the Environment

1. In the project root directory, create a new file named `.env`.

2. Open the `.env` file in a text editor.

3. Copy the following example environment variables into the `.env` file:

    ```plaintext
    DB_HOST=<your_database_host>
    DB_USER=<your_database_user>
    DB_PASSWORD=<your_database_password>
    DB_DATABASE=<your_database_name>
    JWT_SECRET_KEY=<your_secret_key>
    JWT_EXPIRES_IN=<your_preferred_expire_timelimit>
    JWT_ALGORITHM=<your_preferred_algorithm>
    ```

    For example:

    ```plaintext
    DB_HOST="localhost"
    DB_USER="root"
    DB_PASSWORD="1234"
    DB_DATABASE="trees"
    JWT_SECRET_KEY="dsfdsfsdfsd"
    JWT_EXPIRES_IN=24h
    JWT_ALGORITHM=HS256
    ```

   Update the values of the environment variables according to your PostgreSQL database configuration.

## Install Dependencies For Backend

1. Open the terminal in VSCode by going to `View` > `Terminal` or using the shortcut `Ctrl + ``.

2. Navigate to the project root directory.

3. Install the required dependencies using npm:

   ```
   cd api
   npm install
   ```

## Install Dependencies For Frontend

1. Open the terminal in VSCode by going to `View` > `Terminal` or using the shortcut `Ctrl + ``.

2. Navigate to the project root directory.

3. Install the required dependencies using npm:

   ```
   cd client
   npm install
   ```

## Database Initialization

1. Make sure you have a PostgreSQL database available. Update the database configuration details in the `.env` file.

2. To initialize the database tables and populate them with sample data, open the terminal in VSCode and run the following command:

   ```
   cd api
   npm run inittables
   ```

## Running The Site For Development

1. Start the backend express server using the terminal:

    ```
    cd api
    npm run dev
    ```

2. Start the frontend next.js server using another terminal:

    ```
    cd client
    npm run dev
    ```

3. To access the project using the web browser, use the main entry endpoint which would be the port of the backend express server. In this case it would be ```http://localhost:3100```