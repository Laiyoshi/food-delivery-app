'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

import { roboto } from '@/app/ui/fonts';
import { Suspense } from 'react';

const SuccessPageContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const orderId = searchParams.get('orderId');

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <CheckCircleIcon className="mb-4 h-20 w-20 text-green-500" />
      <h1 className={`${roboto.className} mb-2 text-3xl font-bold`}>Спасибо за заказ!</h1>
      <p className="text-lg text-gray-700">
        Ваш заказ успешно оформлен{orderId ? ` (№${orderId})` : ''}.
      </p>
      <p className="mt-2 text-sm text-gray-500">Мы скоро приступим к его выполнению.</p>
      <div className="flex gap-4">
        <Button
          onClick={() => router.push('/')}
          className="mt-6 rounded bg-blue-500 px-4 py-2 font-semibold text-white"
        >
          На главную
        </Button>
        <Button
          onClick={() => router.push('/')}
          className="mt-6 rounded bg-blue-500 px-4 py-2 font-semibold text-white"
        >
          Отследить заказ
        </Button>
      </div>
    </div>
  );
};

const SuccessPage = () => {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <SuccessPageContent />
    </Suspense>
  );
};

export default SuccessPage;
