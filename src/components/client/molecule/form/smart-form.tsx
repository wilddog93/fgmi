import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import type { FieldValues, SubmitHandler, UseFormProps } from 'react-hook-form';
import { cn } from '@/lib/utils';

export type SmartFormBaseProps<TFieldValues extends FieldValues> = {
  className?: string;
  onSubmit: SubmitHandler<TFieldValues>;
};

export type SmartFormTypeProps<TFieldValues extends FieldValues> =
  | {
      formType?: 'parent';
      propsUseForm?: UseFormProps<TFieldValues>;
    }
  | {
      formType: 'child';
      methods: ReturnType<typeof useForm<TFieldValues>>;
    };

export type SmartFormProps<TFieldValues extends FieldValues> =
  SmartFormBaseProps<TFieldValues> &
    SmartFormTypeProps<TFieldValues> & {
      children: React.ReactNode | React.ReactNode[];
      id?: string;
    };

export type SmartFormParentProps<TFieldValues extends FieldValues> = {
  className?: string;
  children: React.ReactNode | React.ReactNode[];
  propsUseForm?: UseFormProps<TFieldValues>;
  onSubmit: SubmitHandler<TFieldValues>;
  id?: string;
};
export type SmartFormChildProps<TFieldValues extends FieldValues> = {
  className?: string;
  children: React.ReactNode | React.ReactNode[];
  methods: ReturnType<typeof useForm<TFieldValues>>;
  onSubmit: SubmitHandler<TFieldValues>;
  id?: string;
};

const SmartFormParent = <TFieldValues extends FieldValues>({
  propsUseForm,
  children,
  onSubmit,
  className,
  id,
}: SmartFormParentProps<TFieldValues>) => {
  const methods = useForm<TFieldValues>(propsUseForm);
  return (
    <FormProvider {...methods}>
      <form
        id={id}
        className={cn(className)}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        {children}
      </form>
    </FormProvider>
  );
};

const SmartFormChild = <TFieldValues extends FieldValues>({
  methods,
  className,
  children,
  onSubmit,
  id,
}: SmartFormChildProps<TFieldValues>) => {
  return (
    <FormProvider {...methods}>
      <form
        id={id}
        className={cn(className)}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        {children}
      </form>
    </FormProvider>
  );
};

const SmartForm = <TFieldValues extends FieldValues>(
  props: SmartFormProps<TFieldValues>
) => {
  if (props.formType === 'child') {
    return <SmartFormChild {...props} />;
  }
  return <SmartFormParent {...props} />;
};

export default SmartForm;
