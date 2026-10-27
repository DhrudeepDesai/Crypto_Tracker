import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Filter {
  text: string;
  minPrice: number | null;
  maxPrice: number | null;
}

// Type that defines the context structure
type FilterContextType = {
  filter: Filter;  // The current filter value
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;  // Function to update the filter value
};

// Create the context with a default value of undefined
const FilterContext = createContext<FilterContextType | undefined>(undefined);

/**
 * Provider component for the FilterContext.
 *
 * This component wraps its children and provides the context value (filter and setFilter)
 * throughout the application.
 *
 * @param {ReactNode} children - The components that will be inside the context.
 */
export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [filter, setFilter] = useState<Filter>({
    text: '',
    minPrice: null,
    maxPrice: null,
  }); // State for storing the current filter

  return (
    <FilterContext.Provider value={{ filter, setFilter }}>
      {children}
    </FilterContext.Provider>
  );
};

/**
 * Custom hook for accessing the FilterContext.
 *
 * This hook returns the context value (filter and setFilter) and throws an error
 * if used outside the scope of FilterProvider.
 *
 * @returns {FilterContextType} The context with the current filter and the function to update it.
 *
 * @throws {Error} If the hook is used outside FilterProvider.
 */
export const useFilter = () => {
  const ctx = useContext(FilterContext);

  // Check whether the context is available; otherwise, throw an error.
  if (!ctx) throw new Error('useFilter must be used within FilterProvider');

  return ctx;
};
