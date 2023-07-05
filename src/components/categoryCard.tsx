import {
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageSourcePropType,
} from "react-native";
import { Box, ReText } from "@styles/theme";
import { hs, vs } from "@utils/platform";

type Props = {
  onPress: () => void;
  title: string;
  image: ImageSourcePropType;
};

const CategoryCard = ({ onPress, title, image }: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Box
        width={hs(65)}
        height={vs(70)}
        backgroundColor="black9"
        justifyContent="center"
        alignItems="center"
        borderRadius="m"
      >
        <Image
          source={image}
          style={{ width: hs(44), height: vs(39), resizeMode: "contain" }}
        />
      </Box>
      <ReText variant="LabelMedium" textAlign="center" marginTop="vs">
        {title}
      </ReText>
    </TouchableOpacity>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  container: {
    width: hs(65),
    height: vs(70),
  },
});
