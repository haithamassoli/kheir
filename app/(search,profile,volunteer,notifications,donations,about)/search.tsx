import { SafeAreaView } from "react-native-safe-area-context";
import { Box, ReText } from "@styles/theme";

const Search = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Box flex={1} justifyContent="center" alignItems="center">
        <ReText variant="DisplayMedium">Search</ReText>
        <ReText variant="BodySmall">KHEIR</ReText>
      </Box>
    </SafeAreaView>
  );
};

export default Search;
