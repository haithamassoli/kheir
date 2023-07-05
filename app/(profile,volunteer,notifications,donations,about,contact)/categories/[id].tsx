import { Box, ReText } from "@styles/theme";
import { useRouter, useSearchParams } from "expo-router";

const Categories = () => {
  const router = useRouter();
  const { id } = useSearchParams();

  return (
    <Box>
      <ReText variant="DisplayLarge">categories</ReText>
    </Box>
  );
};

export default Categories;
