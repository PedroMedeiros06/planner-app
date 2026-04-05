import { Feather } from "@expo/vector-icons";
import { Modal, Pressable, ScrollView, Text, View  } from "react-native";

import { banks } from "@/src/infos/banks";
import { colors } from "@/src/theme/colors";
import { hexToRgba } from "@/src/utils/hexToRgba";
import { useState } from "react";

import { formatCurrency } from "@/src/utils/formatCurrency";

const saldo = 45678.9;


export function Balance() {
  const [isVisible, setVisible] = useState(true);
  const [ModalVisible, setModalVisible] = useState(false);
  const [selectedBanks, setSelectedBanks] = useState<string[]>([]);

  function toggleBank(id: string) {
    setSelectedBanks((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id],
    );
  }

  return (
    <View className="w-full bg-card-background border border-strong-border rounded-2xl px-4 py-4">
      <View className="flex flex-row items-center justify-between mb-3">
        <Text className="text-main-text font-regular text-lg">Saldo Total</Text>

        <Pressable onPress={() => setVisible(!isVisible)}>
          <Feather name={isVisible ? "eye" : "eye-off"} size={16} color={colors["main-text"]} />
        </Pressable>
      </View>

      <View className="flex flex-row items-center mb-3">

      <Text
          className="text-main-text text-3xl font-semibold tracking-tight flex-shrink max-w-[65%]"
          numberOfLines={1}
        >
          {isVisible
            ? formatCurrency(saldo)
            : formatCurrency(saldo).replace(/\d/g, "*")}
        </Text>

        <Pressable className="ml-auto flex flex-row items-center bg-input-background py-1 px-2.5 rounded-full shrink-0"
        onPress={() => setModalVisible(!ModalVisible)}>
          <Feather name="upload" size={16} color={colors["main-text"]} />
          <Text className="text-main-text ml-2 font-regular">Importar</Text>
        </Pressable>

      </View>

      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        className="flex flex-row"
      >
        {banks.map((bank) => {
          const isSelected = selectedBanks.includes(bank.id);

          return (
            <Pressable
              key={bank.id}
              onPress={() => toggleBank(bank.id)}
              className="px-2.5 py-1 rounded-3xl mr-2"
              style={{
                backgroundColor: isSelected
                  ? hexToRgba(bank.color, 0.6)
                  : hexToRgba(bank.color, 0.3),
              }}
            >
              <Text className="text-main-text text-sm">{bank.name}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <Modal visible={ModalVisible} transparent>
          <View className="absolute top-0 left-0 w-full h-full z-50 justify-center items-center">
          {/* fundo escuro */}
          <Pressable
            className="absolute w-full h-full bg-black/50"
            onPress={() => setModalVisible(false)}
          />

          {/* modal */}
          <View className="w-[85%] bg-card-background rounded-2xl p-4">
            <Text className="text-main-text text-lg mb-4">
              Importar Extrato
            </Text>

            <Pressable className="bg-input-background p-3 rounded-lg mb-2">
              <Text className="text-main-text">Escolher banco</Text>
            </Pressable>

            <Pressable className="bg-input-background p-3 rounded-lg">
              <Text className="text-main-text">Selecionar arquivo CSV</Text>
            </Pressable>
          </View>
        </View>
        </Modal>
    </View>
  );
}
