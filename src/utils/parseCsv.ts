function parseAmount(value: any) {
  if (!value) return 0;

  return Number(
    String(value)
      .replace(/\./g, "")
      .replace(",", ".")
  );
}

export function parseBancoBrasil(data: any[]) {
  return data
    .filter((item) => item["Tipo Lançamento"]) // remove saldo
    .map((item) => {
      const isEntrada = item["Tipo Lançamento"] === "Entrada";

      const value = parseAmount(item["Valor"]);

      return {
        amount: isEntrada ? value : -value,
        description: item["Lançamento"],
        date: item["Data"],
      };
    });
}

export function normalizeCSV(data: any[]) {
  return data.map((item) => ({
    amount: parseAmount(
      item.valor || item.Valor || item.amount
    ),

    description:
      item.descricao ||
      item.Descrição ||
      item.description ||
      "Transação",

    date:
      item.data ||
      item.Data ||
      item.date ||
      "",
  }));
}