import AuthBackground from "@/app/components/auth/AuthBackground";
import AuthForm from "@/app/components/auth/AuthForm";
import RegisterForm from "@/app/components/auth/RegisterForm";
import AuthFooter from "@/app/components/auth/AuthFooter";

export default function RegisterPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-white overflow-hidden px-4 sm:px-0">
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
