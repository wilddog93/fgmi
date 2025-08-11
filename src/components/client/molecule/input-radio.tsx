import { cn } from '@/lib/utils';
import { RadioGroupProps } from '@radix-ui/react-radio-group';
import React from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import TextField, { TextFieldProps } from './textfield';

export type InputRadioProps = RadioGroupProps & {
  optional?: boolean;
  label?: string;
  options: {
    label: string;
    value: string;
    isFreeTextValue?: boolean;
  }[];
  optionOtherValue?: string;
  onChangeOptionOtherValue?: (value: string) => void;
  textHelper?: string;
  textError?: string;
  radioGroupClassName?: string;
  radioItemProps?: React.ComponentProps<typeof RadioGroupItem>;
  textFieldOtherProps?: TextFieldProps;
  required?: boolean;
};

const InputRadio = ({
  id,
  options,
  optional,
  label,
  textError,
  textHelper,
  radioItemProps,
  optionOtherValue,
  textFieldOtherProps,
  required,
  onChangeOptionOtherValue,
  ...otherProps
}: InputRadioProps) => {
  return (
    <div
      className={cn('grid w-full items-center gap-1.5', otherProps.className)}
    >
      {!!label && (
        <Label
          className={cn(otherProps?.disabled ? 'text-muted' : '')}
          htmlFor={id}
        >
          {label}
          {required ? <span className="text-destructive ml-1">*</span> : null}
          {optional ? (
            <span className="text-muted ml-1">(Optional)</span>
          ) : null}
        </Label>
      )}
      <RadioGroup
        {...otherProps}
        className={cn('flex flex-col gap-2', otherProps.radioGroupClassName)}
      >
        {options.map((option) => {
          return (
            <React.Fragment key={option.value}>
              <RadioGroupItem
                key={option.value}
                value={option.value}
                id={option.value}
                {...radioItemProps}
              />
              <Label className={cn("text-sm hover:cursor-pointer disabled:text-mute")} htmlFor={option.value}>{option.label}</Label>
              {option.isFreeTextValue && option.value === otherProps.value && (
                <TextField
                  fullwidth
                  inputProps={{
                    value: optionOtherValue || '',
                    onChange: (e) => {
                      if (onChangeOptionOtherValue) {
                        const newValue = e.target.value;
                        onChangeOptionOtherValue(newValue);
                      }
                    },
                    placeholder: 'Tulis lainnya',
                  }}
                  {...textFieldOtherProps}
                />
              )}
            </React.Fragment>
          );
        })}
      </RadioGroup>
      {!textError && !!textHelper && (
        <p
          className={cn(
            'text-secondary text-sm',
            otherProps.disabled ? 'text-muted' : ''
          )}
        >
          {textHelper}
        </p>
      )}
      {textError && <p className="text-destructive text-sm">{textError}</p>}
    </div>
  );
};

export default InputRadio;
