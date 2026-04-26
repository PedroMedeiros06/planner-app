import { BankId } from "@/src/utils/parses";

export const banks: {
  id: BankId;
  name: string;
  color: string;
}[] = [
  { id: "nubank", name: "Nubank", color: "#820AD1" },
  { id: "inter", name: "Inter", color: "#FF7A01" },
  { id: "bb", name: "Banco do Brasil", color: "#FFCC00" },
];
