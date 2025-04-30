'use client';

import { useSearchParams } from 'next/navigation';

import { Restaurant } from '@/app/types/types';
import { roboto } from '@/ui/fonts';

import Card from './Card';
import Pagination from './Pagination';

type Props = {
  restaurantData: { data: Restaurant[]; totalRestaurants: number };
  lastOrdersData: { data: Restaurant[]; totalOrders: number };
};

export default function RestaurantList({ restaurantData, lastOrdersData }: Props) {
  const searchParams = useSearchParams();
  const currentRestaurantPage = parseInt(searchParams.get('pageRestaurant') || '1', 10);
  const currentOrderPage = parseInt(searchParams.get('pageOrder') || '1', 10);
  const { data: restaurants, totalRestaurants } = restaurantData;
  const { data: ordersList, totalOrders } = lastOrdersData;
  const totalRestaurantPages = Math.ceil(totalRestaurants / 8);
  const totalOrdersPages = Math.ceil(totalOrders / 8);

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
      {totalRestaurantPages > 1 ? (
        <div className="pb-10">
          <Pagination
            totalPages={totalRestaurantPages}
            currentPage={currentRestaurantPage}
            paginationName="pageRestaurant"
          />
        </div>
      ) : null}

      <div className="max-w-[1440px] lg:mx-[75px] xl:mx-auto xl:max-w-[1180px]">
        {ordersList?.length ? (
          <>
            <h2
              className={`${roboto.className} mb-4 pt-6 text-left text-2xl font-bold text-gray-800`}
            >
              Недавно заказывали
            </h2>

            <div className="flex max-w-[1440px] flex-wrap justify-center gap-5 sm:justify-evenly lg:justify-center xl:mx-auto xl:max-w-[1180px] xl:justify-start">
              {ordersList.map(item => {
                return <Card key={item.id} restaurantData={item} />;
              })}
            </div>
          </>
        ) : null}
        {totalOrdersPages > 1 ? (
          <div className="pb-10">
            <Pagination
              totalPages={totalOrdersPages}
              currentPage={currentOrderPage}
              paginationName="pageOrder"
            />
          </div>
        ) : null}
      </div>
    </>
  );
}
