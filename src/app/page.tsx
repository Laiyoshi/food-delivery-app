'use client';

import { useEffect, useMemo, useState } from 'react';

import Card from './components/card/Card';
import { Cuisine, Delivery, Restaurant } from './types/types';
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
  const [cuisineTypeFilter, setCuisineTypeFilter] = useState<Cuisine[]>([]);
  const [deliveryFilter, setDeliveryFilter] = useState<Delivery[]>([]);
  const [lastOrdersRestaurants, setLastOrdersRestaurants] = useState<Restaurant[]>([]);

  const [cuisine, setCuisine] = useState('Тип кухни');
  const [rating, setRating] = useState('Рейтинг ресторана');
  const [deliveryTime, setDeliveryTime] = useState('Время доставки');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [deliveryData, cuisineData, restaurantsData, lastOrdersData] = await Promise.all([
          fetchDeliveryTime(),
          fetchCuisineType(),
          fetchRestaurants(),
          fetchLastOrdersRestaurants(),
        ]);
        setDeliveryFilter(deliveryData);
        setCuisineTypeFilter(cuisineData);
        setRestaurantData(restaurantsData);
        setLastOrdersRestaurants(lastOrdersData);
      } catch (error) {
        console.log('Ошибка при загрузке данных: ', error);
      }
    };
    fetchData();
  }, []);

  const filterdRestaurants = (restaurantsArray: Restaurant[]) =>
    useMemo(() => {
      return restaurantsArray.filter(restaurant => {
        return (
          (!cuisine || restaurant.cuisineType === cuisine || cuisine === 'Тип кухни') &&
          (!rating || restaurant.rating >= Number(rating) || rating === 'Рейтинг ресторана') &&
          (!deliveryTime ||
            restaurant.deliveryTime === deliveryTime ||
            deliveryTime === 'Время доставки')
        );
      });
    }, [restaurantData, cuisine, rating, deliveryTime]);

  return (
    <>
      <h1 className={`${roboto.className} pt-8 text-center text-3xl font-bold text-gray-800`}>
        Все рестораны
      </h1>
      <div className="max-w-[1440px] lg:mx-[75px] xl:mx-auto xl:max-w-[1180px]">
        <div className="mx-5 my-6 flex flex-wrap gap-2 lg:mx-0 lg:gap-4">
          <FilterDropdown
            label="Тип кухни"
            value={cuisine}
            onChange={setCuisine}
            options={cuisineTypeFilter.map(item => item.cuisineType)}
          />

          <FilterDropdown
            label="Рейтинг ресторана"
            value={rating}
            onChange={setRating}
            options={[5, 4, 3, 2]}
          />

          <FilterDropdown
            label="Время доставки"
            value={deliveryTime}
            onChange={setDeliveryTime}
            options={deliveryFilter.map(item => item.deliveryTime).sort()}
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
