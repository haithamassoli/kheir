import { hs, vs } from "@utils/platform";
import { ScrollView } from "react-native";
import { useSearchParams } from "expo-router";
import Loading from "@components/loading";
import Card from "@components/card";
import { fetchVolunteerByIdQuery } from "@apis/volunteer";
import { width } from "@utils/helper";
import LocCard from "@components/locCard";
import DescCard from "@components/descCard";

const volunteerItem = () => {
  const { id }: Partial<{ id: string }> = useSearchParams();
  const { data, isLoading } = fetchVolunteerByIdQuery(id!);

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
      <Card imageUrl={data?.image!} width={width - hs(32)} height={vs(240)} />
      <DescCard desc={data?.desc!} />
      <LocCard loc={data?.loc!} />
    </ScrollView>
  );
};

export default volunteerItem;
