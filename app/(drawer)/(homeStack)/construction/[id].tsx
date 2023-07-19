import { hs, vs } from "@utils/platform";
import { ScrollView } from "react-native";
import { useSearchParams } from "expo-router";
import Loading from "@components/loading";
import Card from "@components/card";
import { calcPercentage, width } from "@utils/helper";
import DescCard from "@components/descCard";
import { fetchConstructionByIdQuery } from "@apis/construction";
import { Button } from "react-native-paper";
import CollectedCard from "@components/collectedCard";
import ExecutorCard from "@components/executorCard";

const ConstructionItem = () => {
  const { id }: Partial<{ id: string }> = useSearchParams();
  const { data, isLoading } = fetchConstructionByIdQuery(id!);

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
      <Card
        imageUrl={data?.image!}
        title={data?.desc}
        width={width - hs(32)}
        height={vs(240)}
      />
      <CollectedCard
        collected={data?.collected!}
        goal={data?.goal!}
        progress={calcPercentage(data?.goal!, data?.collected!)}
      />
      <ExecutorCard
        beneficiaries={data?.beneficiaries!}
        donors={data?.donors!}
        executor={data?.executor!}
      />
      <Button mode="contained-tonal" style={{ width: "100%" }}>
        تبرع الآن
      </Button>
    </ScrollView>
  );
};

export default ConstructionItem;
