# Express TypeScript Server

A simple Express server built with TypeScript.

## Features
- Express.js with TypeScript
- Nodemon for automatic server restarts
- tsconfig for TypeScript configuration

## Prerequisites
- [Node.js](https://nodejs.org/) (>= 20.x)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) or pnpm

## Installation
Install dependencies:
```sh
npm install  # or yarn/pnpm install
```

## Running the Server

Start the server in development mode:
```sh
npm run dev  # or yarn/pnpm dev
```

Start the server in production mode:
```sh
npm run build && npm start
```

## Project Structure
```
.
├── src
│   ├── index.ts       # Main server file
│   ├── models
│       ├── index.ts   # models
│   ├── routes
│       ├── index.ts   # API routes
├── dist               # Compiled JavaScript files
├── package.json       # Dependencies & scripts
├── tsconfig.json      # TypeScript configuration
└── vercel.json        # Vercel config for deployment
```

## API Endpoints
- **GET /coins** → Returns all supported coins
- **GET /coins/:id/:currency?** → Returns current price of a coin with given ID in the given currency (default to usd)
- **GET /chart/:id/:currency?** → Returns historical price data (24hrs) of a coin with given ID in the given currency (default to usd)


Example Request:
```sh
curl http://localhost:3456/coins
```

## Environment Variables
Get the demo-key from https://www.coingecko.com/en/developers/dashboard
*(im NOT supposed to leave the key here but for your own convenient: CG-XWUa1cf65pPYxNmRotZwZMYM)*

Create a `.env` file by copying `.env.sample`:
```
API_KEY=demo-key 
PORT=3456
```

