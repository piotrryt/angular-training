export type TransactionCategory =
  | "Transfer"
  | "Transport"
  | "Media"
  | "Subscriptions"
  | "Bills";

export type TransactionType = "Income" | "Expense";

export interface Transaction {
  id: string; // UUID
  title: string;
  date: string; // ISO-8601
  category: TransactionCategory;
  amount: number; // w groszach
  currency: "PLN";
  type: TransactionType;
}
