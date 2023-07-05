import { Feather } from "@expo/vector-icons";
import Colors from "@styles/colors";
import { IconSize } from "@styles/size";
import { Box, ReText, Theme } from "@styles/theme";
import { useStore } from "@zustand/store";
import { useRouter } from "expo-router";
import { Button, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { vs } from "@utils/platform";
import ControlledInput from "@components/controlledInput";
import { useTheme } from "@shopify/restyle";
import { TouchableOpacity } from "react-native";
import Snackbar from "@components/snackbar";
import { type ValidationSchemaType, validationSchema } from "@src/types/schema";
import { useState } from "react";

const SingUp = () => {
  const { setSnackbarText, register } = useStore((state) => state);
  const router = useRouter();
  const { colors } = useTheme<Theme>();
  const { control, handleSubmit } = useForm<ValidationSchemaType>({
    resolver: zodResolver(validationSchema),
  });
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data: ValidationSchemaType) => {
    console.log(data);
    register(data.email, data.password, setSnackbarText);
  };

  const onEyePress = () => {
    setShowPassword((e) => !e);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Snackbar />
      <Box flex={1} paddingHorizontal="hl" paddingTop="vl">
        <Feather
          name="x"
          size={IconSize.l}
          color={colors.text}
          onPress={() => router.push("/")}
        />
        <Box flex={1}>
          <Box height={"25%"} justifyContent="center" alignItems="center">
            <Feather name="user" color={Colors.primary} size={IconSize.xl} />
            <ReText variant="DisplaySmall">تسجيل حساب جديد</ReText>
          </Box>
          <Box height={vs(64)} />
          <ControlledInput
            control={control}
            name="email"
            label={"البريد الإلكتروني"}
            keyboardType="email-address"
            autoComplete="email"
            textContentType="emailAddress"
            style={{
              width: "100%",
              fontFamily: "CairoReg",
            }}
          />
          <ControlledInput
            control={control}
            name="password"
            textContentType="password"
            secureTextEntry={!showPassword}
            right={
              <TextInput.Icon
                icon={showPassword ? "eye-off" : "eye"}
                onPress={onEyePress}
              />
            }
            label={"كلمة المرور"}
            style={{ width: "100%", fontFamily: "CairoReg" }}
          />
          <Box height={vs(32)} />
          <Button
            mode="contained-tonal"
            onPress={handleSubmit(onSubmit)}
            style={{ width: "100%" }}
            labelStyle={{ fontFamily: "CairoSemiBold" }}
          >
            تسجيل
          </Button>
          <TouchableOpacity onPress={() => router.push("/sign-in")}>
            <ReText marginTop="hm" marginHorizontal="hs" variant="BodySmall">
              لديك حساب؟ تسجيل الدخول
            </ReText>
          </TouchableOpacity>
        </Box>
      </Box>
    </SafeAreaView>
  );
};

export default SingUp;
