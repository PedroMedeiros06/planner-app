import "../styles/global.css";
import { Slot } from "expo-router";
import { ErrorProvider } from "@/src/contexts/errorContext";

export default function RootLayout() {
  return (
    <ErrorProvider>
      <Slot />
    </ErrorProvider>
  );
}