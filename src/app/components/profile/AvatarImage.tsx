'use client';

import Image from 'next/image';
import { useUserStore } from '@/app/store/userStore';

AccountSettingsFormProps

export default function AvatarImage({size}: {number} = 42) {
  const avatar = useUserStore((state) => state.avatar);

  if (!avatar) return null;

  return (
    <Image
      src={avatar || '/images/avatar.jpg'}
      alt="Аватар"
      width={size}
      height={size}
      className="w-[88px] h-[88px] rounded-full object-cover"
    />
  );
}