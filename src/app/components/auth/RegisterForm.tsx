"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import InputField from "./InputField";
import { fetchRegisterUser } from "@/app/utils/auth/data";

const RegisterForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
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
      setTimeout(() => router.push("/login"), 2000);
    } else {
      setMessage({ text: result.error || "Ошибка сервера", type: "error" });
    }

    setLoading(false);
  };

  return (
    <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
      <div
        className="max-h-[320px] overflow-y-scroll space-y-4 sm:space-y-6 pr-2"
        style={{ scrollbarGutter: "stable" }}
      >
        <InputField
          label="Имя"
          name="firstName"
          type="text"
          placeholder="Ярополк"
          onChange={handleChange}
        />
        <InputField
          label="Фамилия"
          name="lastName"
          type="text"
          placeholder="Иванов"
          onChange={handleChange}
        />
        <InputField
          label="Email"
          name="email"
          type="email"
          placeholder="ivanov@yandex.ru"
          onChange={handleChange}
        />
        <InputField
          label="Пароль"
          name="password"
          type="password"
          placeholder="••••••••"
          onChange={handleChange}
        />
        <InputField
          label="Телефон"
          name="phone"
          type="phone"
          placeholder="+7(999) 999-99-99 "
          onChange={handleChange}
        />
        <InputField
          label="Адрес"
          name="address"
          type="text"
          placeholder="Москва"
          onChange={handleChange}
        />
        <InputField
          label="Номер карты"
          name="cardNumber"
          type="text"
          placeholder="1234 1234 1234 1234"
          onChange={handleChange}
        />
      </div>

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