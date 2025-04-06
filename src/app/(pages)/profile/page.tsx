'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { CameraIcon } from '@heroicons/react/24/outline';
import InputField from '@/app/components/auth/InputField';
import { fetchUpdateProfile } from '@/app/utils/auth/data';

export default function AccountSettingsPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    accountName: '',
    phone: '',
    address: '',
    cardNumber: '',
  });

  const [initialFormData, setInitialFormData] = useState(formData);
  const [showSaveButton, setShowSaveButton] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

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

  return (
    <div className="min-h-[calc(100vh-50px)] flex flex-col items-center justify-center bg-gray-50 px-4 pt-[25px] pb-10">
      <div className="w-full max-w-[600px] bg-white p-6 sm:p-8 rounded-xl shadow-sm space-y-8">
        <h1 className="text-2xl font-semibold text-gray-800 text-center sm:text-left hidden sm:block">
          Настройка аккаунта
        </h1>
        <div className="flex flex-col sm:flex-row items-center sm:items-start sm:gap-4">
          <div className="relative w-[92px] h-[92px]">
            <Image
              src="/images/avatar.webp"
              alt="Аватар"
              width={92}
              height={92}
              className="rounded-full object-cover"
            />
            <button className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full text-white hover:bg-blue-600 transition">
              <CameraIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

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
                  className="w-full bg-blue-500 text-white py-3 sm:py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
                  onClick={handleSave}
                >
                  Сохранить
                </button>
                {saveMessage && (
                  <p 
                  className={`text-sm mt-2 ${saveMessage.type === 'error' ? 'text-red-500' : 'text-green-600'}`}>
                    {saveMessage.text}
                  </p>
                )}
              </div>
          )}
          <div className="space-y-2">
            <h2 className="text-sm font-semibold text-gray-800">Пароль</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <InputField label="Существующий пароль" name="currentPassword" type="password" placeholder="**" value="" onChange={() => {}} />
              <InputField label="Новый пароль" name="newPassword" type="password" placeholder="**" value="" onChange={() => {}} />
              <InputField label="Повторите пароль" name="repeatPassword" type="password" placeholder="**" value="" onChange={() => {}} />
            </div>
          </div>
          <div className="flex flex-col items-start space-y-2">
            <button type="button" className="text-blue-500 hover:underline text-base">Выйти из аккаунта</button>
            <button type="button" className="text-blue-500 hover:underline text-base">Удалить аккаунт</button>
          </div>
        </form>
      </div>
    </div>
  );
}
