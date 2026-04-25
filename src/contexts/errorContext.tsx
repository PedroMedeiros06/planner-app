import { createContext, useContext, useState } from "react";
import { Animated, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type ErrorItem = {
  id: string;
  message: string;
  translateY: Animated.Value;
  opacity: Animated.Value;
};

type ErrorContextType = {
  showError: (message: string) => void;
};

const ErrorContext = createContext<ErrorContextType | null>(null);

export function ErrorProvider({ children }: any) {
  const [errors, setErrors] = useState<ErrorItem[]>([]);
  const insets = useSafeAreaInsets();

  function showError(message: string) {
    const id = Date.now().toString();

    // evita duplicado
    if (errors.some((e) => e.message === message)) return;

    const newError: ErrorItem = {
      id,
      message,
      translateY: new Animated.Value(-40),
      opacity: new Animated.Value(0),
    };

    // 🔥 adiciona no state
    setErrors((prev) => [...prev, newError]);

    // 🔥 anima FORA do setState
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(newError.translateY, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(newError.opacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }, 0);

    // saída
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(newError.translateY, {
          toValue: -40,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(newError.opacity, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setErrors((prev) => prev.filter((e) => e.id !== id));
      });
    }, 2000);
  }

  return (
    <ErrorContext.Provider value={{ showError }}>
      {children}

      <View
        pointerEvents="box-none"
        style={{
          position: "absolute",
          top: insets.top + 10,
          left: 0,
          right: 0,
          zIndex: 999,
          alignItems: "center",
        }}
      >
        {errors.slice(0, 2).map((error) => (
          <Animated.View
            key={error.id}
            style={{
              transform: [{ translateY: error.translateY }],
              opacity: error.opacity,
              marginBottom: 8,
              width: "90%",
            }}
          >
            <View className="bg-error-color px-4 py-3 rounded-xl">
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                className="text-main-text font-regular"
              >
                {error.message}
              </Text>
            </View>
          </Animated.View>
        ))}
      </View>
    </ErrorContext.Provider>
  );
}

export function useError() {
  const context = useContext(ErrorContext);

  if (!context) {
    throw new Error("useError deve ser usado dentro do ErrorProvider");
  }

  return context;
}
