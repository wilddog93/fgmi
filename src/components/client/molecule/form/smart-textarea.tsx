import React from 'react';
import {
  useFormContext,
  type FieldValues,
  type RegisterOptions,
} from 'react-hook-form';
import Textarea, { type TextareaProps } from '@/components/client/molecule/textarea';
import { getValidation } from '@/lib/utils/validation';
import { Validation } from '@/lib/types/validation';

export type SmartTextareaProps = TextareaProps & {
  name: string;
  validation?: Validation;
  fieldOption?: RegisterOptions<FieldValues>;
};

const SmartTextarea = ({
  name,
  fieldOption,
  validation,
  ...otherProps
}: SmartTextareaProps) => {
  const methods = useFormContext();
  const validationOptions = getValidation({
    methods,
    validation,
    label: otherProps.label,
  });
  return (
    <Textarea
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

export default SmartTextarea;
