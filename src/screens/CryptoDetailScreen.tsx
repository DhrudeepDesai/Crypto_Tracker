// src/screens/CryptoDetailScreen.tsx

import React, { useEffect, useState } from 'react';
import { Text, View, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import { getCryptoDetails } from '../services/cryptoService'; // Function for retrieving data from the API
import { CryptoApiResponse } from '../models/Crypto';
import { useNavigation } from 'expo-router';
import { formatToUSD } from '../utils/formatters';

/**
 * Component that displays cryptocurrency details on a screen.
 *
 * @param {string} id - The ID of the cryptocurrency whose details to retrieve.
 *
 * This component makes an API request to retrieve the cryptocurrency details,
 * displays them in a detail view, and manages loading and error states.
 */
const CryptoDetailScreen = ({ id }: { id: string }) => {
  const navigation = useNavigation();

  // State for storing the cryptocurrency details
  const [cryptoDetails, setCryptoDetails] = useState<CryptoApiResponse | null>(null);

  // State for managing data loading
  const [loading, setLoading] = useState<boolean>(true);

  // Effect for retrieving cryptocurrency details when the ID changes
  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        // Call the function that retrieves details from the API
        const details = await getCryptoDetails(id);
        setCryptoDetails(details);

        // Update the navigation title with the cryptocurrency name and symbol
        navigation.setOptions({
          title: `${details.name} (${details.symbol})`,
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  // Show a loading indicator while the data is being retrieved
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
  }

  // If no details are found, show an error message
  if (!cryptoDetails) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No details found for this cryptocurrency.</Text>
      </View>
    );
  }

  // Calculate the volume change
  const volumeChange = ((cryptoDetails.volume24 - cryptoDetails.volume24a) / cryptoDetails.volume24a) * 100;

  // Render the cryptocurrency information
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.gridContainer}>
        {/* Display the cryptocurrency details in a grid layout */}
        <View style={styles.gridItem}>
          <Text style={styles.detailText}>Currency unit:</Text>
          <Text>{cryptoDetails.nameid}</Text>
        </View>
        <View style={styles.gridItem}>
          <Text style={styles.detailText}>Rank:</Text>
          <Text>#{cryptoDetails.rank}</Text>
        </View>
        <View style={styles.gridItem}>
          <Text style={styles.detailText}>Price (BTC):</Text>
          <Text>{cryptoDetails.price_btc}</Text>
        </View>
        <View style={styles.gridItem}>
          <Text style={styles.detailText}>Price (USD):</Text>
          <Text>{formatToUSD(Number(cryptoDetails.price_usd))}</Text>
        </View>
        <View style={styles.gridItem}>
          <Text style={styles.detailText}>1h change:</Text>
          <Text>{cryptoDetails.percent_change_1h}%</Text>
        </View>
        <View style={styles.gridItem}>
          <Text style={styles.detailText}>7d change:</Text>
          <Text>{cryptoDetails.percent_change_7d}%</Text>
        </View>
        <View style={styles.gridItem}>
          <Text style={styles.detailText}>24h change:</Text>
          <Text>{cryptoDetails.percent_change_24h}%</Text>
        </View>
        <View style={styles.gridItem}>
          <Text style={styles.detailText}>Market capitalization:</Text>
          <Text>{formatToUSD(Number(cryptoDetails.market_cap_usd))}</Text>
        </View>
        <View style={styles.gridItem}>
          <Text style={styles.detailText}>Volume change:</Text>
          <Text>{volumeChange.toFixed(2)}%</Text>
        </View>
        <View style={styles.gridItem}>
          <Text style={styles.detailText}>Circulating supply:</Text>
          <Text>{formatToUSD(Number(cryptoDetails.csupply))}</Text>
        </View>
        <View style={styles.gridItem}>
          <Text style={styles.detailText}>Total supply:</Text>
          <Text>{formatToUSD(Number(cryptoDetails.tsupply))}</Text>
        </View>
        <View style={styles.gridItem}>
          <Text style={styles.detailText}>Maximum supply:</Text>
          <Text>{formatToUSD(Number(cryptoDetails.msupply))}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

// Styles for the detail screen
const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    flexGrow: 1,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#e74c3c',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#2c3e50',
  },
  detailText: {
    fontSize: 18,
    marginBottom: 8,
    color: '#34495e',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  gridItem: {
    backgroundColor: '#7bc4ef',
    width: '48%',
    padding: 12,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
});

export default CryptoDetailScreen;
