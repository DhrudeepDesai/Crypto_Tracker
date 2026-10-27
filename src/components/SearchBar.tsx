import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

interface Filter {
  text: string;
  minPrice: number | null;
  maxPrice: number | null;
}

interface Props {
  onSearch: (filter: Filter) => void;
}

/**
 * `SearchBar` component that allows users to search for cryptocurrencies.
 *
 * This component provides a search bar that captures user input
 * and passes the search text to an `onSearch` function after a 300 ms delay
 * to optimize search performance.
 *
 * ### Properties:
 * - `onSearch`: Function that receives the search text as an argument and runs
 *   after a delay when the user stops typing.
 *
 * @param {Object} props - Component props.
 * @param {Function} props.onSearch - Function called when the search text changes.
 *
 * @returns {JSX.Element} - A component that renders a search bar.
 */
const SearchBar = ({ onSearch }: Props) => {
  const [text, setText] = useState('');
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onSearch({
        text,
        minPrice: minPrice ? minPrice : null,
        maxPrice: maxPrice ? maxPrice : null,
      });
    }, 300);

    return () => clearTimeout(timeout);
  }, [text, minPrice, maxPrice]);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search cryptocurrency..."
        value={text}
        onChangeText={setText}
        style={styles.input}
      />
      <TextInput
        placeholder="Minimum price"
        value={minPrice?.toString() ?? ''}
        onChangeText={(val) => {
          const parsed = parseFloat(val);
          setMinPrice(isNaN(parsed) ? null : parsed);
        }}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Maximum price"
        value={maxPrice?.toString() ?? ''}
        onChangeText={(val) => {
          const parsed = parseFloat(val);
          setMaxPrice(isNaN(parsed) ? null : parsed);
        }}
        style={styles.input}
        keyboardType="numeric"
      />
    </View>
  );
};

// Component styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  input: {
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    marginBottom: 5,
    marginTop: 5,
    borderColor: '#ddd',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
});

export default SearchBar;
