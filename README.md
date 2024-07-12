# Ethereum ATM DApp

This project demonstrates a simple Ethereum ATM decentralized application (DApp) using Solidity, Hardhat, and React. Users can connect their MetaMask wallet to deposit and withdraw funds from the smart contract.

## Table of Contents
- [Overview](#overview)
- [Smart Contract](#smart-contract)
- [Deployment](#deployment)
- [Front-End](#front-end)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [License](#license)

## Overview
The project consists of three main parts:
1. **Smart Contract**: A Solidity contract for managing deposits and withdrawals.
2. **Deployment Script**: A Hardhat script for deploying the smart contract.
3. **Front-End**: A React application that interacts with the smart contract using MetaMask.

## Smart Contract
The Solidity smart contract `Assessment.sol` includes:
- `deposit(uint256 deposit_amount)`: Allows the contract owner to deposit funds.
- `withdraw(uint256 withdraw_amount)`: Allows the contract owner to withdraw funds, with an error for insufficient balance.
- `get_balance()`: Returns the current contract balance.

## Deployment
The Hardhat deployment script `deploy.js`:
- Deploys the `Assessment` smart contract with an initial balance.
- Logs the deployed contract address.

## Front-End
The React front-end:
- Connects to the user's MetaMask wallet.
- Displays the connected account and contract balance.
- Provides buttons for depositing and withdrawing funds.

## Getting Started

### Prerequisites
- Node.js
- MetaMask extension for your browser

### Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/ethereum-atm-dapp.git
    cd ethereum-atm-dapp
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Compile the smart contract:
    ```bash
    npx hardhat compile
    ```

4. Deploy the smart contract:
    ```bash
    npx hardhat run scripts/deploy.js --network localhost
    ```

5. Start the React application:
    ```bash
    npm start
    ```

## Usage
1. Open the application in your browser.
2. Connect your MetaMask wallet.
3. View your account and contract balance.
4. Use the buttons to deposit and withdraw funds.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Feel free to customize this README file according to your project's specifics and personal preferences. If you have any questions or run into any issues, please open an issue in this repository.

# week3_Module2
