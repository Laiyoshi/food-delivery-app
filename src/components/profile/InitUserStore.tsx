'use client'

import { useUserStore } from '@/store/userStore';
import { useEffect } from 'react';

type Props = {
  userId: string | null;
  paymentMethodId: number | null;
  deliveryAddressId: number | null;
  avatar: string | null;
};

export default function InitUserStore({ 
  userId,
  paymentMethodId,
  deliveryAddressId,
  avatar,
}: Props) {
  const { setUserId, setPaymentMethodId, setDeliveryAddressId, setAvatar } = useUserStore();

  useEffect(() => {
    if (userId) setUserId(userId);
    if (paymentMethodId !== null) setPaymentMethodId(paymentMethodId);
    if (deliveryAddressId !== null) setDeliveryAddressId(deliveryAddressId);
    if (setAvatar !== null) setAvatar(avatar);
  }, [userId, paymentMethodId, deliveryAddressId, avatar, setUserId, setPaymentMethodId, setDeliveryAddressId, setAvatar]);


  return null;
}