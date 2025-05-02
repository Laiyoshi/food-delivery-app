import CartButton from '@/components/CartButton';
import RestaurantList from '@/components/RestaurantList';
import FilterSection from '@/components/RestautrantFilterSection';
import { fetchCuisineType, fetchDeliveryTime, fetchRestaurants } from '@/utils/data';

import { roboto } from '../ui/fonts';
import { getFavoriteRestaurants } from './api/restaurants/favorites/route';
import { getLastOrdersRestaurant } from './api/restaurants/last-order-restaurant/route';
import { SearchParams } from './types/types';

export default async function Home(props: SearchParams) {
  const searchParams = await props.searchParams;
  const [deliveryData, cuisineData, restaurantsData, lastOrdersData, favoriteRestaurantsData] =
    await Promise.all([
      fetchDeliveryTime(),
      fetchCuisineType(),
      fetchRestaurants({ searchParams }),
      getLastOrdersRestaurant({ searchParams }),
      getFavoriteRestaurants({ searchParams }),
    ]);

  return (
    <>
      <h1 className={`${roboto.className} pt-8 text-center text-3xl font-bold text-gray-800`}>
        Рестораны
      </h1>
      <div>
        <FilterSection cuisineOptions={cuisineData} deliveryOptions={deliveryData} />
      </div>
      <div>
        <RestaurantList
          restaurantData={restaurantsData}
          lastOrdersData={lastOrdersData}
          favoriteData={favoriteRestaurantsData}
          searchParam={{ searchParams }}
        />
      </div>
      <CartButton />
    </>
  );
}
