import { Input, type InputProps } from './input';

interface InputMaskedProps extends InputProps {
  mask: string;
}

const InputMasked: React.FC<InputMaskedProps> = ({
  mask,
  value,
  onChange,
  ...props
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    let maskedValue = '';

    let maskIndex = 0;
    let valueIndex = 0;

    while (maskIndex < mask.length && valueIndex < newValue.length) {
      const maskChar = mask[maskIndex];
      const valueChar = newValue[valueIndex];

      if (maskChar === '9' && /\d/.test(valueChar)) {
        maskedValue += valueChar;
        maskIndex++;
        valueIndex++;
      } else if (maskChar === 'A' && /[a-zA-Z]/.test(valueChar)) {
        maskedValue += valueChar;
        maskIndex++;
        valueIndex++;
      } else if (maskChar !== '9' && maskChar !== 'A') {
        maskedValue += maskChar;
        maskIndex++;
      } else {
        valueIndex++;
      }
    }
    const modifiedEvent = {
      ...e,
      target: {
        ...e.target,
        value: maskedValue,
      },
    } as React.ChangeEvent<HTMLInputElement>;

    onChange?.(modifiedEvent);
  };

  return <Input {...props} value={value} onChange={handleInputChange} />;
};

export default InputMasked;
