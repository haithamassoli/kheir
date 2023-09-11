import { hs, ms, vs } from "@utils/platform";
import { Linking, ScrollView, Share, TouchableOpacity } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import Loading from "@components/loading";
import Card from "@components/card";
import { fetchVolunteerByIdQuery } from "@apis/volunteer";
import { width } from "@utils/helper";
import LocCard from "@components/locCard";
import DescCard from "@components/descCard";
import Animated, { FadeInUp } from "react-native-reanimated";
import { Button } from "react-native-paper";
import { Box } from "@styles/theme";
import Snackbar from "@components/snackbar";
import { Feather } from "@expo/vector-icons";
import Colors from "@styles/colors";
import NoConnection from "@components/noConnection";
import { useNetInfo } from "@react-native-community/netinfo";

const volunteerItem = () => {
  const { id }: Partial<{ id: string }> = useLocalSearchParams();
  const { data, isLoading, refetch } = fetchVolunteerByIdQuery(id!);
  const { isConnected } = useNetInfo();

  const onPress = () => {
    Linking.openURL(
      "https://docs.google.com/forms/d/e/1FAIpQLScNxCHPBQSG-u1p5FH-a-LUFCupyJyCWa0NaYYKUX564oJXXQ/viewform?usp=sf_link"
    );
  };

  const onSharePress = () => {
    Share.share({
      message: `تطوع معنا في
${data?.desc!}
https://play.google.com/store/apps/details?id=com.haithamassoli.kheir`,
    });
  };

  if (isLoading) return <Loading />;
  if (isConnected === false) return <NoConnection refetch={refetch} />;

  return (
    <>
      <Snackbar />
      <Box flex={1} paddingVertical="vm" paddingHorizontal="hm" gap="vs">
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: hs(16),
            paddingVertical: vs(16),
            alignItems: "center",
            gap: vs(16),
          }}
        >
          <Stack.Screen
            options={{
              headerRight: () => (
                <TouchableOpacity onPress={onSharePress}>
                  <Feather
                    name="share-2"
                    size={ms(24)}
                    color={Colors.primary}
                  />
                </TouchableOpacity>
              ),
            }}
          />
          <Animated.View entering={FadeInUp.duration(600)}>
            <Card
              imageUrl={data?.image!}
              width={width - hs(32)}
              aspectRatio={343 / 206}
            />
          </Animated.View>
          <Animated.View entering={FadeInUp.duration(600).delay(200)}>
            <DescCard desc={data?.desc!} />
          </Animated.View>
          <Animated.View entering={FadeInUp.duration(600).delay(400)}>
            <LocCard loc={data?.loc!} />
          </Animated.View>
        </ScrollView>
        <Animated.View entering={FadeInUp.duration(600).delay(600)}>
          <Button
            mode="contained"
            onPress={onPress}
            style={{ width: "100%" }}
            contentStyle={{
              height: vs(46),
            }}
          >
            التسجيل
          </Button>
        </Animated.View>
      </Box>
    </>
  );
};

export default volunteerItem;
