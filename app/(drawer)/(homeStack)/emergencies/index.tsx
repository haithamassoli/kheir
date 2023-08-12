import { fetchEmergenciesQuery } from "@apis/emergencies";
import Card from "@components/card";
import Loading from "@components/loading";
import { FlashList } from "@shopify/flash-list";
import { Box } from "@styles/theme";
import { width } from "@utils/helper";
import { hs, vs } from "@utils/platform";
import { useRouter } from "expo-router";

const Emergencies = () => {
  const router = useRouter();
  const { data, isLoading } = fetchEmergenciesQuery();

  if (isLoading) return <Loading />;
  return (
    <Box flex={1} gap="vl">
      <FlashList
        contentContainerStyle={{
          paddingHorizontal: hs(16),
          paddingVertical: vs(16),
        }}
        data={data}
        estimatedItemSize={10}
        renderItem={({ item }) => (
          <Box
            justifyContent="center"
            alignItems="center"
            flex={1}
            marginBottom="vs"
          >
            <Card
              onPress={() => router.push(`emergencies/${item.id}`)}
              imageUrl={item.image}
              width={width - hs(32)}
              title={item.title}
              height={vs(240)}
            />
          </Box>
        )}
      />
    </Box>
  );
};

export default Emergencies;
