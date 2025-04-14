'use client'

import { useUserStore } from '@/app/store/store';
import { useEffect } from 'react';

export function InitUserStore({ userId }: { userId: string | null }) {
  const setUserId = useUserStore((state) => state.setUserId);

  useEffect(() => {
    if (userId) setUserId(userId);
  }, [userId]);

  return null;
}