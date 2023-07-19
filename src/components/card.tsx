import Colors from "@styles/colors";
import { Box, ReText } from "@styles/theme";
import { hs, ms, vs } from "@utils/platform";
import { useStore } from "@zustand/store";
import { TouchableOpacity } from "react-native";
import { ProgressBar, Card as PCard } from "react-native-paper";

type Props = {
  onPress?: () => void;
  title?: string;
  imageUrl: string;
  progress?: string;
  width?: number;
  height?: number;
};

const Card = ({ imageUrl, onPress, progress, title, height, width }: Props) => {
  const { isDark } = useStore();

  return (
    <Box flex={1} width={width || hs(250)}>
      <TouchableOpacity onPress={onPress} activeOpacity={onPress ? 0.8 : 1}>
        <PCard
          collapsable
          style={{
            borderRadius: ms(18),
          }}
        >
          <PCard.Cover
            source={{
              uri: imageUrl,
            }}
            borderTopLeftRadius={ms(18)}
            borderTopRightRadius={ms(18)}
            borderBottomLeftRadius={title ? 0 : ms(18)}
            borderBottomRightRadius={title ? 0 : ms(18)}
            style={{
              height: height || vs(176),
              borderTopLeftRadius: ms(18),
              borderTopRightRadius: ms(18),
              borderBottomLeftRadius: title ? 0 : ms(18),
              borderBottomRightRadius: title ? 0 : ms(18),
            }}
          />
          {progress && (
            <Box flex={1} justifyContent="flex-end">
              <ProgressBar
                progress={parseInt(progress) / 100}
                color={Colors.primary6}
                style={{
                  width: "82%",
                  height: vs(12),
                  borderRadius: ms(12),
                  marginStart: hs(12),
                  marginBottom: vs(16),
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                }}
              />
              <ReText
                marginEnd="hs"
                marginBottom="vs"
                variant="LabelLarge"
                color="primary6"
                fontFamily="SahabahBold"
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                }}
              >
                {progress}%
              </ReText>
            </Box>
          )}
          {title && (
            <Box paddingVertical="vs" paddingHorizontal="hs">
              <ReText
                variant="BodyMedium"
                textAlign="center"
                color={isDark ? "primary6" : "primary5"}
              >
                {title}
              </ReText>
            </Box>
          )}
        </PCard>
      </TouchableOpacity>
    </Box>
  );
};

export default Card;
