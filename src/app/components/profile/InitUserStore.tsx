'use client'

import { useUserStore } from '@/app/store/store';
import { useEffect } from 'react';

export function InitUserStore({ 
  userId,
  paymentMethodId,
  deliveryAddressId,
}: { 
  userId: string | null;
  paymentMethodId: number | null;
  deliveryAddressId: number | null;
}) {
  const { setUserId, setPaymentMethodId, setDeliveryAddressId } = useUserStore();

  useEffect(() => {
    if (userId) setUserId(userId);
    if (paymentMethodId !== null) setPaymentMethodId(paymentMethodId);
    if (deliveryAddressId !== null) setDeliveryAddressId(deliveryAddressId);
  }, [userId, paymentMethodId, deliveryAddressId, setUserId, setPaymentMethodId, setDeliveryAddressId]);


  return null;
}