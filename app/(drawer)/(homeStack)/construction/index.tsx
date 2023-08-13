import { fetchConstructionQuery } from "@apis/construction";
import Card from "@components/card";
import Loading from "@components/loading";
import { FlashList } from "@shopify/flash-list";
import { useTheme } from "@shopify/restyle";
import { Box, Theme } from "@styles/theme";
import { calcPercentage, width } from "@utils/helper";
import { hs, vs } from "@utils/platform";
import { useRouter } from "expo-router";
import { RefreshControl } from "react-native";

const Construction = () => {
  const router = useRouter();
  const { data, isLoading, refetch, isFetching } = fetchConstructionQuery();
  const { colors } = useTheme<Theme>();

  if (isLoading) return <Loading />;
  return (
    <Box flex={1} gap="vl">
      <FlashList
        contentContainerStyle={{
          paddingHorizontal: hs(16),
          paddingVertical: vs(16),
        }}
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={refetch}
            colors={[colors.primary4]}
            progressBackgroundColor={colors.secBackground}
            tintColor={colors.primary4}
          />
        }
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
              onPress={() => router.push(`construction/${item.id}`)}
              imageUrl={item.image}
              width={width - hs(32)}
              height={vs(240)}
              progress={calcPercentage(item.goal, item.collected)}
            />
          </Box>
        )}
      />
    </Box>
  );
};

export default Construction;
