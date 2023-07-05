import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { Box, ReText, Theme } from "@styles/theme";
import { useNavigation } from "expo-router";
import { Image, ScrollView, TouchableOpacity } from "react-native";
import { hs, vs } from "@utils/platform";
import { useTheme } from "@shopify/restyle";
import ImagesCarousel from "@components/imagesCarousel";
import CategoryCard from "@components/categoryCard";
import { categories } from "@src/data/categories";
import Card from "@components/card";
import Snackbar from "@components/snackbar";

const Home = () => {
  const navigation: any = useNavigation();
  const { colors } = useTheme<Theme>();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Snackbar />
      <ScrollView style={{ flex: 1 }}>
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          marginEnd="hm"
          height={60}
        >
          <Box flexDirection="row" alignItems="center">
            <Image
              source={require("@assets/images/logo.png")}
              style={{ width: hs(69), height: vs(69), resizeMode: "contain" }}
            />
            <Box marginTop="vxs">
              <ReText variant="TitleMedium">خـيـر</ReText>
              <ReText variant="BodySmall">KHEIR</ReText>
            </Box>
          </Box>
          <Box flexDirection="row" alignItems="center" gap="hm">
            <Feather
              name={"shopping-cart"}
              size={hs(24)}
              color={colors.text}
              onPress={() => {}}
            />
            <Feather
              name="menu"
              size={hs(24)}
              color={colors.text}
              onPress={() => navigation.openDrawer()}
            />
          </Box>
        </Box>
        <Box marginTop="vm">
          <ImagesCarousel
            images={[
              require("@assets/images/carousel/1.jpg"),
              require("@assets/images/carousel/2.jpg"),
            ]}
          />
        </Box>
        <ReText variant="HeadlineMedium" marginStart="hm">
          فئات التبرع
        </ReText>
        <Box height={vs(120)}>
          <ScrollView
            horizontal
            overScrollMode="never"
            contentContainerStyle={{
              paddingLeft: hs(16),
              marginTop: vs(12),
            }}
          >
            {categories.map((category) => (
              <Box key={category.id} marginHorizontal="hs">
                <CategoryCard
                  // onPress={() => navigation.navigate("Category", { category })}
                  onPress={() => {}}
                  title={category.title}
                  image={category.image}
                />
              </Box>
            ))}
          </ScrollView>
        </Box>
        <ReText variant="HeadlineMedium" marginStart="hm" marginTop="vm">
          شارف على الإنتهاء
        </ReText>
        <Box height={vs(258)}>
          <ScrollView
            horizontal
            overScrollMode="never"
            contentContainerStyle={{
              paddingLeft: hs(16),
              marginTop: vs(12),
            }}
          >
            {categories.map((category) => (
              <Box key={category.id} marginHorizontal="hs">
                <Card
                  // onPress={() => navigation.navigate("Category", { category })}
                  onPress={() => {}}
                  title={category.title}
                  progress={"70"}
                  imageUrl={
                    "https://lh3.googleusercontent.com/u/0/drive-viewer/AFGJ81oWu_4K9kUlQnN5nLxrqr8ulX1HXWTdC3AdCyCizsVIa4YXOxcDZUv7nRm3ad2Ix9QzTf0BGgGyreZTeHijji0MSASbUA=w1920-h982"
                  }
                />
              </Box>
            ))}
          </ScrollView>
        </Box>
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          marginTop="vm"
          marginHorizontal="hm"
        >
          <ReText variant="HeadlineMedium">فرص التطوع</ReText>
          <TouchableOpacity onPress={() => {}}>
            <ReText variant="BodySmall" color="primary6">
              عرض الكل
            </ReText>
          </TouchableOpacity>
        </Box>
        <Box height={vs(258)}>
          <ScrollView
            horizontal
            overScrollMode="never"
            contentContainerStyle={{
              paddingLeft: hs(16),
              marginTop: vs(12),
            }}
          >
            {categories.map((category) => (
              <Box key={category.id} marginHorizontal="hs">
                <Card
                  // onPress={() => navigation.navigate("Category", { category })}
                  onPress={() => {}}
                  // title={category.title}
                  imageUrl={
                    "https://lh3.googleusercontent.com/u/0/drive-viewer/AFGJ81oWu_4K9kUlQnN5nLxrqr8ulX1HXWTdC3AdCyCizsVIa4YXOxcDZUv7nRm3ad2Ix9QzTf0BGgGyreZTeHijji0MSASbUA=w1920-h982"
                  }
                />
              </Box>
            ))}
          </ScrollView>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
