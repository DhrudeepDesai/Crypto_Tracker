import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import CryptoDetailScreen from '../../src/screens/CryptoDetailScreen';
import { Text } from 'react-native';

/**
 * Cryptocurrency detail page.
 *
 * This component gets the `id` parameter from the URL using `useLocalSearchParams`
 * and passes it to the `CryptoDetailScreen` component, which displays details for the selected cryptocurrency.
 * If a valid `id` is not found, an error message is displayed.
 *
 * @returns {JSX.Element} Cryptocurrency detail page, or an error message if the ID is not found.
 */
const CryptoDetailPage = () => {
  const params = useLocalSearchParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  if (!id) {
    return <Text>Cryptocurrency not found.</Text>;
  }

  return <CryptoDetailScreen id={id} />;
};

export default CryptoDetailPage;
