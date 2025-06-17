import {
  array,
  object,
  string,
  uuid,
  enum_,
  number,
  transform,
  check,
  pipe,
} from "valibot";
import { TransactionCategory } from "../model/TransactionCategory";
import { TransactionType } from "../model/TransactionType";

export const TransactionSchema = array(
  object({
    id: pipe(string(), uuid()),
    title: string(),
    date: string(),
    category: enum_(TransactionCategory),
    amount: pipe(
      number(),
      transform((input) => (input < 100 ? null : input))
    ),
    currency: pipe(
      string(),
      check((value) => value === "PLN")
    ),
    type: enum_(TransactionType),
  })
);
