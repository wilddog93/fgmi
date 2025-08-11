import type { Validate, FieldValues, UseFormReturn } from "react-hook-form";
import { emailRegex, nikRegex, phoneRegex } from "../utils";
import {
  Validation,
  ValidationInput,
  ValidationOptions,
} from "../types/validation";

export const getValidation = ({
  validation,
  label,
  methods,
}: {
  validation?: Validation;
  label?: string;
  methods?: UseFormReturn;
}) => {
  const validationOptions: ValidationOptions = {};
  const usedValidation =
    typeof validation === "function" && !!methods
      ? validation(methods.getValues())
      : (validation as ValidationInput);
  if (usedValidation) {
    Object.keys(usedValidation).forEach((item) => {
      const itemKey = item as keyof ValidationInput;
      const valueItemKey = usedValidation[itemKey];
      if (itemKey === "required") {
        validationOptions[itemKey] = {
          value: !!valueItemKey,
          message: `${label || "Bagian ini"} harus diisi`,
        };
      } else {
        let usedValue: Validate<unknown, FieldValues> | null = null;
        switch (itemKey) {
          case "max":
            usedValue = (value) => {
              const maxNum = usedValidation[itemKey] as number;
              if (typeof value === "number" && value > maxNum) {
                return `Maksimum angka ${maxNum}`;
              }
              return true;
            };
            break;
          case "min":
            usedValue = (value) => {
              const minNum = usedValidation[itemKey] as number;
              if (typeof value === "number" && value < minNum) {
                return `Minimum angka ${minNum}`;
              }
              return true;
            };
            break;
          case "maxLength":
            usedValue = (value) => {
              const maxLength = usedValidation[itemKey] as number;
              if (
                (typeof value === "string" || Array.isArray(value)) &&
                value.length > maxLength
              ) {
                return `Maksimum panjang teks ${maxLength}`;
              }
              return true;
            };
            break;
          case "minLength":
            usedValue = (value) => {
              const minLength = usedValidation[itemKey] as number;
              if (
                !!value &&
                (typeof value === "string" || Array.isArray(value)) &&
                value.length < minLength
              ) {
                return `Maksimum panjang teks ${minLength}`;
              }
              return true;
            };
            break;
          case "email":
            usedValue = (value) => {
              if (
                !!value &&
                typeof value === "string" &&
                !emailRegex.test(value)
              ) {
                return `Masukkan email yang benar`;
              }
              return true;
            };
            break;
          case "phone":
            usedValue = (value) => {
              if (
                !!value &&
                typeof value === "string" &&
                !phoneRegex.test(value)
              ) {
                return `Masukkan nomor telepon yang benar`;
              }
              return true;
            };
            break;
          case "nik":
            usedValue = (value: unknown) => {
              const strValue = value as string;
              console.log("=============nik usedValue", strValue);
              if (!!strValue && !nikRegex.test(strValue)) {
                return `Masukkan NIK yang benar`;
              }
              return true;
            };
            break;
          default:
            break;
        }
        if (!valueItemKey) {
          usedValue = () => true;
        }
        if (usedValue) {
          validationOptions.validate = {
            ...validationOptions.validate,
            [itemKey]: usedValue,
          };
        }
      }
    });
  }
  return validationOptions;
};
