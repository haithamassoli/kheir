import { Feather } from "@expo/vector-icons";
import CustomDrawer from "@src/layouts/custom-drawer";
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
          drawerIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="donations"
        options={{
          title: "تبرعاتي",
          drawerIcon: ({ size, focused }) => (
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
              style={{ width: size, height: size }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="notifications"
        options={{
          title: "الإشعارات",
          drawerIcon: ({ color, size }) => (
            <Feather name="bell" size={size} color={color} />
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
          drawerIcon: ({ color, size }) => (
            <Feather name="mail" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="about"
        options={{
          title: "عن تطبيق خير",
          drawerIcon: ({ color, size }) => (
            <Feather name="info" size={size} color={color} />
          ),
        }}
      />
    </Drawer>
  );
};

export default HomeDrawer;
