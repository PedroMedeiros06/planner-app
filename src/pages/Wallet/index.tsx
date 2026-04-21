import { Balance } from "@/src/components/Wallet/widgets/balance";
import { FinancialReports } from "@/src/components/Wallet/widgets/financialReports";
import { Transations } from "@/src/components/Wallet/widgets/transations";
import { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { loadTransactions } from "@/src/utils/data";

export function Wallet() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    async function init() {
      const stored = await loadTransactions();
      setData(stored);
    }

    init();
  }, []);

  console.log(data);

  return (
    <View className="flex flex-col">
      <Text className="text-main-text font-semibold text-xl mb-3">
        Olá, Pedro
      </Text>
      <Balance setData={setData} />
      <Transations data={data} />
      <FinancialReports />
    </View>
  );
}
