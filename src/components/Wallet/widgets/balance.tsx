// Important
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";

// Functions
import { banks } from "@/src/infos/banks";
import { colors } from "@/src/theme/colors";
import { loadTransactions, saveTransactions } from "@/src/utils/data";
import { hexToRgba } from "@/src/utils/hexToRgba";
import { formatCurrency } from "@/src/utils/wallet/formatCurrency";
import { processCSV } from "@/src/utils/wallet/parses/index";
import { pickAndParseCSV } from "@/src/utils/wallet/pickCsv";

//  Contexts
import { useError } from "@/src/contexts/errorContext";

// Types
import { getSaldo } from "@/src/utils/wallet/getSaldo";
import { BankId } from "@/src/utils/wallet/parses/index";

// Code

type props = {
  setData: React.Dispatch<React.SetStateAction<any[]>>;
};

export function Balance({ setData }: props) {
  const [saldo, setSaldo] = useState(0);
  const [isVisible, setVisible] = useState(true);
  const [ModalVisible, setModalVisible] = useState(false);
  const [selectedBanks, setSelectedBanks] = useState<string[]>([]);

  const { showError } = useError();

  const [selectedBank, setSelectedBank] = useState<BankId | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  function toggleBank(id: string) {
    setSelectedBanks((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id],
    );
  }

  useEffect(() => {
    async function load() {
      const value = await getSaldo(selectedBanks);
      setSaldo(value);
    }

    load();
  }, [selectedBanks]);

  async function handleImport() {
    if (!selectedBank) {
      showError("Você deve selecionar um banco antes!");
      return;
    }

    const raw = await pickAndParseCSV(selectedBank);
    if (!raw) return;

    const parsed = processCSV(selectedBank, raw.rows);

    await saveTransactions(parsed);

    const updated = await loadTransactions();
    setData(updated);

    const novoSaldo = await getSaldo(selectedBanks);
    setSaldo(novoSaldo);

    setModalVisible(false);
  }

  return (
    <View className="w-full bg-card-background border border-strong-border rounded-2xl px-4 py-4">
      <View className="flex flex-row items-center justify-between mb-3">
        <Text className="text-main-text font-regular text-lg">Saldo Total</Text>

        <Pressable onPress={() => setVisible(!isVisible)}>
          <Feather
            name={isVisible ? "eye" : "eye-off"}
            size={16}
            color={colors["main-text"]}
          />
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

        <Pressable
          className="ml-auto flex flex-row items-center bg-input-background py-1 px-2.5 rounded-full shrink-0"
          onPress={() => setModalVisible(true)}
        >
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

            <Pressable
              className="bg-input-background p-3 rounded-lg mb-2"
              onPress={() => setDropdownOpen(!dropdownOpen)}
            >
              <Text className="text-main-text">
                {selectedBank
                  ? banks.find((b) => b.id === selectedBank)?.name
                  : "Selecione um banco"}
              </Text>
            </Pressable>

            {dropdownOpen && (
              <View className="bg-card-background border border-strong-border rounded-lg mb-3 overflow-hidden">
                {banks.map((bank) => (
                  <Pressable
                    key={bank.id}
                    onPress={() => {
                      setSelectedBank(bank.id);
                      setDropdownOpen(false);
                    }}
                    className="p-3"
                    style={{
                      backgroundColor:
                        selectedBank === bank.id
                          ? hexToRgba(bank.color, 0.3)
                          : "transparent",
                    }}
                  >
                    <Text className="text-main-text">{bank.name}</Text>
                  </Pressable>
                ))}
              </View>
            )}

            <Pressable
              className="bg-input-background p-3 rounded-lg"
              onPress={handleImport}
            >
              <Text className="text-main-text">Selecionar arquivo .CSV</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}
