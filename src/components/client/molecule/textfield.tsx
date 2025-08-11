import React from 'react';
import { CircleAlert, XCircle } from 'lucide-react';
import { Label } from '../../ui/label';
import { Input, InputProps } from '../../ui/input';
import { cn } from '@/lib/utils';

export type TextFieldProps = {
  className?: string;
  label?: string;
  optional?: boolean;
  inputProps?: InputProps;
  withClearButton?: boolean;
  textError?: string;
  textHelper?: string;
  prefix?: string;
  suffix?: React.ReactNode;
  prefixIcon?: React.ReactNode;
  fullwidth?: boolean;
  required?: boolean;
};

const TextField = ({
  className,
  label,
  optional,
  inputProps,
  withClearButton,
  textError,
  textHelper,
  prefix,
  suffix,
  prefixIcon,
  fullwidth = false,
  required,
}: TextFieldProps) => {
  const handleClear = () => {
    if (inputProps?.value) {
      inputProps?.onChange?.({
        target: { value: '' }
      } as React.ChangeEvent<HTMLInputElement>);
    }
  };
  const showSuffixCustom = !!suffix && typeof suffix !== 'string';
  const showCircleAlert = !!textError && !withClearButton;
  const showClearButton = !!withClearButton && !!inputProps?.value;
  const suffixPosition =
    showClearButton && showCircleAlert
      ? 'right-9'
      : showClearButton || showCircleAlert
      ? 'right-6'
      : 'right-3';
  const circleAlertPosition = showClearButton ? 'right-6' : 'right-3';
  return (
    <div
      className={cn(
        'grid w-full items-center gap-1.5',
        fullwidth ? '' : 'max-w-sm',
        className
      )}
    >
      {!!label && (
        <Label
          className={cn(inputProps?.disabled ? 'text-muted' : '')}
          htmlFor={inputProps?.id}
        >
          {label}
          {required ? <span className="text-destructive ml-1">*</span> : null}
          {optional ? (
            <span className="text-muted ml-1">(Optional)</span>
          ) : null}
        </Label>
      )}
      <div className="relative w-full flex items-center">
        {prefixIcon && <div className="absolute left-4">{prefixIcon}</div>}
        {!!prefix && (
          <Input
            defaultValue={prefix}
            disabled
            className="w-[55px] mr-3 !cursor-default !opacity-100 bg-[#F8FAFC]"
          />
        )}
        <Input
          {...inputProps}
          data-testid={`input-textfield-${
            inputProps?.id || inputProps?.name || ''
          }`}
          className={cn(inputProps?.className || '', prefixIcon ? 'pl-10' : '')}
          data-state={textError ? 'error' : ''}
        />
        {!!suffix && typeof suffix === 'string' && (
          <Input
            defaultValue={suffix}
            disabled
            className="w-[55px] ml-3 !cursor-default !opacity-100 bg-[#F8FAFC]"
          />
        )}
        {showSuffixCustom && (
          <div className={cn(suffixPosition, 'absolute')}>{suffix}</div>
        )}
        {showCircleAlert && (
          <CircleAlert
            className={cn(
              'size-4 absolute',
              circleAlertPosition,
              'text-destructive'
            )}
          />
        )}
        {showClearButton && (
          <XCircle
            className={cn('size-4 absolute right-3 hover:cursor-pointer')}
            onClick={handleClear}
          />
        )}
      </div>
      {!textError && !!textHelper && (
        <p
          className={cn(
            'text-secondary text-sm',
            inputProps?.disabled ? 'text-muted' : ''
          )}
        >
          {textHelper}
        </p>
      )}
      {textError && <p className="text-destructive text-sm">{textError}</p>}
    </div>
  );
};

export default TextField;
