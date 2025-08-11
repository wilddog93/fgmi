import React from 'react';
import { CircleAlert } from 'lucide-react';
import { Label } from '@/components/ui/label';
import {
  Textarea as TextareaAtomic,
  type TextareaProps as TextareaAtomicProps,
} from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

export type TextareaProps = {
  className?: string;
  label?: string;
  optional?: boolean;
  inputProps?: TextareaAtomicProps;
  textError?: string;
  textHelper?: string;
  fullwidth?: boolean;
  required?: boolean;
};

const Textarea = ({
  optional,
  label,
  inputProps,
  textError,
  textHelper,
  fullwidth = false,
  className,
  required,
}: TextareaProps) => {
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
        <TextareaAtomic {...inputProps} data-state={textError ? 'error' : ''} />
        {!!textError && (
          <CircleAlert className="size-4 absolute right-3 text-destructive" />
        )}
      </div>
      <div className="flex flex-row justify-between">
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
        {inputProps?.maxLength && (
          <p className="text-sm text-muted ml-auto">
            {inputProps.value?.toString().length || 0}/{inputProps.maxLength}
          </p>
        )}
      </div>
    </div>
  );
};

export default Textarea;
