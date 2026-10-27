// src/hooks/useCryptoData.ts

import { useEffect, useState } from 'react';
import { Crypto, CryptoApiResponse } from '../models/Crypto';

/**
 * Custom hook for retrieving and managing cryptocurrency data.
 *
 * This hook retrieves data from a public cryptocurrency API and manages the loading state,
 * error state, and retrieved data. It returns the data, loading state, and error.
 *
 * @returns {Object} Object with the following properties:
 * - `data`: Cryptocurrency data retrieved from the API.
 * - `loading`: State indicating whether the data is loading.
 * - `error`: Error message if a problem occurred while retrieving the data.
 */
export const useCryptoData = () => {
  // State for storing cryptocurrency data
  const [data, setData] = useState<CryptoApiResponse[]>([]);

  // State indicating whether the data is loading
  const [loading, setLoading] = useState(true);

  // State for storing a possible error
  const [error, setError] = useState<string | null>(null);

  // useEffect to make the API request when the component mounts
  useEffect(() => {
    // Asynchronous function that retrieves data from the API
    const fetchData = async () => {
      try {
        // Make the API request
        const res = await fetch('https://api.coinlore.net/api/tickers/');
        const json = await res.json();

        // Map the response data and create instances of the Crypto class
        const cryptos = json.data.map(
          (item: any) =>
            new Crypto(item.id, item.name, item.rank, item.symbol, item.price_usd, item.percent_change_24h)
        );

        // Update the state with the cryptocurrency data
        setData(cryptos);
      } catch (err) {
        // If an error occurs, catch it and set the error message
        console.error('Error fetching cryptocurrencies:', err);
        setError('Error fetching cryptocurrencies');
      } finally {
        // Update the loading state when loading finishes
        setLoading(false);
      }
    };

    // Call the fetchData function
    fetchData();
  }, []); // The empty array ensures this runs only once when the component mounts

  // Return the data, loading state, and error
  return { data, loading, error };
};
