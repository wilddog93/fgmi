import SmartTextField, { SmartTextFieldProps } from './smart-textfield';
import SmartTextarea, { SmartTextareaProps } from './smart-textarea';
import SmartMultiSelect, { SmartMultiSelectProps } from './smart-multi-select';
import SmartSelectSingle, { SmartSelectSingleProps } from './smart-select-single';
import SmartCheckbox, { SmartCheckboxProps } from './smart-checkbox';
import { Path } from 'react-hook-form';

export type SmartSingleFormItem<TData> = {
  id?: string;
  name: Path<TData>;
  nameOther?: Path<TData>;
} & (
  | ({
      fieldType: 'textfield';
    } & SmartTextFieldProps)
  | ({
      fieldType: 'textarea';
    } & SmartTextareaProps)
  | ({
      fieldType: 'select';
    } & SmartSelectSingleProps<TData[keyof TData]>)
  | ({
      fieldType: 'multi-select';
    } & SmartMultiSelectProps)
  | ({
      fieldType: 'checkbox';
    } & SmartCheckboxProps)
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SmartFormFieldInputController = <TData extends Record<string, any>>(
  props: SmartSingleFormItem<TData>
) => {
  const { name } = props;
  if (props.fieldType === 'textfield') {
    return <SmartTextField key={String(name)} fullwidth {...props} />;
  }
  if (props.fieldType === 'textarea') {
    return <SmartTextarea key={String(name)} fullwidth {...props} />;
  }
  if (props.fieldType === 'select') {
    return <SmartSelectSingle key={String(name)} {...props} />;
  }
  if (props.fieldType === 'multi-select') {
    return <SmartMultiSelect key={String(name)} {...props} />;
  }
  if (props.fieldType === 'checkbox') {
    return <SmartCheckbox key={String(name)} {...props} />;
  }
  return null;
};

export default SmartFormFieldInputController;
