"use client";
import AuthBackground from "@/app/components/auth/AuthBackground";
import AuthForm from "@/app/components/auth/AuthForm";
import InputField from "@/app/components/auth/InputField";
import AuthFooter from "@/app/components/auth/AuthFooter";
import Link from "next/link";
import '@/app/globals.css';

const LoginPage = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-white overflow-hidden px-4 sm:px-0">
      <AuthBackground />
      <AuthForm title="Вход в аккаунт">
        <form className="space-y-4 sm:space-y-6">
          <InputField label="Email или логин" type="email" name="password" placeholder="ivanov@yandex.ru" />
          <InputField label="Пароль" type="password" name="password" placeholder="••••••••" />

          <div className="text-right text-sm sm:text-xs">
            <Link href="/" className="text-gray-500 hover:underline">Забыли пароль?</Link>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 sm:py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
          >
            Войти
          </button>
        </form>

        <AuthFooter 
          question="Нет аккаунта?" 
          linkText="Зарегистрироваться" 
          linkHref="/register" 
          isInsideForm
        />
      </AuthForm>

      <AuthFooter 
        question="Нет аккаунта?" 
        linkText="Зарегистрироваться" 
        linkHref="/register" 
      />
    </div>
  );
};

export default LoginPage;