'use client';

interface InputFieldProps {
  label: string;
  type: string;
  name: string;
  placeholder?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({
  label,
  type,
  name,
  placeholder,
  value,
  onChange,
}: InputFieldProps) => {
  return (
    <div className="space-y-2 w-full px-1 sm:px-2">
      <label htmlFor={name} className="block text-gray-500 text-sm sm:text-xs">
        {label}
      </label>
      <input
        id={name ?? ''}
        name={name ?? ''}
        type={type ?? ''}
        placeholder={placeholder ?? ''}
        value={value ?? ''}
        onChange={onChange}
        className="w-full border border-gray-300 p-3 sm:p-2 rounded-md text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-blue-500"
      />
    </div>
  );
};

export default InputField;