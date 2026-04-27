import AsyncStorage from "@react-native-async-storage/async-storage";

const HOLIDAY_KEY = (year: number) => `holidays_${year}`;

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

export async function saveHolidays(year: number, data: any[]) {
  await AsyncStorage.setItem(HOLIDAY_KEY(year), JSON.stringify(data));
}

export async function loadHolidays(year: number) {
  const data = await AsyncStorage.getItem(HOLIDAY_KEY(year));
  return data ? JSON.parse(data) : null;
}