import { useFonts } from "expo-font";

export function useAppFonts() {
  return useFonts({
    InterRegular: require("../../assets/fonts/Inter_24pt-Regular.ttf"),
    InterMedium: require("../../assets/fonts/Inter_24pt-Medium.ttf"),
    InterSemiBold: require("../../assets/fonts/Inter_24pt-SemiBold.ttf"),
    InterBold: require("../../assets/fonts/Inter_24pt-Bold.ttf"),
  });
}
