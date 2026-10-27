import { View, Text, TouchableOpacity, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { CryptoApiResponse } from '../models/Crypto';
import { formatToUSD } from '../utils/formatters';

/**
 * `CryptoCard` component that represents a cryptocurrency card.
 * Displays information such as the name, symbol, price, percentage change, and rank.
 * When the card is clicked, navigates to the corresponding cryptocurrency detail page.
 *
 * ### Properties:
 * - `crypto` (CryptoApiResponse): An object containing cryptocurrency data such as `name`, `symbol`, `price_usd`, `percent_change_24h`, `rank`, and more.
 *
 * @param {Props} props - Component props.
 * @returns {JSX.Element} - A card component displaying cryptocurrency information.
 */
interface Props {
  crypto: CryptoApiResponse;
}

const CryptoCard = ({ crypto }: Props) => {
  const router = useRouter();

  // Convert the price and percentage change to floating-point numbers
  const price = parseFloat(crypto.price_usd || '0');
  const change = parseFloat(crypto.percent_change_24h || '0');

  // Determine whether the change is positive or negative
  const isPositive = change >= 0;

  return (
    <Pressable onPress={() => router.push(`/crypto/${crypto.id}`)}>
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          router.push({
            pathname: '/crypto/[id]',
            params: { id: crypto.id || '' },
          })
        }
      >
        <View style={styles.topRow}>
          <View>
            <Text style={styles.name}>{crypto.name}</Text>
            <Text style={styles.symbol}>({crypto.symbol})</Text>
          </View>

          <Text style={styles.rank}>#{crypto.rank}</Text>
        </View>

        <View style={styles.bottomRow}>
          <Text style={styles.price}>{formatToUSD(price)}</Text>
          <Text style={[styles.change, isPositive ? styles.positive : styles.negative]}>
            {isPositive ? '+' : ''}
            {change.toFixed(2)}% <Text style={styles.sub}> (24h)</Text>
          </Text>
        </View>
      </TouchableOpacity>
    </Pressable>
  );
};

// Component styles
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1c1c7e',
    borderRadius: 12,
    padding: 16,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  symbol: {
    fontSize: 14,
    color: '#aaa',
    marginTop: 2,
  },
  rank: {
    fontSize: 14,
    color: '#ff9800',
    fontWeight: '600',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 18,
    color: '#00e676',
    fontWeight: '600',
  },
  change: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  positive: {
    color: '#4caf50',
  },
  negative: {
    color: '#ef5350',
  },
  sub: {
    fontSize: 12,
    color: '#888',
    fontWeight: 'normal',
  },
});

export default CryptoCard;
