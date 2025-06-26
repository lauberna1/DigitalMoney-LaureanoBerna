import { Transaction } from "@/types/globalTypes";

export const handleFilterByDate = (
  period: string,
  transactions: Transaction[] | null,
  setFilteredTransactions: React.Dispatch<
    React.SetStateAction<Transaction[] | null>
  >
) => {
  if (!transactions) return;

  const now = new Date();
  const filtered = transactions.filter(({ dated }) => {
    const date = new Date(dated);
    switch (period) {
      case "today":
        return date.toDateString() === now.toDateString();
      case "yesterday": {
        const yesterday = new Date();
        yesterday.setDate(now.getDate() - 1);
        return date.toDateString() === yesterday.toDateString();
      }
      case "lastWeek": {
        const lastWeek = new Date();
        lastWeek.setDate(now.getDate() - 7);
        return date >= lastWeek;
      }
      case "last15Days": {
        const last15Days = new Date();
        last15Days.setDate(now.getDate() - 15);
        return date >= last15Days;
      }
      case "lastMonth": {
        const lastMonth = new Date();
        lastMonth.setMonth(now.getMonth() - 1);
        return date >= lastMonth;
      }
      case "last3Months": {
        const last3Months = new Date();
        last3Months.setMonth(now.getMonth() - 3);
        return date >= last3Months;
      }
      default:
        return true;
    }
  });

  setFilteredTransactions(filtered);
};
