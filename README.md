# CryptoTracker

> A cross-platform mobile app for exploring cryptocurrency prices in USD.

CryptoTracker lets you browse cryptocurrency listings, narrow them down with search and price filters, and open a dedicated view for each currency.

## What you can do

| Feature | Description |
| --- | --- |
| Browse prices | View cryptocurrency listings and their prices in USD. |
| Search | Find currencies by name or symbol. |
| Filter by price | Set minimum and maximum prices to refine the list. |
| View details | Open an individual cryptocurrency detail screen. |
| Use across platforms | Run the app on iOS or Android. |

## Built with

- **React Native** and **Expo**
- **TypeScript**
- **Expo Router**
- Object-oriented programming (OOP)

## Before you begin

Install **Node.js** and **npm**. The project also lists Expo CLI as a prerequisite:

```bash
npm install -g expo-cli
```

## Get started

Clone the repository, install its dependencies, and start Expo:

```bash
git clone https://github.com/sebas9526/CryptoTracker.git
cd CryptoTracker
npm install
npm start
```

Expo opens its dashboard in your browser. From there, you can:

- Scan the QR code using Expo Go on iOS or Android.
- Launch an emulator through Android Studio or Xcode, if configured.

## Web development and CORS

When testing in a web browser, an external cryptocurrency API may block cross-origin requests (CORS). For development, you can try a temporary public CORS proxy by prefixing the API URL:

```text
https://cors-anywhere.herokuapp.com/https://api.example.com
```

> **Note:** This proxy requires prior activation on its website and is not recommended for production use.

For a more robust approach, create a small Node.js backend that requests data from the API and provides it to the app. For example, an Express server could look like this:

```js
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(cors());

app.get('/api/crypto', async (req, res) => {
  const response = await axios.get('https://api.example.com/cryptos');
  res.json(response.data);
});

app.listen(3000, () => console.log('Proxy server running at http://localhost:3000'));
```

## Run tests

```bash
npm test
```
