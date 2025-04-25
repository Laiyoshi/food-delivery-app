'use client';

type Props = {
  label: string;
  type: string;
  name: string;
  placeholder?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputField ({
  label,
  type,
  name,
  placeholder,
  value,
  onChange,
}: Props) {
  return (
    <div className="space-y-2 w-full px-1 sm:px-2">
      <label htmlFor={name} className="block text-gray-500 text-sm sm:text-xs">
        {label}
      </label>
      <input
        id={name ?? ''}
        type={type ?? ''}
        name={name ?? ''}
        value={value ?? ''}
        placeholder={placeholder ?? ''}
        onChange={onChange}
        className="w-full border border-gray-300 p-3 sm:p-2 rounded-md text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-blue-500"
      />
    </div>
  );
};