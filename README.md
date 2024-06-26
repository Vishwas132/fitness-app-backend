# Fitness App Backend

The backend APIs for a fitness logging application

## Background

This project involves developing the backend APIs for a fitness logging application using Node.js. The application allows users to sign up, log exercises, log body dimensions & weight, and includes authentication features such as login, logout, token refreshing, forgot password, reset password, send verification email, and email verification.

## Technology Stack
- Node.js framework: Express
- Database: PostgreSQL

## Setup and Installation

### Prerequisites
- Node.js (version 16 or higher)
- PostgreSQL (version 14 or higher)

### Installation Steps
1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/fitness-app-backend.git
    cd fitness-app-backend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Set up environment variables:
    - Create a `.env` file in the root directory and add your configuration settings (example below):
      ```
      PORT=3000
      DB_HOST=localhost
      DB_USER=your_db_user
      DB_PASS=your_db_pass
      DB_NAME=your_db_name
      JWT_SECRET=your_jwt_secret
      EMAIL_SERVICE=ethereal
      EMAIL_USER=your_email_user
      EMAIL_PASS=your_email_pass
      ```

4. Set up database and schema:
    - Create a database and schema (named `fitness_app`) in your PostgreSQL server, using psql or pgadmin.
    - Add you database credential to `.env` file (example below).
      ```
      DB_HOST=localhost
      DB_USER=your_db_user
      DB_PASS=your_db_pass
      DB_NAME=your_db_name
      SCHEMA_NAME=fitness_app
      ```

5. Database migration (if any) will autmatically run on the first time the server starts.

6. Run database seed data (if applicable):
    ```sh
    npm run seed
    ```

7. Start the server:
    ```sh
    npm start
    ```

### Running Unit Tests
- To run unit tests, use the following command:
    ```sh
    npm test
    ```

### Setting up email service
- If you want to use a third-party email service, you can set up it in the `.env` file.
- You can use [Ethereal](https://ethereal.email/) for testing purposes.
- Create an Ethereal account

- Then add your email service to the `.env` file.
      ```
      EMAIL_HOST=smtp.ethereal.email
      EMAIL_PORT=587
      ```
- Add your ethereal email user and password to the `.env` file.
      ```
      EMAIL_USER=your_ethereal_email_user
      EMAIL_PASS=your_ethereal_email_pass
      ```
- If you want to use gmail as your email service, add the following to the `.env` file.
      ```
      EMAIL_HOST=smtp.gmail.com
      EMAIL_PORT=465
      ```
- Add your gmail email user and app password to the `.env` file.
      ```
      EMAIL_USER=your_gmail_email_user
      EMAIL_PASS=your_gmail_app_pass
      ```
- App password is different from your gmail password. It is a temporary password that is generated for you.
- To generate an app password, follow the instructions [here](https://support.google.com/accounts/answer/185833?hl=en).

## API Documentation
- Import the provided Postman collection to explore the API endpoints.

## Contributing
- Fork the repository.
- Create a new branch (`git checkout -b feature/your-feature`).
- Commit your changes (`git commit -m 'Add some feature'`).
- Push to the branch (`git push origin feature/your-feature`).
- Open a Pull Request.

## License
This project is licensed under the MIT License.

