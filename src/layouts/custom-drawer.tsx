import { View, ImageBackground, Image, TouchableOpacity } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@styles/colors";
import { Box, ReText, Theme } from "@styles/theme";
import { IconSize } from "@styles/size";
import { useTheme } from "@shopify/restyle";
import { useStore } from "@zustand/store";

const CustomDrawer = (props: any) => {
  const toggleTheme = useStore((state) => state.toggleTheme);
  const { colors } = useTheme<Theme>();

  const onToggleTheme = () => {
    toggleTheme();
  };
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: Colors.primary }}
      >
        <Box
          backgroundColor="primary5"
          justifyContent="center"
          alignItems="center"
          padding="hm"
          style={{ padding: 20 }}
        >
          <ImageBackground
            source={require("@assets/images/logo.png")}
            style={{
              height: 220,
              width: 180,
              marginBottom: 10,
            }}
          >
            <Image
              source={{
                uri: "https://fut-watch.com/img/20/headshot/50557726-large.png",
              }}
              style={{
                height: 140,
                width: 120,
                alignSelf: "center",
                marginTop: 20,
              }}
            />
            <ReText
              variant="TitleMedium"
              style={{
                color: "#fff",
                fontSize: 12,
                fontFamily: "CairoBold",
                marginTop: -35,
                textAlign: "center",
              }}
            >
              أحمد ملايشة
            </ReText>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <ReText
                variant="TitleMedium"
                style={{
                  color: "#fff",
                  textAlign: "center",
                  fontFamily: "CairoBold",
                }}
              >
                مصمم ومطور
              </ReText>
            </View>
            {/* <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                variant="TitleMedium"
                style={{
                  color: "#fff",
                  textAlign: "center",
                  fontFamily: "CairoBold",
                  marginRight: 5,
                }}
              >
                الطول: 1.75
              </Text>
              <Text
                variant="TitleMedium"
                style={{
                  color: "#fff",
                  textAlign: "center",
                  fontFamily: "CairoBold",
                  marginRight: 5,
                }}
              >
                العمر: 1.75
              </Text>
              <Text
                variant="TitleMedium"
                style={{
                  color: "#fff",
                  textAlign: "center",
                  fontFamily: "CairoBold",
                  marginRight: 5,
                }}
              >
                الوزن: 1.75
              </Text>
            </View> */}
          </ImageBackground>
        </Box>
        <Box flex={1} backgroundColor="mainBackground" paddingTop="vs">
          <DrawerItemList {...props} />
        </Box>
      </DrawerContentScrollView>
      <Box padding="hm" borderTopWidth={1} borderTopColor="black3">
        <TouchableOpacity
          onPress={onToggleTheme}
          style={{ paddingVertical: 15 }}
        >
          <Box flexDirection="row" alignItems="center">
            <Ionicons
              name="moon-outline"
              color={colors.text}
              size={IconSize.m}
            />
            <ReText variant="BodyMedium" marginLeft="hs">
              الوضع الليلي
            </ReText>
          </Box>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons
              name="share-social-outline"
              color={colors.text}
              size={IconSize.m}
            />
            <ReText variant="BodyMedium" marginLeft="hs">
              شارك مع أصدقائك
            </ReText>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons
              name="exit-outline"
              color={colors.text}
              size={IconSize.m}
            />
            <ReText variant="BodyMedium" marginLeft="hs">
              تسجيل خروج
            </ReText>
          </View>
        </TouchableOpacity>
      </Box>
    </View>
  );
};

export default CustomDrawer;
