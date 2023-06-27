import { SafeAreaView } from "react-native-safe-area-context";
import { Box, ReText } from "@styles/theme";

const Notifications = () => {
  return (
    <SafeAreaView>
      <Box flex={1} justifyContent="center" alignItems="center">
        <ReText variant="DisplayLarge">Notifications</ReText>
        <ReText variant="BodySmall">KHEIR</ReText>
      </Box>
    </SafeAreaView>
  );
};

export default Notifications;
