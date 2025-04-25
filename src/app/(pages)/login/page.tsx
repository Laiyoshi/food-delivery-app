import AuthBackground from "@/app/components/auth/AuthBackground";
import AuthForm from "@/app/components/auth/AuthForm";
import AuthFooter from "@/app/components/auth/AuthFooter";
import LoginForm from "@/app/components/auth/LoginForm";
import { Suspense } from "react";

function LoginPageContent() {
  return (
    <div className="relative flex min-h-[calc(100vh-100px)] items-center justify-center bg-white overflow-hidden px-4 sm:px-0 pt-[50px]">
      <AuthBackground />
      <AuthForm
        title="Вход в аккаунт"
        >
        <LoginForm />
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
}

export default function LoginPage () {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <LoginPageContent />
    </Suspense>
  );
};