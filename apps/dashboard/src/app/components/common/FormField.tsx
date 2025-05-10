import React from 'react';
import { Input } from './Input';
import { Textarea } from './Textarea';
import SelectOption from './SelectOption';
import { Label } from './Label';

type Option = { value: string; label: string };

interface FormFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<any>) => void;
  type?: 'text' | 'textarea' | 'select' | 'date';
  options?: Option[];
  rows?: number;
  required?: boolean;
}

export const FormField = ({
  label,
  name,
  value,
  onChange,
  type = 'text',
  options = [],
  rows,
  required,
}: FormFieldProps) => {
  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      {type === 'textarea' ? (
        <Textarea name={name} value={value} onChange={onChange} rows={rows} />
      ) : type === 'select' ? (
        <SelectOption
          name={name}
          value={value}
          onChange={onChange}
          options={options}
        />
      ) : (
        <Input
          name={name}
          value={value}
          onChange={onChange}
          type={type}
          required={required}
        />
      )}
    </div>
  );
};
