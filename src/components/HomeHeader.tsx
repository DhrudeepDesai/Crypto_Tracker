import React from 'react';
import { View, StyleSheet } from 'react-native';
import SearchBar from './SearchBar';
import { useFilter } from '../context/FilterContext';

/**
 * `HomeHeader` component representing a header with a search bar.
 *
 * This component allows the user to search and apply a filter to the data.
 * It integrates with the `FilterContext` to manage the search filter and update results based on the user's input.
 *
 * ### Properties:
 * It does not receive props directly. The filter is managed through the `FilterContext`.
 *
 * @returns {JSX.Element} - A component that renders a header with a search bar.
 */
const HomeHeader = () => {
  const { setFilter } = useFilter(); // Get the function for updating the filter from the context.

  return (
    <View style={styles.header}>
      <SearchBar onSearch={setFilter} /> {/* Pass the setFilter function to the SearchBar component */}
    </View>
  );
};

// Component styles
const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 2,
  },
});

export default HomeHeader;
