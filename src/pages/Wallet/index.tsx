//Importantes
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

// Components
import { Balance } from "./widgets/balance";
import { FinancialReports } from "./widgets/financialReports"
import { Transations } from "./widgets/transations";

// Utils
import { loadTransactions } from "@/src/utils/data";

// Contexts
import { useError } from "@/src/contexts/errorContext";

export function Wallet() {
  const [data, setData] = useState<any[]>([]);

  const { showError } = useError();

  useEffect(() => {
    async function init() {
      const stored = await loadTransactions();
      setData(stored);
    }

    init();
  }, []);

  return (
    <View className="flex flex-col">
      <Text className="text-main-text font-semibold text-xl mb-3">
        Olá, Pedro
      </Text>
      <Balance setData={setData} />
      <Transations data={data} />
      <FinancialReports setData={setData} />
    </View>
  );
}
