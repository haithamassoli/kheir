import ControlledInput from "@components/controlledInput";
import { Feather } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from "@shopify/restyle";
import { Box, ReText, Theme } from "@styles/theme";
import {
  ValidationCardSchemaType,
  validationCardSchema,
} from "@src/types/schema";
import { hs, ms, vs } from "@utils/platform";
import { useStore } from "@zustand/store";
import { useForm } from "react-hook-form";
import { ScrollView } from "react-native";
import { Button } from "react-native-paper";
import { router } from "expo-router";
import { storeDataToStorage } from "@utils/helper";
import { useEffect } from "react";
import { addOrderMutation } from "@apis/cart";
import { useQueryClient } from "@tanstack/react-query";
import Animated, { FadeInUp } from "react-native-reanimated";

const Cart = () => {
  const { cart, user } = useStore();
  const queryClient = useQueryClient();
  const { control, handleSubmit } = useForm<ValidationCardSchemaType>({
    resolver: zodResolver(validationCardSchema),
  });
  const { colors } = useTheme<Theme>();

  const { mutate } = addOrderMutation();

  const calculateTotal = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.price;
    });
    return total;
  };

  useEffect(() => {
    if (cart.length === 0) {
      useStore.setState({
        snackbarText: "سلة التبرعات فارغة",
      });
      router.push("/");
    }
  }, []);

  const onSubmit = async (data: ValidationCardSchemaType) => {
    await storeDataToStorage("cart", null);
    mutate(
      {
        uid: user?.uid!,
        cart: cart,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["almostDone"]);
          queryClient.invalidateQueries(["construction"]);
          useStore.setState({
            cart: [],
            snackbarText: "تمت عملية الدفع بنجاح",
          });
          router.push("/");
        },
      }
    );
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        paddingHorizontal: hs(16),
        paddingVertical: vs(16),
      }}
    >
      <Animated.View entering={FadeInUp.duration(600)}>
        <ReText variant="TitleLarge" marginBottom="vs" textAlign="left">
          سلة التبرعات
        </ReText>
      </Animated.View>
      <Animated.View entering={FadeInUp.duration(600).delay(200)}>
        <Box
          backgroundColor="primary"
          width="100%"
          paddingHorizontal="hl"
          paddingVertical="vm"
          borderRadius="l"
          zIndex="modal"
        >
          <ReText variant="BodyLarge" textAlign="left" color="lightText">
            المبلغ الإجمالي
          </ReText>
          <ReText variant="BodyLarge" textAlign="left" color="lightText">
            {calculateTotal()} دينار
          </ReText>
        </Box>
        <Box>
          <Box
            marginBottom="vs"
            paddingTop="vl"
            paddingBottom="vm"
            borderRadius="l"
            borderTopEndRadius="none"
            borderTopStartRadius="none"
            paddingHorizontal="hl"
            backgroundColor="secBackground"
            style={{
              marginTop: vs(-16),
            }}
          >
            {cart.map((item) => (
              <Box
                key={item.id}
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                paddingVertical="vxs"
              >
                <ReText variant="TitleSmall" textAlign="left">
                  {item.name}
                </ReText>
                <Box flexDirection="row" alignItems="center">
                  <ReText variant="TitleSmall">{item.price} دينار</ReText>
                  <Feather
                    name="x"
                    size={ms(20)}
                    color={colors.primary}
                    onPress={async () => {
                      useStore.setState({
                        cart: cart.filter(
                          (cartItem) => cartItem.id !== item.id
                        ),
                      });
                      await storeDataToStorage(
                        "cart",
                        cart.filter((cartItem) => cartItem.id !== item.id)
                      );
                      if (cart.length === 1) {
                        router.push("/");
                      }
                    }}
                  />
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Animated.View>
      <Animated.View entering={FadeInUp.duration(600).delay(400)}>
        <ReText variant="TitleLarge" textAlign="left" marginBottom="vs">
          بطاقات الدفع
        </ReText>
      </Animated.View>
      <Animated.View entering={FadeInUp.duration(600).delay(600)}>
        <ReText variant="TitleSmall" textAlign="left">
          الاسم على البطاقة
        </ReText>
        <ControlledInput
          mode="flat"
          name="cardHolder"
          control={control}
          style={{
            borderRadius: ms(8),
            height: vs(36),
            width: "100%",
          }}
          underlineStyle={{
            display: "none",
          }}
          contentStyle={{
            borderRadius: ms(8),
            height: vs(36),
          }}
        />
      </Animated.View>
      <Animated.View entering={FadeInUp.duration(600).delay(800)}>
        <ReText variant="TitleSmall" textAlign="left" marginTop="vs">
          رقم البطاقة
        </ReText>
        <ControlledInput
          mode="flat"
          name="cardNumber"
          keyboardType="numeric"
          control={control}
          style={{
            borderRadius: ms(8),
            height: vs(36),
            width: "100%",
          }}
          underlineStyle={{
            display: "none",
          }}
          contentStyle={{
            borderRadius: ms(8),
            height: vs(36),
          }}
        />
      </Animated.View>
      <Animated.View entering={FadeInUp.duration(600).delay(1000)}>
        <Box
          flexDirection="row"
          justifyContent="space-between"
          marginBottom="vs"
        >
          <Box width="48%">
            <ReText variant="TitleSmall" textAlign="left" marginTop="vs">
              تاريخ الانتهاء (شهر/سنة)
            </ReText>
            <Box flexDirection="row">
              <ControlledInput
                mode="flat"
                name="expiryDateMonth"
                withError={false}
                keyboardType="numeric"
                control={control}
                style={{
                  borderTopLeftRadius: ms(8),
                  borderBottomLeftRadius: ms(8),
                  height: vs(36),
                  width: "33%",
                }}
                underlineStyle={{
                  display: "none",
                }}
              />
              <Box backgroundColor="black5" width={ms(2)} height={"100%"} />
              <ControlledInput
                mode="flat"
                name="expiryDateYear"
                keyboardType="numeric"
                withError={false}
                control={control}
                style={{
                  borderTopRightRadius: ms(8),
                  borderBottomRightRadius: ms(8),
                  height: vs(36),
                  width: "33%",
                }}
                underlineStyle={{
                  display: "none",
                }}
              />
            </Box>
          </Box>
          <Box width="48%">
            <ReText variant="TitleSmall" textAlign="left" marginTop="vs">
              CVV
            </ReText>
            <ControlledInput
              mode="flat"
              name="cvv"
              keyboardType="numeric"
              control={control}
              style={{
                borderRadius: ms(8),
                height: vs(36),
                width: "100%",
              }}
              underlineStyle={{
                display: "none",
              }}
              contentStyle={{
                borderRadius: ms(8),
                height: vs(36),
              }}
            />
          </Box>
        </Box>
      </Animated.View>
      <Animated.View entering={FadeInUp.duration(600).delay(1200)}>
        <Box
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          gap="hxs"
          marginBottom="vxs"
        >
          <Feather name="lock" size={ms(22)} color={colors.text} />
          <ReText variant="TitleMedium">عملية الدفع آمنة 100%</ReText>
        </Box>
      </Animated.View>
      <Animated.View entering={FadeInUp.duration(600).delay(1400)}>
        <Box
          flexDirection="row"
          justifyContent="center"
          gap="hxs"
          marginBottom="vs"
        >
          <ReText variant="TitleSmall" textAlign="center">
            بإتمام التبرع فأنت توافق على
          </ReText>
          <ReText variant="TitleSmall" color="primary">
            سياسات التبرع
          </ReText>
        </Box>
      </Animated.View>
      <Animated.View entering={FadeInUp.duration(600).delay(1600)}>
        <Button
          mode="contained"
          style={{
            borderRadius: ms(8),
            width: "100%",
          }}
          contentStyle={{
            borderRadius: ms(8),
            height: vs(46),
          }}
          onPress={handleSubmit(onSubmit)}
          labelStyle={{ fontFamily: "CairoBold" }}
        >
          إتمام عملية التبرع
        </Button>
      </Animated.View>
    </ScrollView>
  );
};

export default Cart;
