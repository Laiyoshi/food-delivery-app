"use client";

import Link from "next/link";

const LoginPage = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-white overflow-hidden">
      <div className="absolute w-[35vw] h-[35vh] bg-blue-600 opacity-30 blur-[8vw] top-[-5vh] left-[-10vw] rotate-[-20deg]" />
      <div className="absolute w-[40vw] h-[40vh] bg-yellow-500 opacity-30 blur-[8vw] top-[-5vh] right-[-10vw] rotate-[15deg]" />
      <div className="absolute w-[45vw] h-[45vh] bg-blue-600 opacity-30 blur-[8vw] bottom-[-10vh] left-[5vw] rotate-[-30deg]" />
      <div className="absolute w-[30vw] h-[30vh] bg-green-500 opacity-30 blur-[8vw] top-[10vh] left-[20vw] rotate-[10deg]" />

      <div className="relative w-[30vw] min-w-[320px] max-w-[400px] bg-white p-6 md:p-8 shadow-lg rounded-lg border border-gray-300">
        <h2 className="text-2xl font-bold text-gray-800 text-center">Вход в аккаунт</h2>

        <form className="mt-6">
          <div className="mb-4">
            <label className="block text-gray-500 text-sm mb-1">Email или логин</label>
            <input
              type="email"
              placeholder="ivanov@yandex.ru"
              className="w-full border border-gray-300 p-3 rounded-md text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-500 text-sm mb-1">Пароль</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full border border-gray-300 p-3 rounded-md text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="text-right text-sm mb-4">
            <Link href="/" className="text-gray-500 hover:underline">Забыли пароль?</Link>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
          >
            Войти
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-500 text-center">
          У вас ещё нет аккаунта?{" "}
          <Link href="/" className="text-blue-600 font-semibold hover:underline">Зарегистрироваться</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;