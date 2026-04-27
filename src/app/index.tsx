import { useState } from "react";
import { View } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Footer } from "../components/Footer";

import { Home } from "../pages/Home";
import { Wallet } from "../pages/Wallet";
import { UserCalendar } from "../pages/Calendar";

import { useAppFonts } from "../theme/fonts";

const Screens = {
  home: Home,
  calendar: UserCalendar,
  wallet: Wallet,
  user: Home,
};

export default function appIndex() {
  const insets = useSafeAreaInsets();
  const [activeScreen, setScreen] = useState<keyof typeof Screens>("calendar");

  const [loaded] = useAppFonts();

  if (!loaded) return null;

  const ActiveScreen = Screens[activeScreen];

  return (
    <View
      style={{ flex: 1, paddingTop: insets.top }}
      className="bg-main-background"
    >
      {/* Header fixo */}

      {/* Tela ativa */}
      <View style={{ flex: 1 }} className="p-6">
        <ActiveScreen />
      </View>

      {/* Footer */}
      <View
        className="absolute w-full px-6"
        style={{
          bottom: 0,
          paddingBottom: insets.bottom + 25,
        }}
      >
        <Footer activeScreen={activeScreen} onChangeScreen={setScreen} />
      </View>
    </View>
  );
}
