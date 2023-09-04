import { ms } from "@utils/platform";
import { Stack } from "expo-router";

const HomeStack = () => {
  return (
    <Stack
      screenOptions={{
        animation: "slide_from_left",
        headerTitleAlign: "center",
        headerBackTitle: "رجوع",
        headerBackTitleStyle: {
          fontFamily: "CairoReg",
          fontSize: ms(16),
        },
        headerTitleStyle: {
          fontFamily: "CairoBold",
          fontSize: ms(16),
        },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="cart"
        options={{
          title: "بوابة خير",
        }}
      />
      <Stack.Screen
        name="volunteer/index"
        options={{
          title: "فرص التطوع",
        }}
      />
      <Stack.Screen
        name="volunteer/[id]"
        options={{
          title: "فرص التطوع",
        }}
      />
      <Stack.Screen
        name="emergencies/index"
        options={{
          title: "الحالات الطارئة",
        }}
      />
      <Stack.Screen
        name="emergencies/[id]"
        options={{
          title: "الحالات الطارئة",
        }}
      />
      <Stack.Screen
        name="health/index"
        options={{
          title: "صحة وعلاج",
        }}
      />
      <Stack.Screen
        name="blood-donation/index"
        options={{
          title: "التبرع بالدم",
        }}
      />
      <Stack.Screen
        name="student-sponsorship/index"
        options={{
          title: "التبرع بالدم",
        }}
      />
      <Stack.Screen
        name="paying-debt/index"
        options={{
          title: "سداد الدين",
        }}
      />
      <Stack.Screen
        name="construction/index"
        options={{
          title: "إعمــار",
        }}
      />
      <Stack.Screen
        name="construction/[id]"
        options={{
          title: "إعمــار",
        }}
      />
      <Stack.Screen
        name="almost-done/[id]"
        options={{
          title: "شارف على الانتهاء",
        }}
      />
    </Stack>
  );
};

export default HomeStack;
