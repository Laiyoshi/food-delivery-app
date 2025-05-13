'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import InputField from '@/components/auth/InputField';
import { fetchLogoutUser } from '@/utils/auth/data';
import { fetchRemoveUser, fetchUpdateProfile } from '@/utils/profile/data';
import { useUserStore } from '@/store/userStore';

type Props = {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    accountName: string;
    phone: string;
    address?: string;
    cardNumber?: string;
    currentPassword?: string;
    newPassword?: string;
    repeatPassword?: string;
  };
}

export default function AccountSettingsForm({ user }: Props) {
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

  const formatPhone = (digits: string) => {
    let result = "+7";
    if (digits.length > 1) result += " " + digits.slice(1, 4);
    if (digits.length >= 4) result += " " + digits.slice(4, 7);
    if (digits.length >= 7) result += "-" + digits.slice(7, 9);
    if (digits.length >= 9) result += "-" + digits.slice(9, 11);
    return result;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "cardNumber") {
      newValue = value
        .replace(/\D/g, "")             // Удалить все нецифровые символы
        .replace(/(.{4})/g, "$1 ")         // Разбить по 4 цифры
        .trim();                           // Убрать лишний пробел
    }

    if (name === "phone") {
      const raw = value.replace(/\D/g, "");
    
      let digits = raw;
      if (formData.phone === "" && digits.length === 1) {
        digits = "7" + digits;
      }
    
      if (digits.startsWith("8")) digits = "7" + digits.slice(1);
      if (!digits.startsWith("7")) digits = "7" + digits;
    
      newValue = formatPhone(digits);
    }
    
    const updatedForm = { ...formData, [name]: newValue };
    setFormData(updatedForm);
    setShowSaveButton(JSON.stringify(updatedForm) !== JSON.stringify(initialFormData));
  };

  const handleSave = async () => {
    try {
      if (
        formData.currentPassword ||
        formData.newPassword ||
        formData.repeatPassword
      ) {
        if (!formData.currentPassword || !formData.newPassword || !formData.repeatPassword) {
          setSaveMessage({ text: 'Заполните все поля для смены пароля', type: 'error' });
          return
        }

        if (formData.newPassword !== formData.repeatPassword) {
          setSaveMessage({ text: 'Пароли не совпадают', type: 'error' });
          return;
        }

        if (formData.newPassword && formData.newPassword.length < 6) {
          setSaveMessage({ text: "Новый пароль должен содержать минимум 6 символов", type: "error" });
          return;
        }
      }

      const cardDigitsOnly = formData.cardNumber?.replace(/\D/g, "");
      if (!(cardDigitsOnly && cardDigitsOnly.length === 16)) {
        setSaveMessage({ text: "Номер карты должен содержать 16 цифр", type: "error" });
        return;
      }
      
      const phoneDigitsOnly = formData.phone.replace(/\D/g, "");
      if (phoneDigitsOnly.length !== 11 || !phoneDigitsOnly.startsWith("7")) {
        setSaveMessage({ text: "Телефон должен содержать 11 цифр", type: "error" });
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(formData.email)) {
        setSaveMessage({ text: "Введите корректный email", type: "error" });
        return;
      }
      
      const data = await fetchUpdateProfile(formData);
      setSaveMessage({ text: data.success, type: 'success' });
      setInitialFormData(formData);
      setShowSaveButton(false);
      setFormData((prev) => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        repeatPassword: '',
      }))
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
        <InputField label="Телефон" name="phone" type="tel" placeholder="+7 900 000-00-00" value={formData.phone} onChange={handleChange} />
        <InputField label="Адрес" name="address" type="text" placeholder="г. Москва, ул. Ленина" value={formData.address} onChange={handleChange} />
        <InputField label="Банковская карта" name="cardNumber" type="text" placeholder="1234 5678 9012 3456" value={formData.cardNumber} onChange={handleChange}/>
      </div>

      <div className="space-y-2">
        <h2 className="text-sm font-semibold text-gray-800">Пароль</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <InputField label="Существующий пароль" name="currentPassword" type="password" placeholder="******" value={formData.currentPassword} onChange={handleChange} />
          <InputField label="Новый пароль" name="newPassword" type="password" placeholder="******" value={formData.newPassword} onChange={handleChange} />
          <InputField label="Повторите пароль" name="repeatPassword" type="password" placeholder="******" value={formData.repeatPassword} onChange={handleChange} />
        </div>
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
        </div>
      )}
      {saveMessage && (
            <p className={`text-sm mt-2 ${saveMessage.type === 'error' ? 'text-red-500' : 'text-green-600'}`}>
              {saveMessage.text}
            </p>
      )}

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
