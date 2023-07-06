import { Box, ReText } from "@styles/theme";
import { useRouter, useLocalSearchParams } from "expo-router";

const Categories = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  return (
    <Box>
      <ReText variant="DisplayLarge">categories</ReText>
    </Box>
  );
};

export default Categories;
