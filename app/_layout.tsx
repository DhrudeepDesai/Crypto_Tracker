import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/components/useColorScheme';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

/**
 * Unstable Expo Router settings to preserve the back button
 * when reloading child routes such as `/modal`.
 */
export const unstable_settings = {
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from hiding automatically before fonts finish loading.
SplashScreen.preventAutoHideAsync();

/**
 * Main application layout component.
 *
 * This component loads the required fonts and displays the navigation
 * defined in `RootLayoutNav` once everything is ready.
 *
 * @returns {JSX.Element | null} The main layout, or `null` while fonts are loading.
 */
export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

/**
 * Defines the app's main navigation, including the stack with the tab layout and modal.
 *
 * Applies the light or dark theme based on the user's operating system.
 *
 * @returns {JSX.Element} The main navigation structure.
 */
function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
    </ThemeProvider>
  );
}
