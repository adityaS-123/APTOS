# Decentralized Voting DApp on Aptos

A fully decentralized voting system built on the **Aptos blockchain**, leveraging smart contracts to create a transparent, tamper-proof voting mechanism. Users can create voting polls, cast their votes, and view results in a decentralized manner.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Smart Contract](#smart-contract)
- [DApp Architecture](#dapp-architecture)
- [Usage](#usage)
- [Security and Transparency](#security-and-transparency)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This Decentralized Voting DApp allows anyone to create, vote, and verify voting results securely on the Aptos blockchain. The application ensures transparency, immutability, and decentralization by utilizing Aptos smart contracts and Move language. This DApp is ideal for community governance, election systems, or any scenario requiring trustless voting.

## Features

- **Decentralized Poll Creation:** Users can create public voting polls with customizable options.
- **Vote Casting:** Registered users can cast their votes, which are immediately recorded on-chain.
- **Immutable Results:** Voting results are transparent and cannot be tampered with once recorded.
- **Gasless Voting Option:** Sponsor transactions for users who may not have Aptos tokens, making participation easier.
- **Transparency:** All voting actions are publicly verifiable on the Aptos blockchain.
- **Anonymous Voting:** Voters' identities can be protected using zero-knowledge cryptography for privacy.

## Technologies Used

- **Aptos Blockchain:** All data is stored and processed via smart contracts on the Aptos chain.
- **Move Language:** Used to write smart contracts for handling voting logic.
- **Aptos Keyless Integration:** Allows easy sign-in and participation without needing to manage private keys.
- **Frontend:** React.js for building the user interface.
- **Backend:** Node.js for server-side logic and API handling.
- **Wallet Integration:** Support for Aptos wallets like Petra and Martian for users to interact with the blockchain.

## Setup Instructions

### Prerequisites

Ensure you have the following tools installed:
- **Node.js** (v14.x or later)
- **Yarn or NPM** for package management
- **Aptos CLI** for interacting with the blockchain
- **Aptos Account** with devnet or testnet tokens

### Steps

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/username/Decentralized-Voting-DApp-Aptos.git
   cd Decentralized-Voting-DApp-Aptos
   cd Frontend
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
   ```

3. **Run the Application:**
   ```bash
   npm start
   # or
   yarn start
   ```
   The DApp will be accessible on `http://localhost:3000`.

## Smart Contract

The core logic of the DApp is managed through a Move smart contract deployed on the Aptos blockchain. The contract supports:
- Poll creation with unique identifiers
- Secure vote casting tied to blockchain addresses
- Vote counting and result tallying

- **Contract Address(Devnet)** - 957b1b97afbd41f9ea44d559c4787dff0b7e816bd3c856df897f349a937fc9d5

### Key Functions:

- **create_poll**: Allows users to create a new poll.
- **cast_vote**: Allows registered users to cast a vote on an active poll.
- **get_poll_results**: Fetches the results of a specific poll.
  
You can find the complete contract code in the `contracts/` directory.

## DApp Architecture

The DApp consists of three main components:
1. **Frontend (React.js):** A user-friendly interface for creating polls, voting, and viewing results.
2. **Backend (Node.js):** Handles off-chain activities like user management and transaction sponsorship.
3. **Smart Contract (Move Language):** The decentralized logic that records poll creation and votes.

## Usage

### Create a Poll:
1. Navigate to the "Create Poll" page.
2. Enter the poll title and voting options.
3. Set the deadline for the poll and create it.

### Vote:
1. Choose an active poll from the list.
2. Select an option and cast your vote.
3. Your vote will be recorded on-chain.

### View Results:
1. Navigate to a completed poll.
2. View the final, immutable voting results.

## Security and Transparency

- **Immutable Data:** All votes are stored on the blockchain and cannot be altered once cast.
- **Anonymity:** Voter identities can be protected via zero-knowledge proofs (optional).
- **Transparency:** Every transaction can be verified publicly through the Aptos blockchain explorer.

## Future Improvements

- **Multi-Signature Poll Creation:** Require multiple signers for poll creation to ensure greater trust.
- **Enhanced Privacy Features:** Implement fully private voting through advanced cryptography like zk-SNARKs.
- **Cross-Chain Voting:** Enable users from different blockchains to participate in a single poll.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements, bug fixes, or new features.

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a pull request.

## License

Distributed under the MIT License. See `LICENSE` for more information.

