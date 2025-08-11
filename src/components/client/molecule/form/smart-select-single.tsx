import React from 'react';
import {
  type FieldValues,
  type RegisterOptions,
  Controller,
  useFormContext,
} from 'react-hook-form';
import SelectSingle, { SelectSingleProps } from '../select-single';
import { Validation } from '@/lib/types/validation';
import { getValidation } from '@/lib/utils/validation';

export type SmartSelectSingleProps<TValue> = Omit<
  SelectSingleProps<TValue>,
  'onChange' | 'value'
> & {
  name: string;
  validation?: Validation;
  fieldOption?: RegisterOptions<FieldValues>;
};

const SmartSelectSingle = <TValue,>({
  name,
  fieldOption,
  validation,
  ...otherProps
}: SmartSelectSingleProps<TValue>) => {
  const methods = useFormContext();
  const validationOptions = getValidation({
    methods,
    validation,
    label: otherProps.button?.label,
  });
  const form = methods?.register(name, {
    ...fieldOption,
    ...validationOptions,
  });
  return (
    <Controller
      name={name}
      control={methods?.control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <SelectSingle
          {...form}
          required={!!validationOptions.required}
          id={name}
          value={value}
          onChange={(value) => {
            if (methods) {
              methods?.setValue(name, value);
            }
            onChange(value);
          }}
          textError={otherProps.textError || error?.message?.toString() || ''}
          {...otherProps}
        />
      )}
      rules={validationOptions}
      defaultValue={methods?.getValues(name) || ''}
    />
  );
};

export default SmartSelectSingle;
