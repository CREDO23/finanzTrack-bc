# FinanzTrack API

The FinanzTrack API serves as the backend for the FinanzTrack financial tracking application, providing endpoints for managing financial data. Whether you're developing additional features for FinanzTrack or integrating it into your own project, this API offers a flexible foundation.

Author: BAKERA Thierry <bakerathierry@gmail.com>


### GETTING STARTED

#### Prerequisites

1. Node.js installed on your machine
2. Postgresql installed and started on your machine :
    - create a database
    - create a user with a password and grant access to the database

#### Installation

1. **Clone the repository**:
```bash
    git clone https://github.com/CREDO23/finanzTrack-fr.git
```
2. **Install dependencies**
```bash
    cd finanzTrack-bc
    pnpm install
```
3. **Set up environment variables**:
Copy the `.env.example` file to `.env` and provide the necessary configuration values, including your PostgreSQL connection string.
4. Start the server
```bash
    pnpm start:dev
```

*The API should now be running at http://localhost:6500.*


### API ENDPOINTS

#### Authentication

- [POST] api/v1/auth/register : Register a new account
- [POST] api/v1/auth/login : Login an existing account


#### Transactions

- [GET] api/v1/transactions/ : Get a list of all transactions
- [POST] api/v1/transactions/ : Create a new transaction

#### Transaction categories

- [GET] api/v1/transaction_categories/ : Get a list of all transaction categories
- [POST] api/v1/transaction_categories/ : Create a new transaction category


#### Transaction category types

- [GET] api/v1/transaction_category_types/ : Get a list of all transaction category types


### CONTRIBUTING

We welcome bug reports, feature requests, and pull requests.
