'use client';

import { useEffect, useState } from 'react';
import { UserIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

type User = {
  avatar?: string | null;
  firstName?: string;
  lastName?: string;
};

const Avatar = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/profile/me', {
          credentials: 'include',
        });

        if (res.ok) {
          const data = await res.json();
          if (data?.user) {
            setUser(data.user);
          }
        }
      } catch (error) {
        console.error('Ошибка загрузки профиля:', error);
      }
    };

    fetchUser();
  }, []);

  const initials =
    user?.firstName ? user.firstName : 'User';

  return (
    <div className="relative flex items-center duration-300 hover:text-blue-600 active:text-blue-700">
      {!user?.avatar && (
      <UserIcon className="mr-1 h-[30px] w-[30px]" />
      )}
      {user?.avatar ? (
        <Image
          src={user.avatar}
          alt="Avatar"
          width={42}
          height={42}
          className="w-[42px] h-[42px] rounded-full object-cover"
        />
      ) : user?.firstName && user?.lastName ? (
        <span className="ml-1">{initials}</span>
      ) : (
        <span className="ml-1">Войти</span>
      )}
    </div>
  );
};

export default Avatar;