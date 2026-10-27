// src/models/Crypto.ts

/**
 * Interface defining the structure of the cryptocurrency API response.
 *
 * This interface is used to type data received from the public cryptocurrency API
 * and provides the fields needed to represent cryptocurrency information.
 */
export interface CryptoApiResponse {
  id: string;  // Unique cryptocurrency ID
  symbol: string;  // Cryptocurrency symbol (for example, 'BTC', 'ETH')
  name: string;  // Cryptocurrency name (for example, 'Bitcoin', 'Ethereum')
  nameid: string;  // Cryptocurrency name ID
  rank: number;  // Cryptocurrency ranking position (for example, 1 for Bitcoin)
  price_usd: string;  // Current price in USD
  percent_change_24h: string;  // Percentage change over the last 24 hours
  percent_change_1h: string;  // Percentage change over the last hour
  percent_change_7d: string;  // Percentage change over the last 7 days
  price_btc: string;  // Cryptocurrency price in Bitcoin
  market_cap_usd: string;  // Market capitalization in USD
  volume24: number;  // Transaction volume over the last 24 hours
  volume24a: number;  // Adjusted volume over the last 24 hours
  csupply: string;  // Circulating cryptocurrency supply
  tsupply: string;  // Total cryptocurrency supply
  msupply: string;  // Maximum cryptocurrency supply
}

/**
 * Class representing a cryptocurrency.
 *
 * This class is used to create cryptocurrency objects in a specific format,
 * and provides additional methods such as price formatting.
 */
export class Crypto {
  /**
   * Constructor for the Crypto class.
   *
   * @param {string} id - Unique cryptocurrency ID.
   * @param {string} name - Cryptocurrency name.
   * @param {number} rank - Cryptocurrency ranking position.
   * @param {string} symbol - Cryptocurrency symbol (for example, 'BTC').
   * @param {string} price_usd - Cryptocurrency price in USD.
   */
  constructor(
    public id: string,
    public name: string,
    public rank: number,
    public symbol: string,
    public price_usd: string,
    public percent_change_24h: string,
  ) {}

  /**
   * Method for getting the formatted cryptocurrency price.
   *
   * This method returns the cryptocurrency price in currency format, with two decimal places and the '$' symbol.
   *
   * @returns {string} The formatted cryptocurrency price.
   */
  get formattedPrice(): string {
    return `$${parseFloat(this.price_usd).toFixed(2)}`;
  }
}
