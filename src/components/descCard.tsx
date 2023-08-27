import { Box, ReText } from "@styles/theme";
import { width } from "@utils/helper";
import { hs } from "@utils/platform";
import { useStore } from "@zustand/store";

const DescCard = ({ desc }: { desc: string }) => {
  const { isDark } = useStore();
  return (
    <Box
      alignItems="center"
      backgroundColor="secBackground"
      width={width - hs(32)}
      borderRadius="l"
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
        color={isDark ? "lightText" : "primary"}
        marginHorizontal="hm"
        textAlign="center"
        paddingBottom="vs"
      >
        {desc}
      </ReText>
    </Box>
  );
};

export default DescCard;
