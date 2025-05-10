import React from 'react';

type Option = string | { value: string | number; label: string };

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectOption: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  className = '',
  ...props
}) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className={`border p-2 rounded ${className}`}
      {...props}
    >
      {options.map((opt) => {
        if (typeof opt === 'string') {
          return (
            <option key={opt} value={opt}>
              {opt.charAt(0).toUpperCase() + opt.slice(1)}
            </option>
          );
        }

        return (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        );
      })}
    </select>
  );
};

export default SelectOption;
