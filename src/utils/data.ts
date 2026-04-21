import AsyncStorage from "@react-native-async-storage/async-storage";

export async function saveTransactions(newData: any[]) {
  const existing = await AsyncStorage.getItem("transactions");

  let parsed = existing ? JSON.parse(existing) : [];

  const updated = [...parsed, ...newData];

  await AsyncStorage.setItem("transactions", JSON.stringify(updated));
}

export async function loadTransactions() {
  const data = await AsyncStorage.getItem("transactions");

  if (!data) return [];

  return JSON.parse(data);
}