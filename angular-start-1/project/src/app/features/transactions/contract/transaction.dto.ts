import { InferInput } from "valibot";
import { TransactionSchema } from "./transaction.schema";

export type TransactionDTO = InferInput<typeof TransactionSchema>;
