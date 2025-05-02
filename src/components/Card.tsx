import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@headlessui/react';
import { ReceiptPercentIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';

import { CardProps } from '@/app/types/types';
import { inter, roboto } from '@/ui/fonts';

import ClientOnly from './ClientOnly';
import FavoriteButton from './FavoriteButton';

export default function Card({ restaurantData, userId }: CardProps) {
  const rating = {
    fullStar: Math.trunc(restaurantData.rating),
    halfStar: restaurantData.rating - Math.trunc(restaurantData.rating),
    emptyStar: 5 - Math.ceil(restaurantData.rating),
  };
  const router = useRouter();

  return (
    <div
      className={`relative mx-5 flex w-full flex-col rounded-[8px] shadow-(--shadow-card) sm:mx-0 sm:w-[280px] ${inter.className} mb-8`}
    >
      <ClientOnly>
        <FavoriteButton
          restaurantId={restaurantData.id}
          restaurantData={restaurantData}
          userId={userId}
        />
      </ClientOnly>
      <h2
        className={`mt-3 ml-5 max-w-[80%] truncate text-center text-xl font-bold text-gray-800 ${roboto.className}`}
      >
        {restaurantData.name}
      </h2>

      <div className="relative mx-4 mt-2 mb-1 h-[120px] w-[250px] self-center overflow-hidden rounded-[8px] bg-contain">
        <Image
          src={restaurantData.imageUrl}
          sizes="85"
          priority
          fill
          alt="Фото ресторана"
          className="mb-3 object-cover"
        />
      </div>

      <div className="mx-4 flex">
        {Array(rating.fullStar)
          .fill(0)
          .map((_, index) => {
            return <StarIcon key={index} className="my-1 mr-2 h-4 w-4 fill-yellow-500" />;
          })}

        {rating.halfStar > 0 && (
          <div className="relative">
            <StarIcon className="t-0 l-0 absolute my-1 mr-2 h-4 w-4 text-gray-300" />

            <StarIcon
              style={{
                clipPath: `polygon(0 0, ${rating.halfStar * 100}% 0, ${rating.halfStar * 100}% 100%, 0% 100%)`,
              }}
              className="my-1 mr-2 h-4 w-4 fill-yellow-500 text-white"
            />
          </div>
        )}

        {Array(rating.emptyStar)
          .fill(0)
          .map((_, index) => {
            return <StarIcon key={index} className="my-1 mr-2 h-4 w-4 text-gray-300" />;
          })}
      </div>

      <p className="mx-4 mb-4 h-10 text-sm text-gray-800">{restaurantData.description}</p>

      <div className="mx-4 min-h-[100px] text-sm text-gray-600">
        <div className="mb-2 flex justify-between">
          <p className="">Тип кухни</p>
          <p className="ml-2 w-[150px] text-right">{restaurantData.cuisineType}</p>
        </div>

        <div className="mb-2 flex justify-between">
          <p>Время доставки</p>
          <p>{restaurantData.deliveryTime}</p>
        </div>

        <div className="flex justify-between">
          <div className="mb-2 flex justify-between">
            <ReceiptPercentIcon className="w-4" />
            <p className="w-[144px] text-xs">Средний чек</p>
          </div>

          <p className="text-xs">₽ {restaurantData.averagePrice}</p>
        </div>
      </div>

      <Button
        onClick={() => router.push(`menu/${restaurantData.id}`)}
        className="mx-4 mt-5 mb-4 w-[calc(100%-32px)] cursor-pointer rounded-[8px] bg-blue-500 px-4 py-2 text-base text-gray-100 transition duration-300 data-[active]:bg-blue-700 data-[hover]:bg-blue-600 md:w-[248px]"
      >
        Смотреть меню
      </Button>
    </div>
  );
}
