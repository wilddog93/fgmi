import React from 'react';
import {
  type FieldValues,
  type RegisterOptions,
  useFormContext,
} from 'react-hook-form';
import { Checkbox, type CheckboxProps } from '../checkbox';
import { getValidation } from '@/lib/utils/validation';
import { Validation } from '@/lib/types/validation';

export type SmartCheckboxProps = CheckboxProps & {
  name: string;
  validation?: Validation;
  fieldOption?: RegisterOptions<FieldValues>;
};

const SmartCheckbox = ({
  name,
  fieldOption,
  validation,
  ...otherProps
}: SmartCheckboxProps) => {
  const methods = useFormContext();
  const validationOptions = getValidation({
    methods,
    validation,
    label: typeof otherProps?.label === 'string' ? otherProps?.label : '',
  });

  return (
    <Checkbox
      {...otherProps}
      required={!!validationOptions.required}
      checkboxProps={{
        ...otherProps.checkboxProps,
        ...methods?.register(name, {
          ...fieldOption,
          ...validationOptions,
        }),
        checked: methods?.watch(name),
        onCheckedChange: (checked: boolean) => {
          if (methods) {
            methods?.setValue(name, checked);
          }
        },
      }}
      textError={
        otherProps.textError ||
        methods?.formState.errors[name]?.message?.toString() ||
        ''
      }
    />
  );
};

export default SmartCheckbox;
