import HeaderRight from "@components/headerRight";
import { Box, ReText } from "@styles/theme";
import { useNavigation } from "expo-router";
import { Drawer } from "expo-router/drawer";

const Profile = () => {
  const navigation: any = useNavigation();
  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <Drawer.Screen
        options={{
          headerRight: () => (
            <HeaderRight onPress={() => navigation.openDrawer()} />
          ),
        }}
      />
      <ReText variant="DisplaySmall">Profile</ReText>
      <ReText variant="BodySmall">KHEIR</ReText>
    </Box>
  );
};

export default Profile;
