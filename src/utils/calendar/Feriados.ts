import { loadHolidays, saveHolidays } from "../data";

export async function getHolidays(year: number) {
  const cached = await loadHolidays(year);

  if (cached) return cached;

  const res = await fetch(`https://brasilapi.com.br/api/feriados/v1/${year}`);
  const data = await res.json();

  await saveHolidays(year, data);

  return data;
}