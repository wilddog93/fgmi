import React, { useEffect, useState } from 'react';
import { CircleAlert, XCircle } from 'lucide-react';
import { Label } from '../../ui/label';
import { Input, InputProps } from '../../ui/input';
import { cn } from '@/lib/utils';
import InputMasked from '../../ui/input-masked';

export type TextFieldProps = {
  className?: string;
  label?: string;
  optional?: boolean;
  inputProps?: InputProps;
  withClearButton?: boolean;
  textError?: string;
  textHelper?: string;
  prefix?: string;
  prefixIcon?: React.ReactNode;
  fullwidth?: boolean;
  required?: boolean;
  /**
   * Use 9 for digit, and A for alphabet. Ex: (999) 999999 = (021) 4512311, or AA-AA = XY-BC
   */
  mask: string;
};

const isValidDate = (dateStr: string, mask: string) => {
  if (mask === '99/9999') {
    const [month, year] = dateStr.split('/').map(Number);
    if (!month || !year) return false;
    return month >= 1 && month <= 12 && year > 0;
  }

  if (mask === '99/99/9999') {
    const [day, month, year] = dateStr.split('/').map(Number);
    if (!day || !month || !year) return false;
    const date = new Date(year, month - 1, day);
    return (
      date.getDate() === day &&
      date.getMonth() === month - 1 &&
      date.getFullYear() === year
    );
  }

  if (mask === '99/99/9999 99:99:99') {
    const [datePart, timePart] = dateStr.split(' ');
    if (!datePart || !timePart) return false;

    const [day, month, year] = datePart.split('/').map(Number);
    const [hours, minutes, seconds] = timePart.split(':').map(Number);

    if (
      !day ||
      !month ||
      !year ||
      hours === undefined ||
      minutes === undefined ||
      seconds === undefined
    )
      return false;

    const date = new Date(year, month - 1, day, hours, minutes, seconds);
    return (
      date.getDate() === day &&
      date.getMonth() === month - 1 &&
      date.getFullYear() === year &&
      date.getHours() === hours &&
      date.getMinutes() === minutes &&
      date.getSeconds() === seconds
    );
  }

  return true;
};

/**
 * Currently purposed for datetime
 */
const TextFieldMasked = ({
  className,
  label,
  optional,
  inputProps,
  withClearButton,
  textError,
  textHelper,
  prefix,
  prefixIcon,
  fullwidth = false,
  mask,
  required,
}: TextFieldProps) => {
  const [error, setError] = useState<string | undefined>(textError);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (
      mask === '99/9999' ||
      mask === '99/99/9999' ||
      mask === '99/99/9999 99:99:99'
    ) {
      const isValid = isValidDate(value, mask);
      const isValidMessage = isValid
        ? undefined
        : 'Invalid date or datetime format';
      if (!value) {
        setError(textError || isValidMessage);
      } else {
        setError(isValidMessage);
      }
      inputProps?.onChange?.(event);
    } else {
      setError(undefined);
    }
  };

  const handleClear = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    if (inputProps?.value) {
      const modifiedEvent = {
        ...e,
        target: {
          ...e.target,
          value: '',
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      inputProps?.onChange?.(modifiedEvent);
      setError(undefined);
    }
  };

  useEffect(() => {
    setError(textError);
  }, [textError]);

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
      <div className="relative flex items-center">
        {prefixIcon && <div className="absolute left-4">{prefixIcon}</div>}
        {!!prefix && (
          <Input
            defaultValue={prefix}
            disabled
            className="w-[55px] mr-3 !cursor-default !opacity-100 bg-[#F8FAFC]"
          />
        )}
        <InputMasked
          {...inputProps}
          data-testid={`input-textfield-masked-${
            inputProps?.id || inputProps?.name || ''
          }`}
          mask={mask}
          className={cn(inputProps?.className || '', prefixIcon ? 'pl-10' : '')}
          data-state={error ? 'error' : ''}
          onChange={handleInputChange}
        />
        {!!error && !withClearButton && (
          <CircleAlert className="size-4 absolute right-3 text-destructive" />
        )}
        {withClearButton && !!inputProps?.value && (
          <XCircle
            className="size-4 absolute right-3 hover:cursor-pointer"
            onClick={handleClear}
          />
        )}
      </div>
      {!error && !!textHelper && (
        <p
          className={cn(
            'text-secondary text-sm',
            inputProps?.disabled ? 'text-muted' : ''
          )}
        >
          {textHelper}
        </p>
      )}
      {error && <p className="text-destructive text-sm">{error}</p>}
    </div>
  );
};

export default TextFieldMasked;
