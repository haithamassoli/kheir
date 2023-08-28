import { fetchOrdersQuery } from "@apis/cart";
import HeaderRight from "@components/headerRight";
import Loading from "@components/loading";
import { useTheme } from "@shopify/restyle";
import { Box, ReText, Theme } from "@styles/theme";
import { hs, vs } from "@utils/platform";
import { useStore } from "@zustand/store";
import { useNavigation, router } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { useEffect } from "react";
import { RefreshControl, ScrollView } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";

const Donations = () => {
  const navigation: any = useNavigation();
  const { user } = useStore();
  const { colors } = useTheme<Theme>();
  const { isLoading, data, isFetching, refetch } = fetchOrdersQuery(user?.uid!);

  useEffect(() => {
    if (!user) {
      useStore.setState({ snackbarText: "الرجاء تسجيل الدخول" });
      router.push("/sign-in");
    }
  }, []);

  if (isLoading) return <Loading />;

  if (Array.isArray(data) && data.length === 0) {
    return (
      <ScrollView
        contentContainerStyle={{ flex: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={refetch}
            colors={[colors.primary4]}
            progressBackgroundColor={colors.secBackground}
            tintColor={colors.primary4}
          />
        }
      >
        <Drawer.Screen
          options={{
            headerRight: () => (
              <HeaderRight onPress={() => navigation.openDrawer()} />
            ),
          }}
        />
        <Box flex={1} justifyContent="center" alignItems="center">
          <ReText variant="DisplaySmall">لا يوجد تبرعات</ReText>
          <ReText variant="BodySmall">خير</ReText>
        </Box>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        paddingVertical: vs(16),
        paddingHorizontal: hs(8),
      }}
      refreshControl={
        <RefreshControl
          refreshing={isFetching}
          onRefresh={refetch}
          colors={[colors.primary4]}
          progressBackgroundColor={colors.black9}
          tintColor={colors.primary4}
        />
      }
    >
      <Drawer.Screen
        options={{
          headerRight: () => (
            <HeaderRight onPress={() => navigation.openDrawer()} />
          ),
        }}
      />
      {data?.map((donation, index) => (
        <Animated.View
          key={index}
          entering={FadeInUp.duration(600).delay(200 * index)}
        >
          <Box
            backgroundColor="primary"
            width="100%"
            paddingHorizontal="hl"
            paddingVertical="vm"
            borderRadius="l"
            zIndex="modal"
          >
            <ReText variant="BodyLarge" color="lightText">
              {new Intl.DateTimeFormat("ar-JO", {
                year: "numeric",
                month: "long",
                day: "2-digit",
              }).format(new Date(donation.createdAt))}
            </ReText>
          </Box>
          {Object.values(donation)
            .filter((value) => typeof value === "object")
            .map((donationItem, index) => (
              <Box>
                {donationItem?.name && (
                  <Box
                    key={index}
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                    paddingHorizontal="hs"
                    paddingVertical="vs"
                    borderBottomWidth={1}
                    borderBottomColor="black9"
                  >
                    <ReText variant="BodyMedium">{donationItem?.name}</ReText>
                    <ReText variant="BodyMedium">
                      {donationItem?.price} دينار
                    </ReText>
                  </Box>
                )}
              </Box>
            ))}
        </Animated.View>
      ))}
    </ScrollView>
  );
};

export default Donations;
