import { HttpResponse } from "@angular/common/http";
import { OperatorFunction, map } from "rxjs";
import { BaseSchema, InferOutput, safeParse } from "valibot";

export function validate<T>(
  schema: BaseSchema<T, T, any>
): OperatorFunction<HttpResponse<unknown>, InferOutput<BaseSchema<T, T, any>>> {
  return map((res: HttpResponse<unknown>) => {
    const result = safeParse(schema, res.body);

    if (result.success) {
      return result.output;
    } else {
      result.issues.forEach((issue) => {
        console.error(res.url, issue.message);
      });
      return result.output as InferOutput<BaseSchema<T, T, any>>;
    }
  });
}
