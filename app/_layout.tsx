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
import { getDataFromStorage } from "@utils/helper";
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
  StyleSheet,
  Text,
  UIManager,
  Image,
} from "react-native";
import {
  DarkNavigationColors,
  LightNavigationColors,
} from "@styles/navigation";
import { Drawer } from "expo-router/drawer";
import CustomDrawer from "@src/layouts/custom-drawer";
import { Feather } from "@expo/vector-icons";
import { hs } from "@utils/platform";
import { useRouter, useSegments } from "expo-router";

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

  const segments = useSegments();
  const router = useRouter();

  const { isDark, setUser, user } = useStore((state) => state);

  const getUserFromStorage = async () => {
    const user = await getDataFromStorage("user");
    if (user) setUser(user);
    console.log("user is:", user);
  };

  const getTheme = async () => {
    const darkMode = await getDataFromStorage("isDark");
    if (darkMode === null) {
      useStore.setState({ isDark: false });
    } else {
      useStore.setState({ isDark: darkMode });
    }
  };

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

  useEffect(() => {
    forceRTL();
    getTheme();
    getUserFromStorage();
  }, []);

  useEffect(() => {
    const inAuthGroup = segments[0] === "(profile)";
    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !user &&
      inAuthGroup
    ) {
      // Redirect to the sign-in page.
      router.push("/sign-in");
    } else if (user && segments[0] === "(auth)") {
      // Redirect away from the sign-in page.
      router.push("/");
    }
    console.log(user, segments);
  }, [user, segments]);

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
        <ThemeProvider
          value={isDark ? DarkNavigationColors : LightNavigationColors}
        >
          <PaperProvider theme={materialTheme}>
            <Box flex={1} onLayout={onLayoutRootView}>
              <Drawer
                drawerContent={(props) => <CustomDrawer {...props} />}
                screenOptions={{
                  drawerPosition: "left",
                  headerShown: false,
                  drawerLabelStyle: labelStyle,
                }}
              >
                <Drawer.Screen
                  name="index"
                  options={{
                    title: "الرئيسة",
                    drawerIcon: ({ color, size }) => (
                      <Feather
                        name="home"
                        size={size}
                        color={color}
                        style={styles.icon}
                      />
                    ),
                  }}
                />
                <Drawer.Screen
                  name="(donations)"
                  options={{
                    title: "تبرعاتي",
                    drawerIcon: ({ size, focused }) => (
                      <Image
                        source={
                          focused
                            ? require("@assets/icons/drawerIcons/priDonations.png")
                            : isDark
                            ? require("@assets/icons/drawerIcons/darkDonations.png")
                            : require("@assets/icons/drawerIcons/donations.png")
                        }
                        resizeMode="contain"
                        style={[styles.icon, { width: size, height: size }]}
                      />
                    ),
                  }}
                />
                <Drawer.Screen
                  name="(notifications)"
                  options={{
                    title: "الإشعارات",
                    drawerIcon: ({ color, size }) => (
                      <Feather
                        name="bell"
                        size={size}
                        color={color}
                        style={styles.icon}
                      />
                    ),
                  }}
                />
                <Drawer.Screen
                  name="(volunteer)"
                  options={{
                    title: "فرص التطوع",
                    drawerIcon: ({ size, focused }) => (
                      <Image
                        source={
                          focused
                            ? require("@assets/icons/drawerIcons/priVolunteer.png")
                            : isDark
                            ? require("@assets/icons/drawerIcons/darkVolunteer.png")
                            : require("@assets/icons/drawerIcons/volunteer.png")
                        }
                        resizeMode="contain"
                        style={[styles.icon, { width: size, height: size }]}
                      />
                    ),
                  }}
                />
                <Drawer.Screen
                  name="(profile)"
                  options={{
                    drawerItemStyle: { display: "none" },
                  }}
                />
                <Drawer.Screen
                  name="(contact)"
                  options={{
                    title: "تواصل معنا",
                    drawerIcon: ({ color, size }) => (
                      <Feather
                        name="mail"
                        size={size}
                        color={color}
                        style={styles.icon}
                      />
                    ),
                  }}
                />
                <Drawer.Screen
                  name="(about)"
                  options={{
                    title: "عن تطبيق خير",
                    drawerIcon: ({ color, size }) => (
                      <Feather
                        name="info"
                        size={size}
                        color={color}
                        style={styles.icon}
                      />
                    ),
                  }}
                />
                <Drawer.Screen
                  name="(auth)/sign-in"
                  options={{
                    title: "تسجيل الدخول",
                    drawerItemStyle: { display: "none" },
                  }}
                />
                <Drawer.Screen
                  name="(auth)/sign-up"
                  options={{
                    title: "تسجيل",
                    drawerItemStyle: { display: "none" },
                  }}
                />
              </Drawer>
            </Box>
          </PaperProvider>
        </ThemeProvider>
      </ReThemeProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  icon: {
    right: hs(8),
    position: "absolute",
  },
});

const labelStyle = {
  fontFamily: "CairoBold",
  transform: [{ translateX: hs(32) }],
};
