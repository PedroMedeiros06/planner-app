import { loadTransactions, resetData, saveTransactions } from "@/src/utils/data";
import { View, Pressable, Text } from "react-native"

type props = {
  setData: React.Dispatch<React.SetStateAction<any[]>>;
};

export function FinancialReports({ setData }: props) {

    async function NullData() {
        await resetData();
        setData([])
    }

    return (
        <View className="mt-5 bg-red-600/20">
            <Text className="text-main-text font-bold text-lg mb-2">
                Relatórios Financeiros
            </Text>

            <Pressable onPress={() => NullData()}>
                <Text>Redefinir Data</Text>
            </Pressable>
        </View>
    )
}