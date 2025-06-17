export type Transaction = {
  id: string;
  title: string;
  date: Date;
  category: "Transfer" | "Transport" | "Media" | "Bills" | "Subscriptions";
  amount: number;
  currency: "PLN";
  type: "Income" | "Expense";
};
