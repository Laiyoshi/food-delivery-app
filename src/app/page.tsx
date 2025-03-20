export const dynamic = 'force-dynamic' // Добавьте это в начало файла

import FilterSection from './components/RestautrantFilterSection';
import RestaurantList from './components/RestaurantList';
import { roboto } from './ui/fonts';
import {
  fetchCuisineType,
  fetchDeliveryTime,
  fetchLastOrdersRestaurants,
  fetchRestaurants,
} from './utils/data';

export default async function Home({ searchParams }: { searchParams: { [key: string]: string } }) {
  const [deliveryData, cuisineData, restaurantsData, lastOrdersData] = await Promise.all([
    fetchDeliveryTime(),
    fetchCuisineType(),
    fetchRestaurants({ searchParams }),
    fetchLastOrdersRestaurants(),
  ]);

  return (
    <>
      <h1 className={`${roboto.className} pt-8 text-center text-3xl font-bold text-gray-800`}>
        Все рестораны
      </h1>
      <div>
        <FilterSection cuisineOptions={cuisineData} deliveryOptions={deliveryData} />
      </div>
      <div>
        <RestaurantList restaurantData={restaurantsData} lastOrdersData={lastOrdersData} />
      </div>
    </>
  );
}
