import { Feather, MaterialIcons } from "@expo/vector-icons";
import Colors from "@styles/colors";
import { Box, ReText } from "@styles/theme";
import { width } from "@utils/helper";
import { hs, ms } from "@utils/platform";
import { Linking, TouchableOpacity } from "react-native";

const LocCard = ({ loc }: { loc: string }) => {
  return (
    <TouchableOpacity onPress={() => Linking.openURL(loc)}>
      <Box
        alignItems="center"
        backgroundColor="secBackground"
        width={width - hs(32)}
        borderRadius="l"
        paddingVertical="vs"
      >
        <ReText variant="LabelLarge" marginBottom="vs" color="primary">
          الذهاب إلى الموقع
        </ReText>
        <MaterialIcons
          name="location-on"
          size={ms(46)}
          color={Colors.primary}
        />
      </Box>
    </TouchableOpacity>
  );
};

export default LocCard;
