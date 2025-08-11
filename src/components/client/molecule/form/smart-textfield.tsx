import React from 'react';
import {
  type FieldValues,
  type RegisterOptions,
  useFormContext,
} from 'react-hook-form';
import TextField, { type TextFieldProps } from '../textfield';
import { getValidation } from '@/lib/utils/validation';
import { Validation } from '@/lib/types/validation';

export type SmartTextFieldProps = TextFieldProps & {
  name: string;
  validation?: Validation;
  fieldOption?: RegisterOptions<FieldValues>;
};

const SmartTextField = ({
  name,
  fieldOption,
  validation,
  ...otherProps
}: SmartTextFieldProps) => {
  const methods = useFormContext();
  const validationOptions = getValidation({
    methods,
    validation,
    label: otherProps.label,
  });
  return (
    <TextField
      {...otherProps}
      required={!!validationOptions.required}
      inputProps={{
        ...otherProps.inputProps,
        ...methods?.register(name, {
          ...fieldOption,
          ...validationOptions,
        }),
        value: methods?.watch(name),
      }}
      textError={
        otherProps.textError ||
        methods?.formState.errors[name]?.message?.toString() ||
        ''
      }
    />
  );
};

export default SmartTextField;
