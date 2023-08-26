import { hs, vs } from "@utils/platform";
import { ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import Loading from "@components/loading";
import Card from "@components/card";
import { width } from "@utils/helper";
import LocCard from "@components/locCard";
import DescCard from "@components/descCard";
import { fetchEmergencyQuery } from "@apis/emergencies";
import Animated, { FadeInUp } from "react-native-reanimated";

const volunteerItem = () => {
  const { id }: Partial<{ id: string }> = useLocalSearchParams();
  const { data, isLoading } = fetchEmergencyQuery(id!);

  if (isLoading) return <Loading />;

  return (
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
          aspectRatio={343 / 176}
        />
      </Animated.View>
      <Animated.View entering={FadeInUp.duration(600).delay(200)}>
        <DescCard desc={data?.desc!} />
      </Animated.View>
      {data?.loc && (
        <Animated.View entering={FadeInUp.duration(600).delay(400)}>
          <LocCard loc={data?.loc!} />
        </Animated.View>
      )}
    </ScrollView>
  );
};

export default volunteerItem;
