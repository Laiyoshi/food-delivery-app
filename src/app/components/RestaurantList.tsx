'use client';

import { RestaurantListProps } from '../types/types';
import { roboto } from '../ui/fonts';
import Card from './Card';

const RestaurantList: React.FC<RestaurantListProps> = ({ restaurantData, lastOrdersData }) => {
  return (
    <>
      <div className="flex max-w-[1440px] flex-wrap justify-center gap-5 sm:justify-evenly lg:justify-center xl:mx-auto xl:max-w-[1180px] xl:justify-start">
        {restaurantData.length > 0 ? (
          restaurantData.map(item => {
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
    </>
  );
};

export default RestaurantList;
