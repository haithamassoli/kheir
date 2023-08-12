import { Box, ReText } from "@styles/theme";

const Health = () => {
  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <ReText variant="DisplayMedium">لا يوجد حالات</ReText>
      <ReText variant="BodySmall">خير</ReText>
    </Box>
  );
};

export default Health;
