"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import InputField from "./InputField";
import { fetchRegisterUser } from "@/utils/auth/data";
import { isEmailValid, isPhoneValid, isCardValid, isNameValid, isPasswordValid } from "@/utils/auth/validation";

export default function RegisterForm () {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    phoneRaw: "",
    address: "",
    cardNumber: "",
  });

  const [touchedFields, setTouchedFields] = useState<{ [key: string]: boolean }>({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const formatPhone = (digits: string) => {
    let result = "+7";
    if (digits.length > 1) result += " " + digits.slice(1, 4);
    if (digits.length >= 4) result += " " + digits.slice(4, 7);
    if (digits.length >= 7) result += "-" + digits.slice(7, 9);
    if (digits.length >= 9) result += "-" + digits.slice(9, 11);
    return result;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "cardNumber") {
      newValue = value
        .replace(/\D/g, "")             // Удалить все нецифровые символы
        .replace(/(.{4})/g, "$1 ")         // Разбить по 4 цифры
        .trim();                           // Убрать лишний пробел
    }

    if (name === "phone") {
      const raw = value.replace(/\D/g, "");
    
      let digits = raw;
    
      // Если начали вводить с пустого поля и сразу цифру — добавим +7
      if (formData.phoneRaw === "" && digits.length === 1) {
        digits = "7" + digits;
      }
    
      // Если ввели 8, заменим на 7
      if (digits.startsWith("8")) digits = "7" + digits.slice(1);
      if (!digits.startsWith("7")) digits = "7" + digits;
    
      const formatted = formatPhone(digits);
    
      setFormData((prev) => ({
        ...prev,
        phone: formatted,
        phoneRaw: digits,
      }));
      setTouchedFields((prev) => ({ ...prev, phone: true }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: newValue }));
    setTouchedFields((prev) => ({ ...prev, [name]: true }));
  };

  const isFormValid =
    Object.values(formData).every((value) => value.trim() !== "") &&
    isEmailValid(formData.email) &&
    isPhoneValid(formData.phone) &&
    isCardValid(formData.cardNumber) &&
    isNameValid(formData.firstName) &&
    isNameValid(formData.lastName);

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') ?? '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setLoading(true);
    setMessage(null);

    const result = await fetchRegisterUser(
      formData.firstName,
      formData.lastName,
      formData.email,
      formData.password,
      formData.phone,
      formData.address,
      formData.cardNumber
    );
    

    if (result.success) {
      setMessage({ text: result.success, type: "success" });
      setTimeout(() => router.push(callbackUrl), 2000);
    } else {
      setMessage({ text: result.error || "Ошибка сервера", type: "error" });
    }

    setLoading(false);
  };

  const renderField = (
    label: string,
    name: keyof typeof formData,
    type: string,
    placeholder: string,
    errorMessage?: string,
    customValidation?: boolean
  ) => {
    const hasError =
      touchedFields[name] &&
      (!formData[name].trim() || customValidation === false);

    return (
      <div className="mb-2">
        <InputField
          label={label}
          name={name}
          type={type}
          placeholder={placeholder}
          value={formData[name]}
          onChange={handleChange}
        />
        {hasError && (
          <p className="text-red-500 text-xs mt-1">
            {errorMessage || "Поле обязательно для заполнения"}
          </p>
        )}
      </div>
    );
  };

  const filledFieldsCount = Object.values(formData).filter((value) => value.trim() !== "").length;
  const totalFields = Object.keys(formData).length;
  const getProgressColor = () => {
    const percentage = filledFieldsCount / totalFields;
    if (percentage < 0.33) return 'bg-red-500';
    if (percentage < 0.66) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <form className="space-y-2 sm:space-y-3" onSubmit={handleSubmit}>
      <div className="text-sm text-gray-500 text-right mt-1">
        Заполнено полей: {filledFieldsCount} из {totalFields}
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
      <div
        className={`h-full transition-all duration-300 ${getProgressColor()}`}
        style={{ width: `${(filledFieldsCount / totalFields) * 100}%` }}
      />
        </div>
      <div
        className="max-h-[320px] overflow-y-scroll space-y-2 sm:space-y-3 pr-2"
        style={{ scrollbarGutter: "stable" }}
      >
        {renderField("Имя", "firstName", "text", "Ярополк", "Максимум 30 символов", isNameValid(formData.firstName))}
        {renderField("Фамилия", "lastName", "text", "Иванов", "Максимум 30 символов", isNameValid(formData.lastName))}
        {renderField("Email", "email", "email", "ivanov@yandex.ru", "Введите корректный email", isEmailValid(formData.email))}
        {renderField("Пароль", "password", "password", "••••••••", "Пароль должен быть минимум из 6 символов", isPasswordValid(formData.password))}
        {renderField("Телефон", "phone", "tel", "+7 999 999-99-99", "Введите корректный номер: 11 цифр", isPhoneValid(formData.phone))}
        {renderField("Адрес", "address", "text", "Москва")}
        {renderField("Номер карты", "cardNumber", "text", "1234 1234 1234 1234", "Введите 16 цифр", isCardValid(formData.cardNumber))}
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-3 sm:py-2 rounded-lg font-semibold hover:bg-blue-600 transition disabled:opacity-50 cursor-pointer"
        disabled={loading || !isFormValid}
      >
        {loading ? "Регистрация..." : "Зарегистрироваться"}
      </button>
      {message && (
        <p className={`text-sm ${message.type === "error" ? "text-red-500" : "text-green-600"}`}>
          {message.text}
        </p>
      )}
    </form>
  );
};


