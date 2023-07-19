import { fetchVolunteerQuery } from "@apis/volunteer";
import Card from "@components/card";
import Loading from "@components/loading";
import { FlashList } from "@shopify/flash-list";
import { Box } from "@styles/theme";
import { width } from "@utils/helper";
import { hs, vs } from "@utils/platform";
import { useRouter } from "expo-router";

const Volunteer = () => {
  const { data, isLoading } = fetchVolunteerQuery();
  const router = useRouter();
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
              onPress={() => router.push(`volunteer/${item.id}`)}
              imageUrl={item.image}
              width={width - hs(32)}
              height={vs(240)}
            />
          </Box>
        )}
      />
    </Box>
  );
};

export default Volunteer;
