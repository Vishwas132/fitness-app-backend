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
      DATABASE_URL=your_database_url
      JWT_SECRET=your_jwt_secret
      EMAIL_SERVICE=ethereal
      EMAIL_USER=your_email_user
      EMAIL_PASS=your_email_pass
      ```

4. Run database seed data (if applicable):
    ```sh
    npm run seed
    ```

5. Start the server:
    ```sh
    npm start
    ```

### Running Unit Tests
- To run unit tests, use the following command:
    ```sh
    npm test
    ```

## API Documentation
- import the provided Postman collection to explore the API endpoints.

## Contributing
- Fork the repository.
- Create a new branch (`git checkout -b feature/your-feature`).
- Commit your changes (`git commit -m 'Add some feature'`).
- Push to the branch (`git push origin feature/your-feature`).
- Open a Pull Request.

## License
This project is licensed under the MIT License.

