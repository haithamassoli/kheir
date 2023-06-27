import { Tabs } from "expo-router";

const HomeTabs = () => {
  return (
    <Tabs initialRouteName="index">
      <Tabs.Screen name="index" options={{ headerShown: false }} />
      <Tabs.Screen name="about" options={{ headerShown: false }} />
      <Tabs.Screen name="setting" options={{ headerShown: false }} />
    </Tabs>
  );
};

export default HomeTabs;
