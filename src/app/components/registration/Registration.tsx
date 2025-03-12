"use client";
import Link from "next/link";

const RegisterPage = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-white overflow-hidden px-4 sm:px-0">

      <div className="absolute inset-0 w-full h-full">
        <div 
          className="sm:hidden absolute inset-0 w-full h-full bg-no-repeat bg-cover bg-center" 
          style={{ backgroundImage: "url('/images/background/mobile.png')" }} 
        />
        
        <div 
          className="hidden sm:block absolute inset-0 w-screen h-screen bg-no-repeat bg-cover bg-center" 
          style={{ 
            backgroundImage: "url('/images/background/desktop.png')",
            backgroundSize: "100vw 100vh", // Растягивает на весь экран
            backgroundPosition: "center",
          }} 
        />
      </div>
      
      <div className="relative w-full max-w-[375px] sm:w-[30vw] sm:min-w-[320px] sm:max-w-[400px] bg-transparent sm:bg-white p-0 sm:p-10 sm:shadow-lg rounded-none sm:rounded-lg border-none sm:border border-gray-300">
        
        <h2 className="text-2xl sm:text-xl font-bold text-gray-800 text-left mb-6 sm:mb-8">
          Регистрация
        </h2>

        <form className="space-y-4 sm:space-y-6">
          <div className="space-y-2">
            <label className="block text-gray-500 text-sm sm:text-xs">
              Имя
            </label>
            <input
              type="text"
              placeholder="Ярополк"
              className="w-full border border-gray-300 p-3 sm:p-2 rounded-md text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-gray-500 text-sm sm:text-xs">
              Фамилия
            </label>
            <input
              type="text"
              placeholder="Иванов"
              className="w-full border border-gray-300 p-3 sm:p-2 rounded-md text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-gray-500 text-sm sm:text-xs">
              Email
            </label>
            <input
              type="email"
              placeholder="ivanov@yandex.ru"
              className="w-full border border-gray-300 p-3 sm:p-2 rounded-md text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-gray-500 text-sm sm:text-xs">
              Имя аккаунта
            </label>
            <input
              type="text"
              placeholder="Yaropolк"
              className="w-full border border-gray-300 p-3 sm:p-2 rounded-md text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-gray-500 text-sm sm:text-xs">
              Повторите пароль
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full border border-gray-300 p-3 sm:p-2 rounded-md text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 sm:py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
          >
            Зарегистрироваться
          </button>
        </form>

        <div className="hidden sm:flex flex-col mt-6 sm:mt-8 text-sm text-gray-500 text-left">
          <span>Уже зарегистрированы?</span>
          <Link href="/" className="text-blue-600 font-semibold hover:underline">
            Войти в аккаунт
          </Link>
        </div>
      </div>

      <div className="absolute bottom-6 left-6 text-sm sm:hidden text-gray-500 text-left">
        <span className="block">Уже зарегистрированы?</span>
        <Link href="/" className="text-blue-600 font-semibold hover:underline block">
          Войти в аккаунт
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;