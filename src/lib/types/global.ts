import { AxiosResponse, AxiosInstance } from "axios";
import { ButtonProps } from "@/components/ui/button";

export type FunctionDataAccess<TDataInput = void, TDataOutput = void> = (
  props: TDataInput extends void
    ? { axios: AxiosInstance }
    : { axios: AxiosInstance; data?: TDataInput }
) => Promise<AxiosResponse<TDataOutput>>;

export type Option = {
  label: string;
  value: string;
};

export type SelectSingleProps<TValue> = {
  id?: string;
  className?: string;
  optional?: boolean;
  value?: TValue;
  onChange?: (value: TValue) => void;
  button?: {
    placeholder?: string;
    props?: ButtonProps;
    label?: string;
    children?: React.ReactNode | React.ReactNode[];
  };
  disabled?: boolean;
  command: {
    addItem?: {
      enable?: boolean;
      description?: string;
    };
    onInputSearchChange?: (search: string) => void;
    placeholder?: string;
    textNotFound?: string;
    options: {
      label: string;
      value: string;
    }[];
    isLoading?: boolean; // Add loading state
  };
  withSearch?: boolean;
  textError?: string;
  textHelper?: string;
  required?: boolean;
};

export type MonthFormat = "long" | "short";
