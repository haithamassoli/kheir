import Colors from "@styles/colors";
import { Box, ReText } from "@styles/theme";
import { hs, ms, vs } from "@utils/platform";
import { useStore } from "@zustand/store";
import { TouchableOpacity, Image } from "react-native";
import { ProgressBar } from "react-native-paper";

type Props = {
  onPress?: () => void;
  title?: string;
  imageUrl: string;
  progress?: string;
  aspectRatio: number;
  width?: number;
  height?: number;
};

const Card = ({
  imageUrl,
  onPress,
  progress,
  title,
  aspectRatio,
  width,
  height,
}: Props) => {
  const { isDark } = useStore();

  return (
    <Box>
      <TouchableOpacity onPress={onPress} activeOpacity={onPress ? 0.8 : 1}>
        <Image
          source={{
            uri: imageUrl,
          }}
          resizeMode="cover"
          style={{
            height: height || undefined,
            width: width || undefined,
            aspectRatio,
            borderTopLeftRadius: ms(18),
            borderTopRightRadius: ms(18),
            borderBottomLeftRadius: title ? 0 : ms(18),
            borderBottomRightRadius: title ? 0 : ms(18),
          }}
        />
        {progress && (
          <Box flex={1} justifyContent="flex-end">
            <Box width="82%">
              <ProgressBar
                progress={parseInt(progress) / 100}
                color={Colors.primary6}
                style={{
                  height: vs(12),
                  borderRadius: ms(12),
                  marginStart: hs(12),
                  marginBottom: vs(16),
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                }}
              />
            </Box>
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
          <Box
            paddingVertical="vs"
            paddingHorizontal="hs"
            backgroundColor="secBackground"
            borderBottomEndRadius="l"
            borderBottomStartRadius="l"
          >
            <ReText
              variant="BodyMedium"
              textAlign="center"
              color={isDark ? "primary6" : "primary5"}
            >
              {title}
            </ReText>
          </Box>
        )}
      </TouchableOpacity>
    </Box>
  );
};

export default Card;
