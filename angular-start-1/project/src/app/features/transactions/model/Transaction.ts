import { InferOutput } from "valibot";
import { TransactionSchema } from "../contract/transaction.schema";

export type Transaction = InferOutput<typeof TransactionSchema>;
