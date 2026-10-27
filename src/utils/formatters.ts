/**
 * Formats a number as USD currency.
 * @param {number} value - The numeric value to format.
 * @returns {string} - The value formatted as USD currency.
 */
export const formatToUSD = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};