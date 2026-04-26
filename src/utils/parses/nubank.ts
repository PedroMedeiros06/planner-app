import { Transaction } from "./index";

export function parseNubank(rows: string[][]): Transaction[] {
  const limpar = (texto: string) =>
    texto?.replace(/"/g, "").replace(/,$/, "").trim() || "";

  const parseAmount = (value: any) =>
    Number(String(value).replace(/\./g, "").replace(",", "."));

  return rows
    .map((row) => {
      const data = limpar(row[0]);
      const valor = parseAmount(limpar(row[1])) / 1000;

      return {
        banco: "nubank",
        data,
        transacao: "Pix/Transferência",
        detalhes: limpar(row[3]),
        valor,
        tipo: valor < 0 ? "Saída" : "Entrada",
        id: limpar(row[2]),
      };
    })
    .filter((t) => t.data.includes("/"));
}