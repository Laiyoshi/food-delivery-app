'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import InputField from '@/app/components/auth/InputField';
import { fetchLogoutUser } from '@/app/utils/auth/data';
import { fetchRemoveUser, fetchUpdateProfile } from '@/app/utils/profile/data';
import { AccountSettingsFormProps } from '@/app/types/types';
import { useUserStore } from '@/app/store/userStore';

export default function AccountSettingsForm({ user }: AccountSettingsFormProps) {
  const [formData, setFormData] = useState(user);
  const [initialFormData, setInitialFormData] = useState(formData);
  const [showSaveButton, setShowSaveButton] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('/api/profile/me');
        const data = await res.json();
        if (res.ok) {
          setFormData(data.user);
          setInitialFormData(data.user);
        }
      } catch (err) {
        console.error('Ошибка загрузки профиля', err);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedForm = { ...formData, [name]: value };
    setFormData(updatedForm);
    setShowSaveButton(JSON.stringify(updatedForm) !== JSON.stringify(initialFormData));
  };

  const handleSave = async () => {
    try {
      const data = await fetchUpdateProfile(formData);
      setSaveMessage({ text: data.success, type: 'success' });
      setInitialFormData(formData);
      setShowSaveButton(false);
    } catch (error) {
      setSaveMessage({
        text: error instanceof Error ? error.message : 'Ошибка сервера',
        type: 'error',
      });
    }
  };

  const handleLogout = async () => {
    try {
      await fetchLogoutUser();
      router.push('/login');
      useUserStore.getState().setUserId(null);
    } catch (error) {
      console.error('Ошибка выхода:', error);
    }
  };

  const handleRemove = async () => {
    try {
      await fetchRemoveUser();
      router.push('/');
      useUserStore.getState().setUserId(null);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Ошибка удаления');
    }
  };

  return (
    <form className="space-y-6 text-sm text-gray-800">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <InputField label="Имя" name="firstName" type="text" placeholder="Ярополк" value={formData.firstName} onChange={handleChange} />
        <InputField label="Фамилия" name="lastName" type="text" placeholder="Иванов" value={formData.lastName} onChange={handleChange} />
        <InputField label="Email" name="email" type="email" placeholder="ivanov@yandex.ru" value={formData.email} onChange={handleChange} />
        <InputField label="Имя аккаунта" name="accountName" type="text" placeholder="Yaropolk" value={formData.accountName} onChange={handleChange} />
        <InputField label="Телефон" name="phone" type="tel" placeholder="+7 900 000 00 00" value={formData.phone} onChange={handleChange} />
        <InputField label="Адрес" name="address" type="text" placeholder="г. Москва, ул. Ленина" value={formData.address} onChange={handleChange} />
        <InputField label="Банковская карта" name="cardNumber" type="text" placeholder="1234 5678 9012 3456" value={formData.cardNumber} onChange={handleChange} />
      </div>

      {showSaveButton && (
        <div>
          <button
            type="button"
            className="w-full bg-blue-500 text-white py-3 sm:py-2 rounded-lg font-semibold hover:bg-blue-600 transition cursor-pointer"
            onClick={handleSave}
          >
            Сохранить
          </button>
          {saveMessage && (
            <p className={`text-sm mt-2 ${saveMessage.type === 'error' ? 'text-red-500' : 'text-green-600'}`}>
              {saveMessage.text}
            </p>
          )}
        </div>
      )}

      <div className="space-y-2">
        <h2 className="text-sm font-semibold text-gray-800">Пароль</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <InputField label="Существующий пароль" name="currentPassword" type="password" placeholder="******" value="" onChange={() => {}} />
          <InputField label="Новый пароль" name="newPassword" type="password" placeholder="******" value="" onChange={() => {}} />
          <InputField label="Повторите пароль" name="repeatPassword" type="password" placeholder="******" value="" onChange={() => {}} />
        </div>
      </div>

      <div className="flex flex-col items-start space-y-2">
        <button type="button" onClick={handleLogout} className="text-blue-500 hover:underline text-base cursor-pointer">
          Выйти из аккаунта
        </button>
        <button type="button" onClick={handleRemove} className="text-blue-500 hover:underline text-base cursor-pointer">
          Удалить аккаунт
        </button>
      </div>
    </form>
  );
}
