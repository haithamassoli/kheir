import { TouchableOpacity } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Box, ReText, Theme } from "@styles/theme";
import { IconSize } from "@styles/size";
import { useTheme } from "@shopify/restyle";
import { useStore } from "@zustand/store";
import { ms } from "@utils/platform";
import { useRouter } from "expo-router";

const CustomDrawer = (props: any) => {
  const { toggleTheme, isDark, user, logout } = useStore((state) => state);
  const { colors } = useTheme<Theme>();
  const onToggleTheme = () => toggleTheme();
  const router = useRouter();

  return (
    <Box flex={1}>
      <DrawerContentScrollView {...props}>
        <TouchableOpacity onPress={() => router.push("/profile")}>
          <Box alignItems="center" padding="hm" flexDirection="row" gap="hs">
            <Box
              justifyContent="center"
              alignItems="center"
              style={{
                height: ms(72),
                width: ms(72),
                borderRadius: ms(36),
                overflow: "hidden",
              }}
            >
              <Feather name="user" color={colors.primary8} size={IconSize.xl} />
            </Box>
            <Box alignItems={"center"}>
              <ReText variant="TitleMedium" textAlign="center" color="primary7">
                الملف الشخصي
              </ReText>
              <ReText variant="TitleSmall" color="primary8" textAlign="center">
                {!!user ? "أحمد ملايــشة" : "تسجيل الدخول"}
              </ReText>
            </Box>
          </Box>
        </TouchableOpacity>
        <Box flex={1} paddingTop="vs">
          <DrawerItemList {...props} />
        </Box>
      </DrawerContentScrollView>
      <Box padding="hm" borderTopWidth={1} borderTopColor="black3">
        <TouchableOpacity
          onPress={onToggleTheme}
          style={{ paddingVertical: 15 }}
        >
          <Box flexDirection="row" alignItems="center">
            <Feather
              name={isDark ? "sun" : "moon"}
              color={colors.text}
              size={IconSize.m}
            />
            <ReText variant="LabelLarge" marginLeft="hs" fontFamily="CairoBold">
              {isDark ? "الوضع النهاري" : "الوضع الليلي"}
            </ReText>
          </Box>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={{ paddingVertical: 15 }}>
          <Box flexDirection={"row"} alignItems={"center"}>
            <Ionicons
              name="share-social-outline"
              color={colors.text}
              size={IconSize.m}
            />
            <ReText variant="LabelLarge" marginLeft="hs" fontFamily="CairoBold">
              شارك مع أصدقائك
            </ReText>
          </Box>
        </TouchableOpacity>
        {!!user && (
          <TouchableOpacity
            onPress={() => logout()}
            style={{ paddingVertical: 15 }}
          >
            <Box flexDirection={"row"} alignItems={"center"}>
              <Ionicons
                name="exit-outline"
                color={colors.text}
                size={IconSize.m}
              />
              <ReText
                variant="LabelLarge"
                marginLeft="hs"
                fontFamily="CairoBold"
              >
                تسجيل خروج
              </ReText>
            </Box>
          </TouchableOpacity>
        )}
      </Box>
    </Box>
  );
};

export default CustomDrawer;
