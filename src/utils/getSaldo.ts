import { loadTransactions } from "./data";

import { TransactionType } from "../components/Wallet/TransationCard";

export async function getSaldo(selectedBanks?: string[]) {
  const transactions = (await loadTransactions()) || [];

  return transactions
    .filter((t: TransactionType) =>
      selectedBanks?.length
        ? selectedBanks.includes(t.banco)
        : true
    )
    .reduce((acc: number, t: TransactionType) => {
      const value = Number(t.valor);

      if (isNaN(value)) {
        console.warn("Valor inválido:", t.valor);
        return acc;
      }

      return acc + value;
    }, 0);
}