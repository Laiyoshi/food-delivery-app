const InputField = ({ label, type, placeholder }: { label: string, type: string, placeholder: string }) => {
  return (
    <div className="space-y-2">
      <label className="block text-gray-500 text-sm sm:text-xs">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full border border-gray-300 p-3 sm:p-2 rounded-md text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>
  );
};

export default InputField;