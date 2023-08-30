import Colors from "@styles/colors";
import { Box, ReText } from "@styles/theme";
import { width } from "@utils/helper";
import { hs, ms, vs } from "@utils/platform";
import { useStore } from "@zustand/store";
import { ProgressBar } from "react-native-paper";

type Props = {
  collected: number;
  goal: number;
  progress: string;
};

const CollectedCard = ({ collected, goal, progress }: Props) => {
  const { isDark } = useStore();
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
          {+progress >= 100 ? "100" : progress}%
        </ReText>
      </Box>
      <Box flexDirection="row" justifyContent="space-between" width="82%">
        <Box alignItems="center">
          <ReText variant="BodyMedium" color={isDark ? "lightText" : "primary"}>
            تم جمع
          </ReText>
          <ReText variant="BodyMedium" color={isDark ? "lightText" : "primary"}>
            {Math.round(collected)} دينار
          </ReText>
        </Box>
        <Box width={hs(2)} height={"100%"} backgroundColor="black8" />
        <Box alignItems="center">
          <ReText variant="BodyMedium" color={isDark ? "lightText" : "primary"}>
            المتبقي
          </ReText>
          <ReText variant="BodyMedium" color={isDark ? "lightText" : "primary"}>
            {+progress < 100
              ? `${Math.round(goal - collected)} دينار`
              : "تم الانتهاء"}
          </ReText>
        </Box>
      </Box>
    </Box>
  );
};

export default CollectedCard;
