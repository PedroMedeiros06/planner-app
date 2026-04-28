import { colors } from "@/src/theme/colors";
import { getHolidays } from "@/src/utils/calendar/Feriados";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Calendar } from "react-native-calendars";

export function UserCalendar() {
  const [markedDates, setMarkedDates] = useState<any>({});

  useEffect(() => {
    loadHolidays(2026);
  }, []);

  const loadHolidays = async (year: number) => {
    const holidays = await getHolidays(year);
    const formatted: any = {};

    holidays.forEach((h: any) => {
      formatted[h.date] = {
        dots: [
          {
            key: "holiday",
            color: colors["error-color"],
          },
        ],
      };
    });

    setMarkedDates(formatted);
  };

  return (
    <View className="flex flex-col">
      <Text className="text-main-text font-bold text-xl mb-3">Calendário</Text>

      <View className="bg-input-background p-3 rounded-xl border border-input-border">
        <Calendar
          hideExtraDays
          markingType="multi-dot"
          markedDates={markedDates}
          theme={{
            calendarBackground: "transparent",

            monthTextColor: colors["main-text"],
            textMonthFontFamily: "Inter_600SemiBold",

            arrowColor: colors["second-text"],

            dayTextColor: colors["desactived-text"],

            todayBackgroundColor: colors["input-border"],
            todayTextColor: colors["main-text"],
          }}
          onDayPress={(day) => {
            console.log("Selecionado:", day.dateString);
          }}
        />
      </View>
    </View>
  );
}
