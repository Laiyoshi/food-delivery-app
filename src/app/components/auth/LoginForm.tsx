'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import InputField from '@/app/components/auth/InputField';
import { fetchLoginUser } from '@/app/utils/auth/data';

export default function LoginPage() {
  const router = useRouter();
  const [emailOrAccountName, setEmailOrLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') ?? '/';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await fetchLoginUser({ emailOrAccountName: emailOrAccountName, password });
      router.push(callbackUrl);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Неизвестная ошибка');
      }
    }
  };

  return (
    <form className="space-y-4 sm:space-y-6" onSubmit={handleLogin}>
      <InputField
        label="Email или логин"
        name="email"
        type="text"
        placeholder="ivanov@yandex.ru"
        value={emailOrAccountName}
        onChange={(e) => setEmailOrLogin(e.target.value)}
      />
      <InputField
        label="Пароль"
        name="password"
        type="password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-3 sm:py-2 rounded-lg font-semibold hover:bg-blue-600 transition cursor-pointer"
      >
        Войти
      </button>
    </form>
  );
}