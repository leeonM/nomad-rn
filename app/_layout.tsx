import Colors from '@/constants/Colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY
import * as SecureStore from 'expo-secure-store'
import { ClerkProvider, SignedIn, SignedOut, useAuth } from '@clerk/clerk-expo';
import HomePage from './(authenticated)/(tabs)/home';

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });
  const router = useRouter()
  const {isLoaded,isSignedIn} = useAuth()
  const segments = useSegments()

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    console.log('isSignedIn',isSignedIn)
    if (!isLoaded) return;

    const inAuthGroup = segments[0] === '(authenticated)'

    if (isSignedIn && !inAuthGroup) {
      router.replace('/(authenticated)/(tabs)/home')
    } else if (!isSignedIn) {
      router.replace('/')
    }
  }, [isSignedIn]);

  if (!loaded || !isLoaded) {
    return <Text>Loading...</Text>
  }

  return (
      <Stack>
       <Stack.Screen name="(authenticated)/(tabs)" options={{headerShown:false}} />
        <Stack.Screen name="index" options={{headerShown:false}} />
          <Stack.Screen name="login" options={{
            title:'',
            headerBackTitle: '',
            headerShadowVisible:false,
            headerStyle: {backgroundColor:'#fff'},
            headerLeft:()=> (
              <TouchableOpacity
              onPress={router.back}>
                <Ionicons name="arrow-back" size={24} color={Colors.dark} />
              </TouchableOpacity>
            )
          }} />
           <Stack.Screen name="signup" options={{
            title:'',
            headerBackTitle: '',
            headerShadowVisible:false,
            headerStyle: {backgroundColor:'#fff'},
            headerLeft:()=> (
              <TouchableOpacity
              onPress={router.back}>
                <Ionicons name="arrow-back" size={24} color={Colors.dark} />
              </TouchableOpacity>
            )
          }} />
          <Stack.Screen name="email-signup" options={{
            title:'',
            headerBackTitle: '',
            headerShadowVisible:false,
            headerStyle: {backgroundColor:'#fff'},
            headerLeft:()=> (
              <TouchableOpacity
              onPress={router.back}>
                <Ionicons name="arrow-back" size={24} color={Colors.dark} />
              </TouchableOpacity>
            )
          }} />
      </Stack>
  )
}

const RootLayoutNav = () => {
  return (
    <>
      <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY!} tokenCache={tokenCache}>
        <InitialLayout />
      </ClerkProvider>
    </>
  );
}


export default RootLayoutNav;