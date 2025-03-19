"use client";
import AuthBackground from "@/app/components/auth/AuthBackground";
import AuthForm from "@/app/components/auth/AuthForm";
import InputField from "@/app/components/auth/InputField";
import AuthFooter from "@/app/components/auth/AuthFooter";
import '@/app/globals.css';

const RegisterPage = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-white overflow-hidden px-4 sm:px-0">
      <AuthBackground />
      <AuthForm title="Регистрация">
        <form className="space-y-4 sm:space-y-6">
          <InputField label="Имя" type="text" placeholder="Ярополк" />
          <InputField label="Фамилия" type="text" placeholder="Иванов" />
          <InputField label="Email" type="email" placeholder="ivanov@yandex.ru" />
          <InputField label="Имя аккаунта" type="text" placeholder="Yaropolк" />
          <InputField label="Повторите пароль" type="password" placeholder="••••••••" />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 sm:py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
          >
            Зарегистрироваться
          </button>
        </form>

        <AuthFooter 
          question="Уже зарегистрированы?" 
          linkText="Войти в аккаунт" 
          linkHref="/login" 
          isInsideForm
        />
      </AuthForm>

      <AuthFooter 
        question="Уже зарегистрированы?" 
        linkText="Войти в аккаунт" 
        linkHref="/login" 
      />
    </div>
  );
};

export default RegisterPage;