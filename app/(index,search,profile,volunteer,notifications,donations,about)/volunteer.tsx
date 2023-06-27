import { SafeAreaView } from "react-native-safe-area-context";
import { Box, ReText } from "@styles/theme";

const Volunteer = () => {
  return (
    <SafeAreaView>
      <Box flex={1} justifyContent="center" alignItems="center">
        <ReText variant="DisplayLarge">Volunteer</ReText>
        <ReText variant="BodySmall">KHEIR</ReText>
      </Box>
    </SafeAreaView>
  );
};

export default Volunteer;
