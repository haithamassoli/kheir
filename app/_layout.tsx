// @ts-nocheck
import "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider as ReThemeProvider } from "@shopify/restyle";
import { StatusBar } from "expo-status-bar";
import { useStore } from "@zustand/store";
import { reloadAsync } from "expo-updates";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as Notifications from "expo-notifications";
import { FlashList } from "@shopify/flash-list";
import { PaperProvider, MD3LightTheme, TextInput } from "react-native-paper";
import { useCallback, useEffect, useState } from "react";
import { MaterialDark, MaterialLight } from "@styles/material";
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
import { Slot, Stack } from "expo-router";
import { Drawer } from "expo-router/drawer";
import {
  DarkNavigationColors,
  LightNavigationColors,
} from "@styles/navigation";

if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: Infinity,
      refetchInterval: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

SplashScreen.preventAutoHideAsync();

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

  const [isFirstTime, setIsFirstTime] = useState(false);
  const isDark = useStore((state) => state.isDark);

  useEffect(() => {
    const forceRTL = async () => {
      if (!I18nManager.isRTL) {
        try {
          I18nManager.allowRTL(true);
          I18nManager.forceRTL(true);
          await reloadAsync();
        } catch (error) {
          console.log(error);
        }
      }
    };
    forceRTL();
    // const firstTime = async () => {
    //   const firstTime = await getDataFromStorage("firstTime");
    //   if (firstTime === null) {
    //     setIsFirstTime(true);
    //   }
    // };
    // firstTime();
  }, []);

  const [fontsLoaded] = useFonts({
    CairoReg: require("@assets/fonts/Cairo-Reg.ttf"),
    CairoMedium: require("@assets/fonts/Cairo-Medium.ttf"),
    CairoBold: require("@assets/fonts/Cairo-Bold.ttf"),
    CairoSemiBold: require("@assets/fonts/Cairo-SemiBold.ttf"),
    SahabahLight: require("@assets/fonts/DG-Sahabah-Light.ttf"),
    SahabahBold: require("@assets/fonts/DG-Sahabah-Bold.ttf"),
    SahabahReg: require("@assets/fonts/DG-Sahabah-Reg.ttf"),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
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
  };

  return (
    <ReThemeProvider theme={isDark ? darkTheme : theme}>
      <StatusBar
        style={isDark ? "light" : "dark"}
        backgroundColor={
          isDark ? Colors.darkBackground : Colors.lightBackground
        }
      />
      <QueryClientProvider client={queryClient}>
        <PaperProvider theme={materialTheme}>
          <ThemeProvider
            value={isDark ? DarkNavigationColors : LightNavigationColors}
          >
            <Box flex={1} onLayout={onLayoutRootView}>
              <Drawer>
                <Drawer.Screen name="(index)" options={{ title: "Home" }} />
                <Drawer.Screen name="(search)" options={{ title: "Search" }} />
                <Drawer.Screen
                  name="(profile)"
                  options={{ title: "Profile" }}
                />
              </Drawer>
            </Box>
          </ThemeProvider>
        </PaperProvider>
      </QueryClientProvider>
    </ReThemeProvider>
  );
}
