import React from 'react';
import { FlatList, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useCryptoData } from '../hooks/useCryptoData';
import CryptoCard from './CryptoCard';

/**
 * `CryptoList` component that displays a list of cryptocurrencies.
 * Uses the `useCryptoData` hook to retrieve cryptocurrency data and manage three states:
 * - `loading`: A loading indicator is shown while the data is being retrieved.
 * - `error`: An error message is shown if the data cannot be retrieved successfully.
 * - `data`: The cryptocurrency list is rendered when the data is available.
 *
 * The cryptocurrency list is displayed using a `FlatList`, with each cryptocurrency represented by the `CryptoCard` component.
 *
 * ### Properties:
 * It does not receive props directly. It manages data retrieval through the `useCryptoData` hook.
 *
 * @returns {JSX.Element} - A list component displaying cryptocurrencies or loading/error states.
 */
const CryptoList = () => {
  const { data, loading, error } = useCryptoData();

  // Show a loading indicator while the data is being retrieved
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#00e676" />
        <Text style={styles.loadingText}>Loading cryptocurrencies...</Text>
      </View>
    );
  }

  // Show an error message if there was a problem loading the data
  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Error loading cryptocurrencies</Text>
      </View>
    );
  }

  // Show the cryptocurrency list when the data is available
  return (
    <FlatList
      contentContainerStyle={styles.listContainer}
      data={data}
      keyExtractor={(item) => (item.id || '').toString()}
      renderItem={({ item }) => <CryptoCard crypto={item} />}
    />
  );
};

// Component styles
const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  loadingText: {
    marginTop: 10,
    color: '#aaa',
    fontSize: 16,
  },
  errorText: {
    color: '#ff5252',
    fontSize: 16,
    fontWeight: '600',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 100,
  },
});

export default CryptoList;
