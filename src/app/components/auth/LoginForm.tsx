'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import InputField from '@/app/components/auth/InputField';

export default function LoginPage() {
  const router = useRouter();
  const [emailOrLogin, setEmailOrLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emailOrAccountName: emailOrLogin,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Ошибка входа');
        return;
      }

      router.push('/');
    } catch (err) {
      setError(`Сервер недоступен: ${err}`);
    }
  };

  return (
    <form className="space-y-4 sm:space-y-6" onSubmit={handleLogin}>
      <InputField
        label="Email или логин"
        name="email"
        type="text"
        placeholder="ivanov@yandex.ru"
        value={emailOrLogin}
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
        className="w-full bg-blue-500 text-white py-3 sm:py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
      >
        Войти
      </button>
    </form>
  );
}