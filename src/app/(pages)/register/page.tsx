"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { fetchRegisterUser } from "@/app/utils/data";
import AuthBackground from "@/app/components/auth/AuthBackground";
import AuthForm from "@/app/components/auth/AuthForm";
import InputField from "@/app/components/auth/InputField";
import AuthFooter from "@/app/components/auth/AuthFooter";

const RegisterPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
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

    const result = await fetchRegisterUser(formData.firstName, formData.lastName, formData.email, formData.password);

    if (result.success) {
      setMessage({ text: result.success, type: "success" });
      setTimeout(() => router.push("/login"), 2000);
    } else {
      setMessage({ text: result.error || "Ошибка сервера", type: "error" });
    }

    setLoading(false);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-white overflow-hidden px-4 sm:px-0">
      <AuthBackground />
      <AuthForm title="Регистрация">
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <InputField label="Имя" type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Ярополк" />
          <InputField label="Фамилия" type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Иванов" />
          <InputField label="Email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="ivanov@yandex.ru" />
          <InputField label="Пароль" type="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" />
          
          {message && (
            <div className={`text-sm text-center ${message.type === "success" ? "text-green-600" : "text-red-600"}`}>
              {message.text}
            </div>
          )}

          <button type="submit" disabled={loading} className="w-full bg-blue-500 text-white py-3 sm:py-2 rounded-lg font-semibold hover:bg-blue-600 transition">
            {loading ? "Регистрация..." : "Зарегистрироваться"}
          </button>
        </form>

        <AuthFooter question="Уже зарегистрированы?" linkText="Войти в аккаунт" linkHref="/login" isInsideForm />
      </AuthForm>
      <AuthFooter question="Уже зарегистрированы?" linkText="Войти в аккаунт" linkHref="/login" />
    </div>
  );
};

export default RegisterPage;