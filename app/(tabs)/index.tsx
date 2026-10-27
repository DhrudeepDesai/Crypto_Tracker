import React from 'react';
import HomeScreen from '@/src/screens/HomeScreen';

/**
 * Entry component for the main route (`/`).
 *
 * This component acts as the initial entry point for tab navigation,
 * directly rendering the `HomeScreen` component, which contains
 * the logic and presentation for the application's main screen.
 *
 * @returns {JSX.Element} Main home screen component.
 */
export default function Index() {
  return <HomeScreen />;
}
