export function formatCurrency(amount: number | undefined): string {
  if (!amount) return "0.00";
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
  }).format(amount);
}
