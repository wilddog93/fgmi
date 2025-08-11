import React, { useRef } from 'react';

import { Button, type ButtonProps } from '@/components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { DialogProps } from '@radix-ui/react-dialog';
import { cn } from '@/lib/utils';
import SmartForm, {
  SmartFormBaseProps,
  SmartFormTypeProps,
} from './smart-form';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { FieldValues } from 'react-hook-form';

type SmartDialogFormSmartFormProps<TFieldValues extends FieldValues> =
  SmartFormBaseProps<TFieldValues> & SmartFormTypeProps<TFieldValues>;

export type SmartDialogFormProps<TFieldValues extends FieldValues> = {
  id?: string;
  loading?: boolean;
  children: React.ReactNode | React.ReactNode[];
  trigger?: React.ReactNode;
  triggerAsDropdown?: boolean;
  dialog: {
    open: boolean;
    onOpenChange: DialogProps['onOpenChange'];
    smartFormProps: SmartDialogFormSmartFormProps<TFieldValues>;
    containerClassname?: HTMLDivElement['className'];
    footerClassName?: HTMLDivElement['className'];
    title: string;
    description?: string;
    actions: ButtonProps[];
    onCancel?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  };
};

const SmartDialogForm = <TFieldValues extends FieldValues>({
  id,
  loading,
  children,
  trigger,
  triggerAsDropdown,
  dialog,
}: SmartDialogFormProps<TFieldValues>) => {
  const ref = useRef<HTMLButtonElement>(null);
  return (
    <Dialog open={dialog.open} onOpenChange={dialog.onOpenChange}>
      {trigger ? (
        triggerAsDropdown ? (
          <DropdownMenuItem
            onClick={(e) => {
              e.preventDefault();
              ref?.current?.click();
            }}
          >
            <div>
              <DialogTrigger ref={ref}>
                <div>{trigger}</div>
              </DialogTrigger>
            </div>
          </DropdownMenuItem>
        ) : (
          <DialogTrigger asChild>{trigger}</DialogTrigger>
        )
      ) : null}
      <DialogContent
        id={id}
        data-testid={`smart-dialog-form-${id}`}
        className={cn(
          'overflow-hidden pt-6',
          dialog.containerClassname
            ? dialog.containerClassname
            : 'md:max-w-screen-lg max-h-screen'
        )}
      >
        <DialogHeader className="px-6 pt-0">
          <DialogTitle>{dialog.title}</DialogTitle>
          {dialog.description && (
            <DialogDescription>{dialog.description}</DialogDescription>
          )}
        </DialogHeader>
        <SmartForm
          {...dialog.smartFormProps}
          id={id ? `smart-form-${id}` : 'smart-form'}
          className={cn(
            'md:max-h-[80vh] max-h-[90vh] overflow-y-scroll px-7 pt-8 md:pb-24 pb-40 grid grid-cols-4 gap-y-6 gap-x-4',
            dialog.smartFormProps.className || ''
          )}
        >
          {children}
        </SmartForm>
        {dialog.actions && (
          <div
            className={cn(
              'bg-white shadow-2xl w-full flex md:flex-row flex-col p-5 gap-4 fixed bottom-0 left-0',
              dialog.footerClassName
            )}
          >
            {dialog.actions.map((action, index) => {
              const onClick = action.onClick
                ? action.onClick
                : action.id === 'cancel' && dialog.onCancel
                ? dialog.onCancel
                : undefined;
              const buttonLoading = action.isLoading || loading;
              return (
                <Button
                  key={action.id || `${dialog.title}-actions-${index}`}
                  data-testid={`smart-dialog-form-action-${id}-${action.id}`}
                  className={cn('px-6 md:flex-1', action.className)}
                  onClick={onClick}
                  type={action.id === 'submit' ? 'submit' : 'button'}
                  form={id ? `smart-form-${id}` : 'smart-form'}
                  {...action}
                  withLoading
                  isLoading={buttonLoading}
                />
              );
            })}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SmartDialogForm;
