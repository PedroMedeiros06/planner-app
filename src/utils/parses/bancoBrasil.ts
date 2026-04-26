import { Transaction } from "./index";

export function parseBancoDoBrasil(rows: string[][]): Transaction[] {

  const limpar = (texto: string) =>
    texto?.replace(/"/g, "").replace(/,$/, "").trim() || "";

  const parseAmount = (value: any) => {
    if (!value) return 0;
    const num = Number(String(value).replace(/\./g, "").replace(",", "."));
    return isNaN(num) ? 0 : num;
  };

  const limparTransacao = (texto: string) =>
    texto?.replace(/\d/g, "").replace(/[/:]/g, "");

  return rows
    .map((row) => {
      const data = limpar(row[0]);

      return {
        banco: "bb",
        data,
        detalhes: limpar(row[1]),
        transacao: limparTransacao(limpar(row[2])),
        valor: parseAmount(limpar(row[4])),
        tipo: limpar(row[5]),
        id: `${data}-${limpar(row[2])}-${row[4]}`
      };
    })
    .filter(
      (t) =>
        t.data.includes("/") &&
        !t.detalhes.toLowerCase().includes("saldo") &&
        !t.detalhes.toLowerCase().includes("s a l d o"),
    );
}
