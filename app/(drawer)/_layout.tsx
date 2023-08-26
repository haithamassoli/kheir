import { Feather } from "@expo/vector-icons";
import CustomDrawer from "@src/layouts/custom-drawer";
import { IconSize } from "@styles/size";
import { blurhash } from "@utils/helper";
import { ms } from "@utils/platform";
import { useStore } from "@zustand/store";
import { Image } from "expo-image";
import { Drawer } from "expo-router/drawer";

const HomeDrawer = () => {
  const { isDark } = useStore();
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        drawerPosition: "left",
        drawerType: "front",
        headerTitleStyle: {
          fontFamily: "CairoBold",
          fontSize: ms(16),
        },
        drawerStyle: {
          width: "68%",
        },
        headerLeft: () => null,
      }}
    >
      <Drawer.Screen
        name="(homeStack)"
        options={{
          title: "الرئيسة",
          headerShown: false,
          drawerIcon: ({ color }) => (
            <Feather name="home" size={IconSize.m} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="donations"
        options={{
          title: "تبرعاتي",
          drawerIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require("@assets/icons/drawerIcons/priDonations.png")
                  : isDark
                  ? require("@assets/icons/drawerIcons/darkDonations.png")
                  : require("@assets/icons/drawerIcons/donations.png")
              }
              contentFit="contain"
              placeholder={blurhash}
              transition={400}
              placeholderContentFit="contain"
              style={{ width: IconSize.m, height: IconSize.m }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="notifications"
        options={{
          title: "الإشعارات",
          drawerIcon: ({ color }) => (
            <Feather name="bell" size={IconSize.m} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="profile"
        options={{
          headerTitle: "الملف الشخصي",
          drawerItemStyle: { display: "none" },
        }}
      />
      <Drawer.Screen
        name="contact"
        options={{
          title: "تواصل معنا",
          drawerIcon: ({ color }) => (
            <Feather name="mail" size={IconSize.m} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="about"
        options={{
          title: "عن تطبيق خير",
          drawerIcon: ({ color }) => (
            <Feather name="info" size={IconSize.m} color={color} />
          ),
        }}
      />
    </Drawer>
  );
};

export default HomeDrawer;
