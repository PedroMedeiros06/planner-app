import { colors } from "@/src/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { FlatList, Pressable, Text, View } from "react-native";
import { TransationCard } from "../TransationCard";

const filters = [
  {
    id: "Banks",
    Placeholder: "Todos os bancos",
  },
  {
    id: "Date",
    Placeholder: "Hoje",
  },
  {
    id: "Category",
    Placeholder: "Categorias",
  },
];

export function Transations() {
  const data = [
    {
      id: "1-INTER",
      name: "Nome da Transação",
      description: "Descrição da transação",
      value: 12.9,
      category: "Alimento",
      data: "04/04/2026",
      bank: "inter",
    },
    {
      id: "2-NU",
      name: "Nome da Transação",
      description: "Descrição da transação",
      value: -12.9,
      category: "Alimento",
      data: "03/04/2026",
      bank: "nubank",
    },
        {
      id: "2-NU",
      name: "Nome da Transação",
      description: "Descrição da transação",
      value: -12.9,
      category: "Alimento",
      data: "03/04/2026",
      bank: "nubank",
    },
        {
      id: "2-NU",
      name: "Nome da Transação",
      description: "Descrição da transação",
      value: -12.9,
      category: "Alimento",
      data: "03/04/2026",
      bank: "nubank",
    },

        {
      id: "2-NU",
      name: "Nome da Transação",
      description: "Descrição da transação",
      value: -12.9,
      category: "Alimento",
      data: "03/04/2026",
      bank: "nubank",
    },
        {
      id: "2-NU",
      name: "Nome da Transação",
      description: "Descrição da transação",
      value: -12.9,
      category: "Alimento",
      data: "03/04/2026",
      bank: "nubank",
    },

        {
      id: "2-NU",
      name: "Nome da Transação",
      description: "Descrição da transação",
      value: -12.9,
      category: "Alimento",
      data: "03/04/2026",
      bank: "nubank",
    },
        {
      id: "2-NU",
      name: "Nome da Transação",
      description: "Descrição da transação",
      value: -12.9,
      category: "Alimento",
      data: "03/04/2026",
      bank: "nubank",
    },
  ];

  return (
    <View className="mt-5">
      <Text className="font-bold text-main-text text-lg w-full mb-2">
        Últimas Transações
      </Text>
      <View className="flex flex-row w-full mb-3">
        {filters.map((Filter) => {
          return (
            <Pressable
              className="bg-card-background py-1.5 px-2.5 rounded-lg flex flex-row items-center mr-3.5"
              key={Filter.id}
            >
              <Text className="text-main-text font-bold text-xs mr-1">
                {Filter.Placeholder}
              </Text>
              <Ionicons
                name="chevron-down-outline"
                color={colors["main-text"]}
                size={8}
              ></Ionicons>
            </Pressable>
          );
        })}
        <Pressable className="bg-card-background py-1.5 px-2.5 rounded-lg flex flex-row items-center">
          <Ionicons
            name="search"
            color={colors["main-text"]}
            size={10}
          ></Ionicons>
        </Pressable>
      </View>
      
      <View className="bg-card-background border border-b border-strong-border rounded-xl pt-3 max-h-80 overflow-hidden">
        <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TransationCard transaction={item} />}
        ></FlatList>
        <Pressable className="mx-6 mb-1.5 py-1 bg-input-background rounded-full border border-input-border flex items-center justify-center">
          <Text className="text-main-text font-regular">Adicionar transação</Text>
        </Pressable>
      </View>
    </View>
  );
}
