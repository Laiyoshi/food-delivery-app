"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import InputField from "./InputField";
import { fetchRegisterUser } from "@/app/utils/data";

const RegisterForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
    cardNumber: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const result = await fetchRegisterUser(formData.firstName, formData.lastName, formData.email, formData.password, formData.address, formData.cardNumber);

    if (result.success) {
      setMessage({ text: result.success, type: "success" });
      setTimeout(() => router.push("/login"), 2000);
    } else {
      setMessage({ text: result.error || "Ошибка сервера", type: "error" });
    }

    setLoading(false);
  };

  return (
    <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
      <InputField label="Имя" name="firstName" type="text" placeholder="Ярополк" onChange={handleChange} />
      <InputField label="Фамилия" name="lastName" type="text" placeholder="Иванов" onChange={handleChange} />
      <InputField label="Email" name="email" type="email" placeholder="ivanov@yandex.ru" onChange={handleChange} />
      <InputField label="Пароль" name="password" type="password" placeholder="••••••••" onChange={handleChange} />
      <InputField label="Адрес" name="address" type="address" placeholder="Москва" onChange={handleChange} />
      <InputField label="Номер карты" name="cardNumber" type="cardNumber" placeholder="1234 1234 1234 1234" onChange={handleChange} />


      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-3 sm:py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
        disabled={loading}
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

export default RegisterForm;
