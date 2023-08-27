import { Feather, Ionicons } from "@expo/vector-icons";
import Colors from "@styles/colors";
import { IconSize } from "@styles/size";
import { Box, ReText, Theme } from "@styles/theme";
import { useRouter } from "expo-router";
import { Button, TextInput } from "react-native-paper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { vs } from "@utils/platform";
import ControlledInput from "@components/controlledInput";
import { useTheme } from "@shopify/restyle";
import { TouchableOpacity } from "react-native";
import Snackbar from "@components/snackbar";
import { useEffect, useState } from "react";
import { type ValidationSchemaType, validationSchema } from "@src/types/schema";
import Loading from "@components/loading";
import { googleLoginMutation, loginMutation } from "@apis/auth";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthRequest } from "expo-auth-session/providers/google";
import { useStore } from "@zustand/store";
import { useNetInfo } from "@react-native-community/netinfo";

const SignIn = () => {
  const router = useRouter();
  const { isConnected } = useNetInfo();
  const { colors } = useTheme<Theme>();
  const { control, handleSubmit } = useForm<ValidationSchemaType>({
    resolver: zodResolver(validationSchema),
  });

  const [request, response, promptAsync] = useAuthRequest({
    androidClientId:
      "362796967322-8lpbjhidg6nd8tb71godh8uh7thedctj.apps.googleusercontent.com",
  });

  const [showPassword, setShowPassword] = useState(false);
  const { mutate, isLoading } = loginMutation();
  const { mutate: googleLogin, isLoading: googleLoading } =
    googleLoginMutation();

  const onSubmit = (data: ValidationSchemaType) => {
    mutate(data);
  };

  const onEyePress = () => {
    setShowPassword((e) => !e);
  };

  const handleEffect = () => {
    if (isConnected === false)
      return useStore.setState({
        snackbarText: "لا يوجد اتصال بالإنترنت",
      });
    if (response?.type === "success") {
      const { id_token } = response.params;
      googleLogin(id_token);
    }
  };

  useEffect(() => {
    handleEffect();
  }, [response]);

  if (isLoading || googleLoading) return <Loading />;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Snackbar />
      <Box flex={1} paddingHorizontal="hl" paddingTop="vl">
        <Feather
          name="x"
          size={IconSize.l}
          color={colors.text}
          onPress={() => router.replace("/")}
        />
        <Box flex={1}>
          <Box height={"25%"} justifyContent="center" alignItems="center">
            <Feather name="user" color={Colors.primary} size={IconSize.xl} />
            <ReText variant="DisplaySmall">تسجيل الدخول</ReText>
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
          <Box height={vs(12)} />
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
            contentStyle={{
              height: vs(46),
            }}
          >
            تسجيل الدخول
          </Button>
          <TouchableOpacity onPress={() => router.push("/sign-up")}>
            <ReText
              marginTop="hm"
              textAlign="left"
              marginHorizontal="hs"
              variant="BodySmall"
            >
              ليس لديك حساب؟ سجل الآن
            </ReText>
          </TouchableOpacity>
          <ReText
            marginVertical="vl"
            textAlign="center"
            variant="LabelLarge"
            fontFamily="CairoBold"
          >
            أو
          </ReText>
          <Box
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            gap="hl"
          >
            <TouchableOpacity onPress={() => promptAsync()}>
              <Ionicons
                name="logo-google"
                size={IconSize.l}
                color={Colors.primary}
                style={{ alignSelf: "center" }}
              />
            </TouchableOpacity>
          </Box>
        </Box>
      </Box>
    </SafeAreaView>
  );
};

export default SignIn;
