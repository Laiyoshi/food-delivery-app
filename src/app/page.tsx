'use client';

import { useEffect, useMemo, useState } from 'react';

import Card from './components/card/Card';
import { Filters, Restaurant } from './types/types';
import { FilterDropdown } from './ui/FilterDropdown/FilterDropdown';
import { roboto } from './ui/fonts';
import {
  fetchCuisineType,
  fetchDeliveryTime,
  fetchLastOrdersRestaurants,
  fetchRestaurants,
} from './utils/data';

export default function Home() {
  const [restaurantData, setRestaurantData] = useState<Restaurant[]>([]);
  const [lastOrdersRestaurants, setLastOrdersRestaurants] = useState<Restaurant[]>([]);

  const [filters, setFilters] = useState<Filters>({
    cuisine: 'Тип кухни',
    rating: 'Рейтинг ресторана',
    deliveryTime: 'Время доставки',
    cuisineTypeFilter: [],
    deliveryFilter: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [deliveryData, cuisineData, restaurantsData, lastOrdersData] = await Promise.all([
          fetchDeliveryTime(),
          fetchCuisineType(),
          fetchRestaurants(),
          fetchLastOrdersRestaurants(),
        ]);
        setRestaurantData(restaurantsData);
        setLastOrdersRestaurants(lastOrdersData);
        setFilters(prev => ({
          ...prev,
          cuisineTypeFilter: cuisineData,
          deliveryFilter: deliveryData,
        }));
      } catch (error) {
        console.log('Ошибка при загрузке данных: ', error);
      }
    };
    fetchData();
  }, []);

  const filterdRestaurants = useMemo(() => {
    return (restaurantsArray: Restaurant[]) => {
      return restaurantsArray.filter(restaurant => {
        return (
          (!filters.cuisine ||
            restaurant.cuisineType === filters.cuisine ||
            filters.cuisine === 'Тип кухни') &&
          (!filters.rating ||
            restaurant.rating >= Number(filters.rating) ||
            filters.rating === 'Рейтинг ресторана') &&
          (!filters.deliveryTime ||
            restaurant.deliveryTime === filters.deliveryTime ||
            filters.deliveryTime === 'Время доставки')
        );
      });
    };
  }, [filters]);

  return (
    <>
      <h1 className={`${roboto.className} pt-8 text-center text-3xl font-bold text-gray-800`}>
        Все рестораны
      </h1>
      <div className="max-w-[1440px] lg:mx-[75px] xl:mx-auto xl:max-w-[1180px]">
        <div className="mx-5 my-6 flex flex-wrap gap-2 lg:mx-0 lg:gap-4">
          <FilterDropdown
            label="Тип кухни"
            value={filters.cuisine}
            onChange={value => setFilters(prev => ({ ...prev, cuisine: value }))}
            options={filters.cuisineTypeFilter}
          />

          <FilterDropdown
            label="Рейтинг ресторана"
            value={filters.rating}
            onChange={value => setFilters(prev => ({ ...prev, rating: value }))}
            options={[5, 4, 3, 2]}
          />

          <FilterDropdown
            label="Время доставки"
            value={filters.deliveryTime}
            onChange={value => setFilters(prev => ({ ...prev, deliveryTime: value }))}
            options={filters.deliveryFilter}
          />
        </div>
      </div>
      <div className="flex max-w-[1440px] flex-wrap justify-center gap-5 sm:justify-evenly lg:justify-center xl:mx-auto xl:max-w-[1180px] xl:justify-start">
        {filterdRestaurants(restaurantData).map(item => {
          return <Card key={item.id} restaurantData={item} />;
        })}
      </div>
      <div className="max-w-[1440px] lg:mx-[75px] xl:mx-auto xl:max-w-[1180px]">
        {lastOrdersRestaurants.length > 0 && (
          <>
            <h2
              className={`${roboto.className} mb-4 pt-6 text-left text-2xl font-bold text-gray-800`}
            >
              Недавно заказывали
            </h2>
            <div className="flex max-w-[1440px] flex-wrap justify-center gap-5 sm:justify-evenly lg:justify-center xl:mx-auto xl:max-w-[1180px] xl:justify-start">
              {filterdRestaurants(lastOrdersRestaurants).map(item => {
                return <Card key={item.id} restaurantData={item} />;
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
}
