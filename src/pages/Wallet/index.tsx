import { Text, View} from "react-native";

import { Balance } from "@/src/components/Wallet/widgets/balance";
import { FinancialReports } from "@/src/components/Wallet/widgets/financialReports";
import { Transations } from "@/src/components/Wallet/widgets/transations";

export function Wallet() {

  return (
    <View className="flex flex-col">
      <Text className="text-main-text font-semibold text-xl mb-3">
        Olá, Pedro
      </Text>
      <Balance />
      <Transations />
      <FinancialReports />
    </View>
  );
}
