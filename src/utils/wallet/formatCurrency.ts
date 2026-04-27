export function formatCurrency(value: number) {
  if (!value) value = 0
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}