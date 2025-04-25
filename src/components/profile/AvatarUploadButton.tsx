'use client';

import { useRef } from 'react';
import { CameraIcon } from '@heroicons/react/24/outline';
import { useUserStore } from '@/store/userStore';

export default function AvatarUploadButton() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const response = await fetch('/api/profile/upload-avatar', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Ошибка загрузки:', data.error);
        return;
      }
      useUserStore.getState().setAvatar(data.url);
      window.location.reload()
      } catch (err) {
      console.error('Ошибка при загрузке файла', err);
    }
  };

  return (
    <>
      <button
        type="button"
        className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full text-white hover:bg-blue-600 transition cursor-pointer"
        onClick={handleClick}
      >
        <CameraIcon className="w-5 h-5 z-100" />
      </button>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </>
  );
}
