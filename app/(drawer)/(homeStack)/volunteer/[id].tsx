import { hs, vs } from "@utils/platform";
import { ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import Loading from "@components/loading";
import Card from "@components/card";
import { fetchVolunteerByIdQuery } from "@apis/volunteer";
import { width } from "@utils/helper";
import LocCard from "@components/locCard";
import DescCard from "@components/descCard";
import Animated, { FadeInUp } from "react-native-reanimated";
import { Button } from "react-native-paper";
import { Box } from "@styles/theme";

const volunteerItem = () => {
  const { id }: Partial<{ id: string }> = useLocalSearchParams();
  const { data, isLoading } = fetchVolunteerByIdQuery(id!);

  const onPress = () => {};

  if (isLoading) return <Loading />;

  return (
    <Box flex={1} paddingVertical="vm" paddingHorizontal="hm" gap="vs">
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: hs(16),
          paddingVertical: vs(16),
          alignItems: "center",
          gap: vs(16),
        }}
      >
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
  );
};

export default volunteerItem;
