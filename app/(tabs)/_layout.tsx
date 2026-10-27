import React from 'react';
import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import Colors from '@/src/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { FilterProvider } from '@/src/context/FilterContext';
import HomeHeader from '@/src/components/HomeHeader';

/**
 * Custom icon for the tab bar.
 *
 * @param {Object} props - Component props.
 * @param {string} props.name - Name of the FontAwesome icon.
 * @param {string} props.color - Icon color.
 * @returns {JSX.Element} Icon component with applied styling.
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={22} style={{ marginBottom: -2 }} {...props} />;
}

/**
 * Main layout component for the application's tabs.
 *
 * - Wraps the tabs in a `FilterProvider` to share the global filter.
 * - Uses the `useColorScheme` hook to adapt the active tab color to the theme.
 * - Defines a single screen/tab (Home) with its own icon and custom header.
 *
 * @returns {JSX.Element} Tab layout for the main navigation.
 */
export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <FilterProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
            header: () => <HomeHeader />,
          }}
        />
      </Tabs>
    </FilterProvider>
  );
}
