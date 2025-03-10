"use client";

import Link from "next/link";
import Image from "next/image";

const LoginPage = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-white overflow-hidden px-4 sm:px-0">
      
      {/* 📌 Фоновые вектора (адаптация для Mobile & Desktop) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <Image 
          src="/../../../../../public/images/background/vector1.png" 
          alt="Background vector 1" 
          className="absolute w-[35vw] sm:w-[20vw] h-auto bottom-[-10%] sm:bottom-[5%] left-[-10%] sm:left-[5%] rotate-0 sm:rotate-[-45deg]"
          layout="intrinsic"
          width={533}
          height={885}
        />
        <Image 
          src="/../../../../../public/images/background/vector2.png" 
          alt="Background vector 2" 
          className="absolute w-[30vw] sm:w-[25vw] h-auto top-[70%] sm:top-[15%] right-[-15%] sm:right-[5%] rotate-0 sm:rotate-[-135deg]"
          layout="intrinsic"
          width={394}
          height={654}
        />
        <Image 
          src="/../../../../../public/images/background/vector3.png" 
          alt="Background vector 3" 
          className="absolute w-[45vw] sm:w-[30vw] h-auto top-[-10%] sm:top-[-5%] left-[20%] sm:left-[40%] rotate-0 sm:rotate-[105deg]"
          layout="intrinsic"
          width={596}
          height={647}
        />
        <Image 
          src="/../../../../../public/images/background/vector4.png" 
          alt="Background vector 4" 
          className="absolute w-[50vw] sm:w-[35vw] h-auto bottom-[10%] sm:bottom-[5%] right-[20%] sm:right-[35%] rotate-0 sm:rotate-[-75deg]"
          layout="intrinsic"
          width={634}
          height={528}
        />
      </div>

      {/* 📌 Форма авторизации */}
      <div className="relative w-full max-w-[375px] sm:w-[30vw] sm:min-w-[320px] sm:max-w-[400px] bg-transparent sm:bg-white p-0 sm:p-10 sm:shadow-lg rounded-none sm:rounded-lg border-none sm:border border-gray-300">
        
        {/* Заголовок слева */}
        <h2 className="text-2xl sm:text-xl font-bold text-gray-800 text-left mb-6 sm:mb-8">
          Вход в аккаунт
        </h2>

        <form className="space-y-4 sm:space-y-6">
          <div className="space-y-2">
            <label className="block text-gray-500 text-sm sm:text-xs">Email или логин</label>
            <input
              type="email"
              placeholder="ivanov@yandex.ru"
              className="w-full border border-gray-300 p-3 sm:p-2 rounded-md text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-gray-500 text-sm sm:text-xs">Пароль</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full border border-gray-300 p-3 sm:p-2 rounded-md text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* 📌 "Забыли пароль?" справа */}
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

        {/* 📌 "Нет аккаунта?" на отдельных строках (только в десктопе) */}
        <div className="hidden sm:flex flex-col mt-6 sm:mt-8 text-sm text-gray-500 text-left">
          <span>Нет аккаунта?</span>
          <Link href="/" className="text-blue-600 font-semibold hover:underline">Зарегистрироваться</Link>
        </div>
      </div>

      {/* 📌 "Нет аккаунта?" внизу слева (только в мобильной версии) */}
      <div className="absolute bottom-6 left-6 text-sm sm:hidden text-gray-500 text-left">
        <span className="block">Нет аккаунта?</span>
        <Link href="/" className="text-blue-600 font-semibold hover:underline block">Зарегистрироваться</Link>
      </div>

    </div>
  );
};

export default LoginPage;