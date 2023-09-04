import { Feather } from "@expo/vector-icons";
import { Box, ReText, Theme } from "@styles/theme";
import { useNavigation, router } from "expo-router";
import { RefreshControl, ScrollView, TouchableOpacity } from "react-native";
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
import { calcPercentage } from "@utils/helper";
import { useStore } from "@zustand/store";
import { fetchAlmostDoneQuery } from "@apis/almostDone";
import { Image } from "expo-image";
import Animated, { FadeInUp } from "react-native-reanimated";
import { useNetInfo } from "@react-native-community/netinfo";
import NoConnection from "@components/noConnection";

const Home = () => {
  const navigation: any = useNavigation();
  const { cart } = useStore();
  const { isConnected } = useNetInfo();
  const { colors } = useTheme<Theme>();
  const { data: volunteerData, isLoading } = fetchVolunteerQuery();
  const {
    data: almostDoneData,
    isFetching: isLoadingAlmostDone,
    refetch: refetchAlmostDone,
  } = fetchAlmostDoneQuery();

  if (isLoading || isLoadingAlmostDone) return <Loading />;

  if (isConnected === false) {
    return <NoConnection refetch={refetchAlmostDone} />;
  }

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
              style={{ width: ms(72), height: ms(72) }}
              contentFit="contain"
              transition={400}
            />
            <Box>
              <ReText variant="BodyLarge" textAlign="left">
                خـيـر
              </ReText>
              <ReText
                variant="BodySmall"
                textAlign="left"
                style={{ marginTop: vs(-5) }}
              >
                KHEIR
              </ReText>
            </Box>
          </Box>
          <Box flexDirection="row" alignItems="center" gap="hm">
            <TouchableOpacity
              onPress={() => {
                if (cart.length === 0)
                  return useStore.setState({ snackbarText: "السلة فارغة" });
                router.push("/cart");
              }}
            >
              <Box
                width={ms(18)}
                height={ms(18)}
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
                  fontFamily="CairoBold"
                  textAlign="center"
                  fontSize={ms(12)}
                  color="lightText"
                  style={{ lineHeight: ms(12), paddingTop: vs(8) }}
                >
                  {cart.length}
                </ReText>
              </Box>
              <Feather
                name={"shopping-cart"}
                size={ms(24)}
                color={colors.text}
              />
            </TouchableOpacity>
            <Feather
              name="menu"
              size={ms(24)}
              color={colors.text}
              onPress={() => navigation.openDrawer()}
            />
          </Box>
        </Box>
        <Box marginTop="vm">
          <Animated.View entering={FadeInUp.duration(600)}>
            <ImagesCarousel
              images={[
                require("@assets/images/carousel/1.png"),
                require("@assets/images/carousel/2.png"),
              ]}
            />
          </Animated.View>
        </Box>
        <Animated.View entering={FadeInUp.duration(600).delay(200)}>
          <ReText variant="HeadlineMedium" marginStart="hm" textAlign="left">
            فئات التبرع
          </ReText>
        </Animated.View>
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
                <Animated.View entering={FadeInUp.duration(600).delay(500)}>
                  <CategoryCard
                    onPress={() => router.push(category.route)}
                    title={category.title}
                    image={category.image}
                  />
                </Animated.View>
              </Box>
            ))}
          </ScrollView>
        </Box>
        <Animated.View entering={FadeInUp.duration(600).delay(700)}>
          <ReText
            variant="HeadlineMedium"
            marginStart="hm"
            marginTop="vm"
            textAlign="left"
          >
            شارف على الإنتهاء
          </ReText>
        </Animated.View>
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
              <Animated.View entering={FadeInUp.duration(600).delay(1000)}>
                <Card
                  onPress={() => router.push(`/almost-done/${almostDone.id}`)}
                  progress={calcPercentage(
                    almostDone?.goal!,
                    almostDone?.collected!
                  )}
                  imageUrl={almostDone.image}
                  aspectRatio={125 / 88}
                  height={vs(192)}
                />
              </Animated.View>
            </Box>
          ))}
        </ScrollView>
        <Animated.View entering={FadeInUp.duration(600).delay(1200)}>
          <Box
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            marginTop="vm"
            marginHorizontal="hm"
          >
            <ReText variant="HeadlineMedium">فرص التطوع</ReText>
            <TouchableOpacity onPress={() => router.push("/volunteer/")}>
              <ReText variant="BodySmall" color="primary6">
                عرض الكل
              </ReText>
            </TouchableOpacity>
          </Box>
        </Animated.View>
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
                <Animated.View entering={FadeInUp.duration(600).delay(1500)}>
                  <Card
                    onPress={() => router.push(`/volunteer/${volunteer.id}`)}
                    imageUrl={volunteer.image}
                    aspectRatio={311 / 220}
                    height={vs(220)}
                  />
                </Animated.View>
              </Box>
            ))}
          </ScrollView>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
