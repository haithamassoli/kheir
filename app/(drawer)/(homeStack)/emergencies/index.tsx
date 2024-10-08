import { fetchEmergenciesQuery } from "@apis/emergencies";
import Card from "@components/card";
import Loading from "@components/loading";
import NoConnection from "@components/noConnection";
import { useNetInfo } from "@react-native-community/netinfo";
import { FlashList } from "@shopify/flash-list";
import { Box } from "@styles/theme";
import { width } from "@utils/helper";
import { hs, vs } from "@utils/platform";
import { router } from "expo-router";
import Animated, { FadeInUp } from "react-native-reanimated";

const Emergencies = () => {
  const { data, isLoading, refetch } = fetchEmergenciesQuery();
  const { isConnected } = useNetInfo();

  if (isLoading) return <Loading />;
  if (isConnected === false) return <NoConnection refetch={refetch} />;

  return (
    <Box flex={1} gap="vl">
      <FlashList
        contentContainerStyle={{
          paddingHorizontal: hs(16),
          paddingVertical: vs(16),
        }}
        data={data}
        estimatedItemSize={10}
        renderItem={({ item, index }) => (
          <Box
            justifyContent="center"
            alignItems="center"
            flex={1}
            marginBottom="vs"
          >
            <Animated.View entering={FadeInUp.duration(600).delay(index * 200)}>
              <Card
                onPress={() => router.push(`/emergencies/${item.id}`)}
                imageUrl={item.image}
                width={width - hs(32)}
                title={item.title}
                aspectRatio={343 / 206}
              />
            </Animated.View>
          </Box>
        )}
      />
    </Box>
  );
};

export default Emergencies;
