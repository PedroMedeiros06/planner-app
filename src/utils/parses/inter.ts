import { Transaction } from "./index";

export function parseInter(rows: string[][]): Transaction[] {
  const limpar = (texto: string) =>
    texto?.replace(/"/g, "").replace(/,$/, "").trim() || "";

  const parseAmount = (value: any) =>
    Number(String(value).replace(/\./g, "").replace(",", "."));

  return rows
    .map((row) => {
      const data = limpar(row[0]);
      const valor = parseAmount(limpar(row[3]));

      return {
        banco: "inter",
        data,
        transacao: limpar(row[2]),
        detalhes: limpar(row[1]),
        valor,
        tipo: valor < 0 ? "Saída" : "Entrada",
        id: "110",
      };
    })
    .filter((t) => t.data.includes("/"));
}