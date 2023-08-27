import { Box, ReText } from "@styles/theme";
import { width } from "@utils/helper";
import { hs, vs } from "@utils/platform";
import { useStore } from "@zustand/store";

type Props = {
  beneficiaries: number;
  executor: string;
  donors: number;
};

const ExecutorCard = ({ beneficiaries, donors, executor }: Props) => {
  const { isDark } = useStore();
  return (
    <Box
      alignItems="center"
      backgroundColor="secBackground"
      width={width - hs(32)}
      borderRadius="l"
      paddingVertical="vs"
    >
      <ReText variant="BodyLarge" color={isDark ? "lightText" : "primary"}>
        {executor}
      </ReText>
      <Box
        width={"82%"}
        height={vs(2)}
        backgroundColor="black8"
        marginVertical="vs"
      />
      <Box flexDirection="row" justifyContent="space-between" width="82%">
        <Box alignItems="center">
          <ReText variant="BodyMedium" color={isDark ? "lightText" : "primary"}>
            عدد المستفيدين:
          </ReText>
          <ReText variant="BodyMedium" color={isDark ? "lightText" : "primary"}>
            {beneficiaries}
          </ReText>
        </Box>
        <Box width={hs(2)} height={"100%"} backgroundColor="black8" />
        <Box alignItems="center">
          <ReText variant="BodyMedium" color={isDark ? "lightText" : "primary"}>
            عدد المتبرعين:
          </ReText>
          <ReText variant="BodyMedium" color={isDark ? "lightText" : "primary"}>
            {donors}
          </ReText>
        </Box>
      </Box>
    </Box>
  );
};

export default ExecutorCard;
