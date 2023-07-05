import Colors from "@styles/colors";
import { Box, ReText } from "@styles/theme";
import { width } from "@utils/helper";
import { hs, ms, vs } from "@utils/platform";
import { TouchableOpacity, ImageBackground } from "react-native";
import { ProgressBar } from "react-native-paper";

type Props = {
  onPress: () => void;
  title?: string;
  imageUrl: string;
  progress?: string;
};

const Card = ({ imageUrl, onPress, progress, title }: Props) => {
  return (
    <Box flex={1} width={width - hs(64)} height={vs(600)}>
      <TouchableOpacity onPress={onPress}>
        <ImageBackground
          source={{
            uri: imageUrl,
          }}
          resizeMode={"cover"}
          style={{
            height: 200,
            borderTopRightRadius: ms(16),
            borderTopLeftRadius: ms(16),
            borderBottomLeftRadius: title ? 0 : ms(16),
            borderBottomRightRadius: title ? 0 : ms(16),
            overflow: "hidden",
          }}
        >
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
        </ImageBackground>
        {title && (
          <Box
            paddingVertical="vs"
            alignItems="center"
            backgroundColor="secBackground"
            borderBottomLeftRadius={"xl"}
            borderBottomRightRadius={"xl"}
          >
            <ReText variant="BodyLarge" color="primary6">
              {title}
            </ReText>
          </Box>
        )}
      </TouchableOpacity>
    </Box>
  );
};

export default Card;
