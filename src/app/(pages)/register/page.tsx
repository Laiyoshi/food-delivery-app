import AuthBackground from "@/app/components/auth/AuthBackground";
import AuthForm from "@/app/components/auth/AuthForm";
import RegisterForm from "@/app/components/auth/RegisterForm";
import AuthFooter from "@/app/components/auth/AuthFooter";
import { Suspense } from "react";

const RegisterPageContent = () => {

  return (
    <div className="relative flex min-h-[calc(100vh-150px)] items-center justify-center bg-white overflow-hidden px-4 sm:px-0 pt-[50px]">
      <AuthBackground />
      <AuthForm title="Регистрация">
        <RegisterForm />
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
}

const RegisterPage = () => {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <RegisterPageContent />
    </Suspense>
  );
};

export default RegisterPage;