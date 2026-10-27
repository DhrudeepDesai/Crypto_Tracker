import { render } from '@testing-library/react-native';
import CryptoCard from '../src/components/CryptoCard';
import { CryptoApiResponse } from '../src/models/Crypto';

/**
 * Unit test that ensures the `CryptoCard` component correctly displays
 * the cryptocurrency's name and symbol.
 *
 * - **crypto**: An object that simulates a response from the cryptocurrency API,
 *   containing cryptocurrency data such as its name, symbol, price, and more.
 *
 * @test
 */
test('displays the cryptocurrency name and symbol', () => {
  // Mock cryptocurrency data
  const crypto: CryptoApiResponse = {
    id: '1',
    symbol: 'BTC',
    name: 'Bitcoin',
    nameid: 'bitcoin',
    rank: 1,
    price_usd: '50000',
    percent_change_24h: '2.5',
    percent_change_1h: '0.5',
    percent_change_7d: '5',
    price_btc: '1',
    market_cap_usd: '1000000000',
    volume24: 1000000,
    volume24a: 1200000,
    csupply: '18000000',
    tsupply: '21000000',
    msupply: '21000000',
  };

  // Render the `CryptoCard` component with the cryptocurrency data
  const { getByText } = render(<CryptoCard crypto={crypto} />);

  // Verify that the cryptocurrency's name and symbol are rendered
  expect(getByText(/Bitcoin/)).toBeTruthy();
  expect(getByText(/BTC/)).toBeTruthy();
});
