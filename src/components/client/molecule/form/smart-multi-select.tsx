import React from 'react';
import {
  useFormContext,
  type FieldValues,
  type RegisterOptions,
} from 'react-hook-form';
import { Validation } from '@/lib/types/validation';
import { getValidation } from '@/lib/utils/validation';
import MultipleSelector, {
  type MultipleSelectorProps,
} from '../multi-select';

export type SmartMultiSelectProps = Omit<MultipleSelectorProps, 'onChange'> & {
  name: string;
  validation?: Validation;
  fieldOption?: RegisterOptions<FieldValues>;
};

const SmartMultiSelect = ({
  name,
  fieldOption,
  validation,
  ...otherProps
}: SmartMultiSelectProps) => {
  const methods = useFormContext();
  const validationOptions = getValidation({
    methods,
    validation,
    label: otherProps.label,
  });
  const form = methods?.register(name, {
    ...fieldOption,
    ...validationOptions,
  });
  return (
    <MultipleSelector
      {...form}
      required={!!validationOptions.required}
      value={methods?.watch(name)}
      onChange={(value) => {
        if (methods) {
          methods?.setValue(name, value);
        }
      }}
      {...otherProps}
      textError={
        otherProps.textError ||
        methods?.formState.errors[name]?.message?.toString() ||
        ''
      }
    />
  );
};

export default SmartMultiSelect;
