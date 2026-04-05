import { colors } from "@/src/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, View, Text } from "react-native";

type ScreenName = typeof tabs[number]["name"];

const tabs = [
  { name: "home", icon: "home" },
  { name: "wallet", icon: "wallet" },
  { name: "calendar", icon: "calendar" },
  { name: "user", icon: "person" },
] as const

type FooterProps = {
  activeScreen: ScreenName;
  onChangeScreen: (screen: ScreenName) => void;
};

export function Footer({ activeScreen, onChangeScreen }: FooterProps) {
  return (
    <View className="bg-card-background flex-row justify-around items-center h-16 px-2 rounded-full">
      {tabs.map((tab) => (
        <Pressable
          key={tab.name}
          className={`items-center justify-center p-3 ${
            activeScreen === tab.name ? "bg-black/20 rounded-full" : ""
          }`}
          onPress={() => onChangeScreen(tab.name)}
        >
          <Ionicons name={tab.icon} size={22} 
          color={activeScreen === tab.name ? colors["main-text"] : colors["desactived-text"]} />
          {/* <View className="bg-red-500 rounded-full w-2 h-2 absolute top-2 right-1.5"></View> */}
        </Pressable>
      ))}
    </View>
  );
}
