'use client';

import { useSearchParams } from 'next/navigation';

import { Restaurant } from '../types/types';
import { roboto } from '../ui/fonts';
import Card from './Card';
import Pagination from './Pagination';

type Props = {
  restaurantData: { data: Restaurant[]; total: number };
  lastOrdersData: Restaurant[];
};

export default function RestaurantList({ restaurantData, lastOrdersData }: Props) {
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const { data: restaurants, total } = restaurantData;
  const totalPages = Math.ceil(total / 12);

  return (
    <>
      <div className="flex max-w-[1440px] flex-wrap justify-center gap-5 sm:justify-evenly lg:justify-center xl:mx-auto xl:max-w-[1180px] xl:justify-start">
        {restaurants.length > 0 ? (
          restaurants.map(item => {
            return <Card key={item.id} restaurantData={item} />;
          })
        ) : (
          <>
            <h2
              className={`${roboto.className} mb-4 pt-6 text-left text-2xl font-bold text-gray-800`}
            >
              Ресторанов не найдено
            </h2>
          </>
        )}
      </div>

      <div className="max-w-[1440px] lg:mx-[75px] xl:mx-auto xl:max-w-[1180px]">
        {lastOrdersData.length > 0 && (
          <>
            <h2
              className={`${roboto.className} mb-4 pt-6 text-left text-2xl font-bold text-gray-800`}
            >
              Недавно заказывали
            </h2>

            <div className="flex max-w-[1440px] flex-wrap justify-center gap-5 sm:justify-evenly lg:justify-center xl:mx-auto xl:max-w-[1180px] xl:justify-start">
              {lastOrdersData.map(item => {
                return <Card key={item.id} restaurantData={item} />;
              })}
            </div>
          </>
        )}
      </div>

      {totalPages > 1 && (
        <div className="pb-10">
          <Pagination totalPages={totalPages} currentPage={currentPage} />
        </div>
      )}
    </>
  );
}
