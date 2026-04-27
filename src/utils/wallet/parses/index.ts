import { parseBancoDoBrasil } from "./bancoBrasil";
import { parseInter } from "./inter";
import { parseNubank } from "./nubank";

export type Transaction = {
  banco: string;
  data: string;
  transacao: string;
  detalhes: string;
  valor: number;
  tipo: string;
  id: string;
};

export const parsers = {
  nubank: parseNubank,
  inter: parseInter,
  bb: parseBancoDoBrasil,
};

export type BankId = keyof typeof parsers;

export function processCSV(bank: BankId, rows: string[][]) {
  const parser = parsers[bank];

  if (!parser) {
    throw new Error(`Banco não suportado: ${bank}`);
  }

  return parser(rows);
}
