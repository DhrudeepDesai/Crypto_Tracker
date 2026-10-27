import { CryptoApiResponse } from '../models/Crypto';

/**
 * Retrieves a paginated list of cryptocurrencies.
 * @param start Starting index (e.g., 0, 100, 200...).
 * @param limit Number of results to retrieve (max 100).
 */
export const getCryptoList = async (
  start: number = 0,
  limit: number = 100
): Promise<CryptoApiResponse[]> => {
  const url = `https://api.coinlore.net/api/tickers/?start=${start}&limit=${limit}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error fetching cryptocurrency list: ${response.status}`);
  }

  const json = await response.json();
  return json.data;
};

/**
 * Searches for a cryptocurrency by ID by traversing result pages until it is found.
 * This method makes paginated requests until the cryptocurrency is found or there are no more pages.
 */
export const getCryptoDetails = async (id: string): Promise<CryptoApiResponse> => {
  const pageSize = 100;
  let start = 0;
  let maxCoins = 2000; // You can adjust this if you know how many there are.

  while (start < maxCoins) {
    const list = await getCryptoList(start, pageSize);
    const coin = list.find(c => c.id === id);

    if (coin) return coin;

    start += pageSize;
  }

  throw new Error(`Cryptocurrency with id ${id} not found`);
};
