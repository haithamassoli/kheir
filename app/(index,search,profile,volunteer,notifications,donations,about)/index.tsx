import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { Box, ReText, Theme } from "@styles/theme";
import { useNavigation } from "expo-router";
import { Image } from "react-native";
import { hs, vs } from "@utils/platform";
import { useTheme } from "@shopify/restyle";
import { useStore } from "@zustand/store";
import ImagesCarousel from "@components/imagesCarousel";
import { Shadow } from "react-native-shadow-2";

const Home = () => {
  const navigation: any = useNavigation();
  const { colors } = useTheme<Theme>();
  const toggleTheme = useStore((state) => state.toggleTheme);

  const onToggleTheme = () => {
    toggleTheme();
  };

  return (
    <SafeAreaView>
      <Shadow
        distance={8}
        stretch
        startColor={colors.shadow}
        endColor="rgba(0, 0, 0, 0)"
        style={{ height: vs(60) }}
      >
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          marginEnd="hm"
          height={60}
        >
          <Box flexDirection="row" alignItems="center">
            <Image source={require("@assets/images/logo.png")} />
            <Box>
              <ReText variant="TitleMedium">خـيـر</ReText>
              <ReText variant="BodySmall">KHEIR</ReText>
            </Box>
          </Box>
          <Box flexDirection="row" alignItems="center" gap="hm">
            <Feather
              name="moon"
              size={hs(24)}
              color={colors.text}
              onPress={() => onToggleTheme()}
            />
            <Feather
              name="menu"
              size={hs(24)}
              color={colors.text}
              onPress={() => navigation.openDrawer()}
            />
          </Box>
        </Box>
      </Shadow>
      <Box flex={1} marginTop="vm" paddingHorizontal="h2xl">
        <ImagesCarousel
          images={[
            require("@assets/images/carousel/1.jpg"),
            require("@assets/images/carousel/2.jpg"),
          ]}
        />
      </Box>
    </SafeAreaView>
  );
};

export default Home;
