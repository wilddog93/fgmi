"use client"

import * as React from "react"
import { Check, ChevronDown, Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button, ButtonProps } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Label } from "@/components/ui/label"

export type SelectSingleProps<TValue> = {
  id?: string;
  className?: string;
  optional?: boolean;
  value?: TValue;
  onChange?: (value: TValue) => void;
  button?: {
    placeholder?: string;
    props?: ButtonProps;
    label?: string;
    children?: React.ReactNode | React.ReactNode[];
  };
  disabled?: boolean;
  command: {
    addItem?: {
      enable?: boolean;
      description?: string;
    };
    onInputSearchChange?: (search: string) => void;
    placeholder?: string;
    textNotFound?: string;
    options: {
      label: string;
      value: string;
    }[];
    isLoading?: boolean; // Add loading state
  };
  withSearch?: boolean;
  textError?: string;
  textHelper?: string;
  required?: boolean;
}

const SelectSingle = <TValue,>({
  id,
  className,
  optional,
  value,
  onChange,
  button,
  disabled,
  command,
  withSearch = true,
  textError,
  textHelper,
  required,
}: SelectSingleProps<TValue>) => {
  const [open, setOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState(
    command.addItem?.enable ? (value as string) || '' : ''
  );
  const uuid = React.useId();
  const usedId = id || uuid;

  let shownValue = button?.placeholder || '';
  if (value && !command.addItem?.enable) {
    shownValue =
      command.options.find((option) => option.value === value)?.label || '';
  } else if (value && !!command.addItem?.enable) {
    const foundLabel = command.options.find(
      (option) => option.value === value
    )?.label;
    if (foundLabel) {
      shownValue = foundLabel;
    } else if (value) {
      shownValue = value as string;
    }
  }

  const handleOpenChange = (open: boolean) => !disabled ? setOpen(open) : null;

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild type="button">
        <div className={cn('flex flex-col gap-1.5', className)}>
          {!!button?.label && (
            <Label
              className={cn(disabled && 'text-muted')}
              htmlFor={usedId}
            >
              {button?.label}
              {required ? (
                <span className="text-destructive ml-1">*</span>
              ) : null}
              {optional ? (
                <span className="text-muted ml-1">(Optional)</span>
              ) : null}
            </Label>
          )}
          <Button
            type="button"
            id={usedId}
            role="combobox"
            aria-expanded={open}
            className={cn("relative flex flex-row justify-between  h-10 rounded-[8px] border border-input bg-background px-3 py-2 text-sm ring-offset-background text-foreground hover:bg-background hover:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:shadow-[0_0_0_4px_rgba(244,126,32,0.1)] !disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-white disabled:text-black",
              textError && 'text-destructive',
              textHelper && 'text-muted',
              optional && 'text-muted',
              button?.props?.className,
            )}
            disabled={disabled}
            variant={button?.props?.variant || 'outline'}
            {...button?.props}
          >
            {!!button && !!button.children ? (
              button.children
            ) : (
              <>
                <div className="flex-1 overflow-hidden text-left text-ellipsis break-words">
                  {shownValue}
                </div>
                <ChevronDown
                  className={cn('size-4 transform duration-300', 
                    textError ? 'text-destructive' : '',
                    open ? 'rotate-180' : ''
                  )}
                />
              </>
            )}
          </Button>
          {!textError && !!textHelper && (
            <p
              className={cn(
                'text-secondary text-sm',
                button?.props?.disabled ? 'text-muted' : ''
              )}
            >
              {textHelper}
            </p>
          )}
          {textError && <p className="text-destructive text-sm">{textError}</p>}
        </div>
      </PopoverTrigger>
      <PopoverContent 
        key={command.onInputSearchChange ? command.options.length : undefined}
        className="p-0 min-w-[var(--radix-popover-trigger-width)] z-[100]"
        onWheel={(e) => e.stopPropagation()}
      >
        <Command
          filter={
            !command.addItem?.enable
              ? undefined
              : (value, search) => {
                  if (value === 'add-item') {
                    return 1;
                  }
                  return value.includes(search) ? 1 : 0;
                }
          }
        >
          {/* <CommandInput placeholder="Search framework..." className="h-9" /> */}
          {withSearch && (
            <CommandInput
              value={searchValue}
              onValueChange={(value) => {
                setSearchValue(value);
                command.onInputSearchChange?.(value);
              }}
              placeholder={command.placeholder}
              className="h-9"
            />
          )}
          <CommandList
            className={cn(
              withSearch ? '' : 'pt-4',
              'max-h-[300px] h-full overflow-y-scroll'
            )}
          >
            {command.onInputSearchChange && command.isLoading ? (
              <div className="flex items-center justify-center py-6">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : (
              <>
                <CommandEmpty>
                  {command.textNotFound || 'Hasil pencarian kosong.'}
                </CommandEmpty>
                <CommandGroup>
                  {command.addItem?.enable ? (
                    <CommandItem
                      value="add-item"
                      onSelect={() => {
                        onChange?.(searchValue as TValue);
                        setSearchValue('');
                        setOpen(false);
                      }}
                    >
                      <div className="mr-2 h-4 w-4" />
                      {command.addItem.description || 'Add new item'}
                    </CommandItem>
                  ) : null}
                  {command.options.map((option) => (
                    <CommandItem
                      key={`${option.label}-${option.value}`}
                      data-testid={`select-single-option-${usedId}-${option.value}`}
                      value={option.label}
                      onSelect={() => {
                        onChange?.(
                          option.value === value
                            ? ('' as TValue)
                            : (option.value as TValue)
                        );
                        setSearchValue('');
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4 text-inherit',
                          value === option.value ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                      {option.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default SelectSingle;
