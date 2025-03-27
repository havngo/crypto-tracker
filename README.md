# Cryptocurrency Price Tracker

A simple cryptocurrency price tracker that fetches real-time prices using a public API.

## Features
### **Back-end:**
- RESTful API using Node.js (Express)
- Fetch the current price of a cryptocurrency (e.g., BTC, ETH) from CoinGecko
- Store and retrieve price history using an in-memory store

### **Front-end:**
- User interface built with React
- Input field to enter a cryptocurrency symbol (e.g., BTC, ETH).
- Display the current price of the selected cryptocurrency.
- Show a simple price history chart.

### **Deployment:**
- Hosted on a platform Vercel.
- Clear instructions on how to access the deployed app.

## Installation & Setup

### **Back-end Setup**
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/crypto-tracker.git
   cd crypto-tracker/server
   ```
2. Install dependencies:
   ```sh
   npm install  # or yarn install
   ```
3. Start the server:
   ```sh
   npm run dev  # or yarn dev
   ```
4. API runs on `http://localhost:3456`

### **Front-end Setup**
1. Navigate to the front-end directory:
   ```sh
   cd ../client
   ```
2. Install dependencies:
   ```sh
   npm install  # or yarn install
   ```
3. Start the front-end:
   ```sh
   npm start  # or yarn start
   ```
4. Open `http://localhost:3000` in the browser.

## Deployment Instructions
- React App: crypto-tracker-client.vercel.app 
- Express Server: crypto-tracker-server-seven.vercel.app


