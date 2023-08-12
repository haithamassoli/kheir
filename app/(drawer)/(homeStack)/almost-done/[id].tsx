import { hs, ms, vs } from "@utils/platform";
import { Image, ScrollView } from "react-native";
import { useRouter, useSearchParams } from "expo-router";
import Loading from "@components/loading";
import Card from "@components/card";
import { calcPercentage, width } from "@utils/helper";
import { Checkbox } from "react-native-paper";
import { fetchConstructionByIdQuery } from "@apis/construction";
import { Button, TextInput } from "react-native-paper";
import CollectedCard from "@components/collectedCard";
import ExecutorCard from "@components/executorCard";
import { useCallback, useMemo, useRef, useState } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { Box, ReText } from "@styles/theme";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native-gesture-handler";
import ControlledInput from "@components/controlledInput";
import { useForm } from "react-hook-form";
import Colors from "@styles/colors";
import { useStore } from "@zustand/store";
import {
  ValidationAddToCartSchemaType,
  validationAddToCartSchema,
} from "@src/types/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { fetchAlmostDoneByIdQuery } from "@apis/almostDone";

const defaultDinar = [1, 5, 10, 20];

const ConstructionItem = () => {
  const { id }: Partial<{ id: string }> = useSearchParams();
  const router = useRouter();
  const { data, isLoading } = fetchAlmostDoneByIdQuery(id!);
  const [checked, setChecked] = useState(false);
  const { addToCart, cart } = useStore();
  console.log(cart);

  const { control, handleSubmit, setValue } =
    useForm<ValidationAddToCartSchemaType>({
      resolver: zodResolver(validationAddToCartSchema),
    });

  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["1%", "44%", "58%", "92%"], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const onPress = () => {
    bottomSheetRef.current?.snapToIndex(1);
  };

  const onPressAddToCart = (data: ValidationAddToCartSchemaType) => {
    // console.log("data", data);
    addToCart({
      id: id!,
      price: +data.price!,
      friendPhone: data.friendPhone!,
      name: "شارف على الانتهاء",
    });
    router.push("/");
  };

  if (isLoading) return <Loading />;

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        paddingHorizontal: hs(16),
        paddingVertical: vs(16),
        alignItems: "center",
        gap: vs(16),
      }}
    >
      <Card
        imageUrl={data?.image!}
        title={data?.desc}
        width={width - hs(32)}
        height={vs(240)}
      />
      <CollectedCard
        collected={data?.collected!}
        goal={data?.goal!}
        progress={calcPercentage(data?.goal!, data?.collected!)}
      />
      <ExecutorCard
        beneficiaries={data?.beneficiaries!}
        donors={data?.donors!}
        executor={data?.executor!}
      />
      <Button
        mode="contained-tonal"
        onPress={onPress}
        style={{ width: "100%" }}
      >
        تبرع الآن
      </Button>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backgroundStyle={{ backgroundColor: "#04A6C2" }}
        style={{ backgroundColor: "transparent" }}
      >
        <LinearGradient
          colors={["#04A6C2", "#3FC1C0"]}
          style={{
            width: "100%",
            height: "100%",
            borderTopLeftRadius: ms(20),
            borderTopRightRadius: ms(20),
            paddingHorizontal: hs(16),
          }}
        >
          <Box gap="vs">
            <ReText variant="TitleLarge" textAlign="center" color="lightText">
              مبلغ التبرع
            </ReText>
            <ReText variant="TitleSmall" color="lightText" textAlign="left">
              حدد قيمة التبرع بالدينار الأردني
            </ReText>
            <Box
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              {defaultDinar.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setValue("price", item.toString())}
                  style={{
                    width: width * 0.18,
                    height: hs(48),
                    borderRadius: ms(12),
                    backgroundColor: "#fff",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ReText variant="HeadlineSmall" color={"primary"}>
                    {item}
                  </ReText>
                </TouchableOpacity>
              ))}
            </Box>
            <ControlledInput
              mode="flat"
              name="price"
              control={control}
              keyboardType="numeric"
              textColor={Colors.primary}
              cursorColor={Colors.primary}
              placeholderTextColor={Colors.primary}
              placeholder={"أدخل المبلغ"}
              style={{
                backgroundColor: "transparent",
                borderRadius: ms(8),
                height: vs(36),
              }}
              underlineStyle={{
                display: "none",
              }}
              contentStyle={{
                backgroundColor: Colors.lightBackgroundSec,
                borderRadius: ms(8),
                height: vs(36),
              }}
              right={
                <TextInput.Affix
                  textStyle={{ color: Colors.primary }}
                  text="دإ"
                />
              }
            />
            <Box flexDirection="row" alignItems="center">
              <Checkbox
                status={checked ? "checked" : "unchecked"}
                color={"#fff"}
                uncheckedColor={"#fff"}
                onPress={() => {
                  setChecked((prev) => {
                    bottomSheetRef.current?.snapToIndex(prev ? 1 : 2);
                    return !prev;
                  });
                }}
              />
              <ReText variant="BodySmall" color="lightText" textAlign="left">
                تبرّع عن أهلك أو أصدقائك و أرسلها لهم كهدية
              </ReText>
            </Box>
            {checked && (
              <>
                <ReText variant="TitleSmall" color="lightText" textAlign="left">
                  أدخل رقم هاتف قريبك/صديقك لنرسل له هديتك
                </ReText>
                <ControlledInput
                  mode="flat"
                  name="friendPhone"
                  control={control}
                  keyboardType="numeric"
                  textColor={Colors.primary}
                  cursorColor={Colors.primary}
                  placeholderTextColor={Colors.primary}
                  right={
                    <TextInput.Icon icon={"phone"} color={Colors.primary} />
                  }
                  style={{
                    backgroundColor: Colors.lightBackgroundSec,
                    borderRadius: ms(8),
                    height: vs(36),
                    width: "100%",
                  }}
                  underlineStyle={{
                    display: "none",
                  }}
                  contentStyle={{
                    backgroundColor: Colors.lightBackgroundSec,
                    borderRadius: ms(8),
                    height: vs(36),
                  }}
                />
              </>
            )}
            <Box
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
              gap="hl"
            >
              <Button
                mode="contained-tonal"
                onPress={onPress}
                buttonColor={Colors.lightBackground}
                textColor={Colors.primary}
                labelStyle={{ fontFamily: "CairoBold" }}
                style={{ width: "68%" }}
              >
                تــبــــــرّع الآن
              </Button>
              <TouchableOpacity onPress={handleSubmit(onPressAddToCart)}>
                <Box
                  width={hs(64)}
                  height={hs(42)}
                  borderRadius="l"
                  style={{
                    backgroundColor: Colors.lightBackground,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image source={require("@assets/icons/cart.jpg")} />
                </Box>
              </TouchableOpacity>
            </Box>
          </Box>
        </LinearGradient>
      </BottomSheet>
    </ScrollView>
  );
};

export default ConstructionItem;
