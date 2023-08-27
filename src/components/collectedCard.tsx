import Colors from "@styles/colors";
import { Box, ReText } from "@styles/theme";
import { width } from "@utils/helper";
import { hs, ms, vs } from "@utils/platform";
import { ProgressBar } from "react-native-paper";

type Props = {
  collected: number;
  goal: number;
  progress: string;
};

const CollectedCard = ({ collected, goal, progress }: Props) => {
  return (
    <Box
      alignItems="center"
      backgroundColor="secBackground"
      width={width - hs(32)}
      borderRadius="l"
      paddingBottom="vs"
    >
      <Box width={"82%"} borderTopLeftRadius="m" borderTopRightRadius="m">
        <ProgressBar
          progress={parseInt(progress) / 100}
          color={Colors.primary5}
          style={{
            height: vs(16),
            borderRadius: ms(12),
            marginTop: vs(12),
            marginBottom: vs(8),
          }}
        />
        <ReText
          color="text"
          variant="BodyMedium"
          style={{
            position: "absolute",
            top: vs(6),
            start: hs(8 + +progress * 2.5),
          }}
        >
          {parseInt(progress)}%
        </ReText>
      </Box>
      <Box flexDirection="row" justifyContent="space-between" width="82%">
        <Box alignItems="center">
          <ReText variant="BodyMedium" color="primary">
            تم جمع
          </ReText>
          <ReText variant="BodyMedium" color="primary">
            {collected} دينار
          </ReText>
        </Box>
        <Box width={hs(2)} height={"100%"} backgroundColor="black8" />
        <Box alignItems="center">
          <ReText variant="BodyMedium" color="primary">
            المتبقي
          </ReText>
          <ReText variant="BodyMedium" color="primary">
            {goal - collected} دينار
          </ReText>
        </Box>
      </Box>
    </Box>
  );
};

export default CollectedCard;
