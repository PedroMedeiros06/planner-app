import { colors } from "@/src/theme/colors";
import { formatCurrency } from "@/src/utils/formatCurrency";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { banks } from "@/src/infos/banks";
import { hexToRgba } from "@/src/utils/hexToRgba";

export type TransactionType = {
  transacao: string;
  detalhes: string;
  id: string;
  valor: number;
  category: string;
  data: string;
  banco: string
};

type Props = {
  transaction: TransactionType;
};

export function TransationCard({ transaction }: Props) {

  const bank = banks.find((b) => b.id === transaction.banco);

  return (
    <View className="px-2 w-full mb-3 flex flex-row items-center">

      {/* Ícone */}
      <View className="px-2 py-2 bg-input-background border border-input-border justify-center items-center rounded-lg mr-2">
        <Ionicons name="car" color={colors["main-text"]} size={24} />
      </View>

      {/* Texto */}
      <View className="flex-shrink max-w-[45%]">
        <Text className="text-main-text text-sm" numberOfLines={1}>
          {transaction.transacao}
        </Text>

        <Text className="text-second-text text-xs" numberOfLines={1}>
          {transaction.detalhes}
        </Text>
      </View>

      {/* Banco */}
      {bank && (
        <View className="ml-2">
          <Text
            className="text-xs px-2 py-1 rounded-full text-main-text"
            style={{ backgroundColor: hexToRgba(bank.color, 0.6) }}
          >
            {bank.name}
          </Text>
        </View>
      )}

      {/* Valor */}
      <View className="ml-auto items-end">
        <Text
          className={`text-sm ${
            transaction.valor > 0
              ? "text-sucess-color"
              : "text-error-color"
          }`}
        >
          {formatCurrency(transaction.valor)}
        </Text>

        <Text className="text-second-text text-xs">
          {transaction.data}
        </Text>
      </View>

    </View>
  );
}
