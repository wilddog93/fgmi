'use client';

import { cn } from '@/lib/utils';
import {
  Checkbox as CheckboxUI,
  CheckboxProps as AtomicCheckboxProps,
} from '@/components/ui/checkbox';

export type CheckboxProps = {
  id: string;
  label?: React.ReactNode;
  description?: string;
  checkboxProps?: AtomicCheckboxProps;
  textError?: string;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  required?: boolean;
};
export function Checkbox({
  id,
  label,
  labelProps,
  description,
  checkboxProps,
  textError,
  required,
}: CheckboxProps) {
  return (
    <div className="items-top flex gap-2 items-center">
      <CheckboxUI id={id} {...checkboxProps} />
      <div className="grid gap-1.5 leading-none">
        {!!label && (
          <label
            {...labelProps}
            htmlFor={id}
            className={cn(
              'text-sm font-medium leading-none hover:cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
              labelProps?.className
            )}
          >
            {label}
            {required ? <span className="text-destructive ml-1">*</span> : null}
          </label>
        )}
        {!!description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
        {!!textError && <p className="text-sm text-destructive">{textError}</p>}
      </div>
    </div>
  );
}
