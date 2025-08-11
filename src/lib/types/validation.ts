import type { FieldValues, RegisterOptions } from "react-hook-form";

export type ValidationInput = {
  required?: boolean;
  min?: number;
  max?: number;
  maxLength?: number;
  minLength?: number;
  phone?: boolean;
  email?: boolean;
  nik?: boolean;
};
export type Validation =
  | ValidationInput
  | ((input: FieldValues) => ValidationInput);
export type ValidationOptions = Pick<
  RegisterOptions<FieldValues>,
  "required" | "max" | "maxLength" | "min" | "minLength" | "validate"
>;
