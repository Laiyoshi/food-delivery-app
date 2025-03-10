"use client";

import Link from "next/link";

const LoginPage = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-white overflow-hidden px-4 sm:px-0">
      <div className="absolute w-[35vw] h-[35vh] sm:w-[60vw] sm:h-[60vh] bg-blue-600 opacity-30 blur-[8vw] sm:blur-[10vw] top-[-5vh] sm:top-[-10vh] left-[-10vw] sm:left-[-15vw] rotate-[-20deg]" />
      <div className="absolute w-[40vw] h-[40vh] sm:w-[60vw] sm:h-[60vh] bg-yellow-500 opacity-30 blur-[8vw] sm:blur-[10vw] bottom-[-10vh] sm:bottom-[-10vh] right-[-10vw] sm:right-[-15vw] rotate-[15deg]" />

      <div className="relative w-full max-w-[375px] sm:w-[30vw] sm:min-w-[320px] sm:max-w-[400px] bg-transparent sm:bg-white p-0 sm:p-6 sm:shadow-lg rounded-none sm:rounded-lg border-none sm:border border-gray-300">
        
        <h2 className="text-2xl sm:text-xl font-bold text-gray-800 text-left">Вход в аккаунт</h2>

        <form className="mt-6 sm:mt-4">
          <div className="mb-4 sm:mb-3">
            <label className="block text-gray-500 text-sm sm:text-xs mb-1">Email или логин</label>
            <input
              type="email"
              placeholder="ivanov@yandex.ru"
              className="w-full border border-gray-300 p-3 sm:p-2 rounded-md text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="mb-4 sm:mb-3">
            <label className="block text-gray-500 text-sm sm:text-xs mb-1">Пароль</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full border border-gray-300 p-3 sm:p-2 rounded-md text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="text-right text-sm sm:text-xs mb-4 sm:mb-3">
            <Link href="/" className="text-gray-500 hover:underline">Забыли пароль?</Link>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 sm:py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
          >
            Войти
          </button>
        </form>

        <div className="hidden sm:flex flex-col mt-4 text-sm text-gray-500 text-left">
          <span>Нет аккаунта?</span>
          <Link href="/" className="text-blue-600 font-semibold hover:underline">Зарегистрироваться</Link>
        </div>
      </div>

      <div className="absolute bottom-6 left-6 text-sm sm:hidden text-gray-500 text-left">
        <span className="block">Нет аккаунта?</span>
        <Link href="/" className="text-blue-600 font-semibold hover:underline block">Зарегистрироваться</Link>
      </div>

    </div>
  );
};

export default LoginPage;