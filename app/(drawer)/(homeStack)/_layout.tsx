import { Stack } from "expo-router";

const HomeStack = () => {
  return (
    <Stack
      screenOptions={{
        headerTitleAlign: "center",
        headerBackTitle: "الرجوع",
        headerBackTitleVisible: false,
        headerTitleStyle: {
          fontFamily: "CairoBold",
        },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="cart"
        options={{
          title: "سلة التبرعات",
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
      {/* <Stack.Screen
        name="achievements/[id]"
        options={{
          title: "",
        }}
      /> */}
    </Stack>
  );
};

export default HomeStack;
