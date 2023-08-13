import { Feather } from "@expo/vector-icons";
import { Box, ReText, Theme } from "@styles/theme";
import { useNavigation, useRouter } from "expo-router";
import {
  Image,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { hs, ms, vs } from "@utils/platform";
import { useTheme } from "@shopify/restyle";
import ImagesCarousel from "@components/imagesCarousel";
import CategoryCard from "@components/categoryCard";
import { categories } from "@src/data/categories";
import Card from "@components/card";
import Snackbar from "@components/snackbar";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchVolunteerQuery } from "@apis/volunteer";
import Loading from "@components/loading";
import { calcPercentage, width } from "@utils/helper";
import { useStore } from "@zustand/store";
import { fetchAlmostDoneQuery } from "@apis/almostDone";

const Home = () => {
  const navigation: any = useNavigation();
  const { cart } = useStore();
  const router = useRouter();
  const { colors } = useTheme<Theme>();
  const { data: volunteerData, isLoading } = fetchVolunteerQuery();
  const {
    data: almostDoneData,
    isFetching: isLoadingAlmostDone,
    refetch: refetchAlmostDone,
  } = fetchAlmostDoneQuery();

  if (isLoading || isLoadingAlmostDone) return <Loading />;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Snackbar />
      <ScrollView
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={isLoadingAlmostDone}
            onRefresh={refetchAlmostDone}
            colors={[colors.primary4]}
            progressBackgroundColor={colors.secBackground}
            tintColor={colors.primary4}
          />
        }
      >
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
              style={{ width: hs(69), resizeMode: "contain" }}
            />
            <Box>
              <ReText variant="BodyLarge">خـيـر</ReText>
              <ReText variant="BodySmall">KHEIR</ReText>
            </Box>
          </Box>
          <Box flexDirection="row" alignItems="center" gap="hm">
            <Box
              width={hs(18)}
              height={vs(18)}
              borderRadius="l"
              backgroundColor="primary6"
              position="absolute"
              top={-vs(6)}
              left={-hs(6)}
              zIndex="overlay"
              alignSelf="center"
            >
              <ReText
                variant="BodySmall"
                textAlign="center"
                fontSize={ms(10)}
                color="lightText"
              >
                {cart.length}
              </ReText>
            </Box>
            <Feather
              name={"shopping-cart"}
              size={hs(24)}
              color={colors.text}
              onPress={() => router.push("cart")}
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
        <ReText variant="HeadlineMedium" marginStart="hm" textAlign="left">
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
                  onPress={() => router.push(category.route)}
                  title={category.title}
                  image={category.image}
                />
              </Box>
            ))}
          </ScrollView>
        </Box>
        <ReText
          variant="HeadlineMedium"
          marginStart="hm"
          marginTop="vm"
          textAlign="left"
        >
          شارف على الإنتهاء
        </ReText>
        <ScrollView
          horizontal
          overScrollMode="never"
          contentContainerStyle={{
            paddingLeft: hs(16),
            marginTop: vs(12),
          }}
        >
          {almostDoneData?.map((almostDone) => (
            <Box key={almostDone.id} marginHorizontal="hs">
              <Card
                onPress={() => router.push(`almost-done/${almostDone.id}`)}
                progress={calcPercentage(
                  almostDone?.goal!,
                  almostDone?.collected!
                )}
                imageUrl={almostDone.image}
              />
            </Box>
          ))}
        </ScrollView>
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          marginTop="vm"
          marginHorizontal="hm"
        >
          <ReText variant="HeadlineMedium">فرص التطوع</ReText>
          <TouchableOpacity onPress={() => router.push("volunteer")}>
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
            {volunteerData?.map((volunteer) => (
              <Box key={volunteer.id} marginHorizontal="hs">
                <Card
                  onPress={() => router.push(`volunteer/${volunteer.id}`)}
                  imageUrl={volunteer.image}
                  width={width - hs(64)}
                  height={vs(220)}
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
