// @ts-nocheck
import "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider as ReThemeProvider } from "@shopify/restyle";
import { StatusBar } from "expo-status-bar";
import { useStore } from "@zustand/store";
import * as Updates from "expo-updates";
import { useFonts } from "expo-font";
import { FlashList } from "@shopify/flash-list";
import { getDataFromStorage, storeDataToStorage } from "@utils/helper";
import {
  PaperProvider,
  MD3LightTheme,
  TextInput,
  configureFonts,
} from "react-native-paper";
import { useCallback, useEffect } from "react";
import { MaterialDark, MaterialLight, fontConfig } from "@styles/material";
import { ThemeProvider } from "@react-navigation/native";
import {
  Text as PaperText,
  TextInput as PaperTextInput,
} from "react-native-paper";
import { ThemeProp } from "react-native-paper/lib/typescript/src/types";
import theme, { Box, ReText, darkTheme } from "@styles/theme";
import Colors from "@styles/colors";
import {
  I18nManager,
  Platform,
  ScrollView,
  Text,
  UIManager,
} from "react-native";
import {
  DarkNavigationColors,
  LightNavigationColors,
} from "@styles/navigation";
import { useRouter, useSegments, SplashScreen, Stack } from "expo-router";

if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const queryClient = new QueryClient();

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: "(drawer)",
};

SplashScreen.preventAutoHideAsync();

const forceRTL = async () => {
  if (!I18nManager.isRTL) {
    try {
      I18nManager.allowRTL(true);
      I18nManager.forceRTL(true);
      await Updates.reloadAsync();
    } catch (error) {
      console.log(error);
    }
  }
};

const getTheme = async () => {
  try {
    const darkMode = await getDataFromStorage("isDark");
    if (darkMode === null) {
      useStore.setState({ isDark: false });
    } else {
      useStore.setState({ isDark: darkMode });
    }
  } catch (error) {
    console.log(error);
  }
};

const getUserFromStorage = async () => {
  try {
    const user = await getDataFromStorage("user");
    if (user) useStore.setState({ user });
  } catch (error) {
    console.log(error);
  }
};

const getCartFromStorage = async () => {
  try {
    const cart = await getDataFromStorage("cart");
    console.log("cart is:", cart);
    if (cart) useStore.setState({ cart });
  } catch (error) {
    console.log(error);
  }
};

export default function RootLayout() {
  TextInput.defaultProps = TextInput.defaultProps || {};
  TextInput.defaultProps.allowFontScaling = false;
  PaperTextInput.defaultProps = PaperTextInput.defaultProps || {};
  PaperTextInput.defaultProps.allowFontScaling = false;

  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.allowFontScaling = false;
  ReText.defaultProps = ReText.defaultProps || {};
  ReText.defaultProps.allowFontScaling = false;
  PaperText.defaultProps = PaperText.defaultProps || {};
  PaperText.defaultProps.allowFontScaling = false;

  ScrollView.defaultProps = ScrollView.defaultProps || {};
  ScrollView.defaultProps.showsVerticalScrollIndicator = false;
  ScrollView.defaultProps.showsHorizontalScrollIndicator = false;

  KeyboardAwareScrollView.defaultProps =
    KeyboardAwareScrollView.defaultProps || {};
  KeyboardAwareScrollView.defaultProps.showsVerticalScrollIndicator = false;
  KeyboardAwareScrollView.defaultProps.showsHorizontalScrollIndicator = false;

  FlashList.defaultProps = FlashList.defaultProps || {};
  FlashList.defaultProps.showsVerticalScrollIndicator = false;
  FlashList.defaultProps.showsHorizontalScrollIndicator = false;

  const segments = useSegments();
  const router = useRouter();

  const { isDark, user, cart } = useStore();

  const onFetchUpdateAsync = async () => {
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    } catch (error) {
      // You can also add an alert() to see the error message in case of an error when fetching updates.
      console.log(`Error fetching latest Expo update: ${error}`);
    }
  };

  useEffect(() => {
    forceRTL();
    getTheme();
    getUserFromStorage();
    getCartFromStorage();
    onFetchUpdateAsync();
  }, []);

  useEffect(() => {
    const storeCart = async () => {
      if (cart.length > 0) {
        await storeDataToStorage("cart", cart);
      }
    };
    storeCart();
  }, [cart]);

  useEffect(() => {
    const inAuthGroup = segments.includes("profile");
    if (!user && inAuthGroup) {
      router.replace("/sign-in");
    } else if (user && segments[0] === "(auth)") {
      router.replace("/");
    }
    console.log(segments);
  }, [user, segments]);

  const [fontsLoaded] = useFonts({
    CairoReg: require("@assets/fonts/Cairo-Reg.ttf"),
    CairoBold: require("@assets/fonts/Cairo-Bold.ttf"),
    SahabahBold: require("@assets/fonts/DG-Sahabah-Bold.ttf"),
    SahabahReg: require("@assets/fonts/DG-Sahabah-Reg.ttf"),
  });

  const onLayoutRootView = useCallback(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const materialTheme: ThemeProp = {
    ...MD3LightTheme,
    dark: isDark,
    isV3: true,
    version: 3,
    colors: isDark
      ? { ...MD3LightTheme.colors, ...MaterialDark }
      : { ...MD3LightTheme.colors, ...MaterialLight },
    fonts: configureFonts({ config: fontConfig }),
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ReThemeProvider theme={isDark ? darkTheme : theme}>
        <StatusBar
          style={isDark ? "light" : "dark"}
          backgroundColor={
            isDark ? Colors.darkBackground : Colors.lightBackground
          }
        />
        <PaperProvider theme={materialTheme}>
          <ThemeProvider
            value={isDark ? DarkNavigationColors : LightNavigationColors}
          >
            <Box flex={1} onLayout={onLayoutRootView}>
              <Stack
                screenOptions={{
                  headerShown: false,
                }}
              />
            </Box>
          </ThemeProvider>
        </PaperProvider>
      </ReThemeProvider>
    </QueryClientProvider>
  );
}
