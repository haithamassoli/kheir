import { Feather } from "@expo/vector-icons";
import Colors from "@styles/colors";
import { Box, ReText } from "@styles/theme";
import { width } from "@utils/helper";
import { hs, ms } from "@utils/platform";

const DescCard = ({ desc }: { desc: string }) => {
  return (
    <Box
      alignItems="center"
      backgroundColor="secBackground"
      width={width - hs(32)}
      borderRadius="l"
      paddingBottom="vs"
    >
      <Box
        width={"100%"}
        backgroundColor="primary"
        borderTopLeftRadius="m"
        borderTopRightRadius="m"
        marginBottom="vs"
        paddingStart="hm"
      >
        <ReText
          variant="LabelLarge"
          marginVertical="vxs"
          textAlign="left"
          color="lightText"
        >
          التفاصيل
        </ReText>
      </Box>
      <ReText
        variant="BodyMedium"
        color="primary"
        marginHorizontal="hm"
        textAlign="center"
      >
        {desc}
      </ReText>
    </Box>
  );
};

export default DescCard;
