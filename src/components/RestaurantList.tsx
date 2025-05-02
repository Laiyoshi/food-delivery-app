'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';

import { Restaurant, SearchParams } from '@/app/types/types';
import { useFavoritesStore } from '@/store/favoritesStore';
import { roboto } from '@/ui/fonts';
import { fetchFavorites } from '@/utils/data';

import Card from './Card';
import Pagination from './Pagination';

type Props = {
  restaurantData: { data: Restaurant[]; totalRestaurants: number };
  lastOrdersData: { data: Restaurant[]; totalOrders: number };
  favoriteData: { data: Restaurant[]; totalFavorites: number; userId: string };
  searchParam: SearchParams;
};

export default function RestaurantList({
  restaurantData,
  lastOrdersData,
  favoriteData,
  searchParam,
}: Props) {
  const searchParams = useSearchParams();
  const searchParamsString = searchParams.toString();

  const currentRestaurantPage = parseInt(searchParams.get('pageRestaurant') || '1', 10);
  const currentOrderPage = parseInt(searchParams.get('pageOrder') || '1', 10);
  const currentFavoritePage = parseInt(searchParams.get('pageFavorite') || '1', 10);

  const { data: restaurants, totalRestaurants } = restaurantData;
  const { data: ordersList, totalOrders } = lastOrdersData;
  const { userId } = favoriteData;

  const [totalFavorites, setTotalFavorites] = useState(0);

  const totalRestaurantPages = Math.ceil(totalRestaurants / 8);
  const totalOrdersPages = Math.ceil(totalOrders / 8);
  const totalFavoritesPages = Math.ceil(totalFavorites / 8);

  const [selectedTab, setSelectedTab] = useState(0);

  const { initializeFavorites, isFavorite, getFavoritesForPage } = useFavoritesStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchFavorites(searchParam);

        setTotalFavorites(data.totalFavorites);

        initializeFavorites(data.data, userId, currentFavoritePage);
      } catch (error) {
        console.log(error);
      }
    };

    if (selectedTab === 2) {
      fetchData();
    }
  }, [
    selectedTab,
    searchParamsString,
    searchParam,
    initializeFavorites,
    userId,
    currentFavoritePage,
  ]);

  useEffect(() => {
    if (favoriteData.data.length > 0 && userId) {
      initializeFavorites(favoriteData.data, userId, currentFavoritePage);
      setTotalFavorites(favoriteData.totalFavorites);
    }
  }, [favoriteData, userId, currentFavoritePage, initializeFavorites]);

  const renderCards = (items: Restaurant[]) => (
    <div className="flex max-w-[1440px] flex-wrap justify-center sm:justify-evenly lg:justify-start lg:gap-7.5 xl:mx-auto xl:max-w-[1180px] xl:justify-start xl:gap-5">
      {items.map(item => (
        <Card
          key={item.id}
          restaurantData={item}
          userId={userId}
          isFavorite={isFavorite(item.id)}
        />
      ))}
    </div>
  );

  return (
    <>
      <div className="">
        <TabGroup selectedIndex={selectedTab} onChange={setSelectedTab}>
          <TabList className="m-auto mx-4 mb-5 flex max-w-[1440px] items-center justify-center lg:mx-auto lg:max-w-[900px] xl:max-w-[1180px]">
            <Tab className="grow border-b pr-3 pb-1 pl-2 font-semibold text-gray-600 focus:not-data-focus:outline-none data-focus:text-blue-500 data-focus:outline-none data-focus-visible:outline-none data-selected:border-b-2 data-selected:text-blue-600">
              Все
            </Tab>

            <Tab className="grow border-b pr-2 pb-1 pl-3 font-semibold text-gray-600 focus:not-data-focus:outline-none data-focus:outline-none data-focus-visible:outline-none data-selected:border-b-2 data-selected:text-blue-600">
              Недавно заказывали
            </Tab>

            <Tab className="grow border-b pr-2 pb-1 pl-3 font-semibold text-gray-600 focus:not-data-focus:outline-none data-focus:outline-none data-focus-visible:outline-none data-selected:border-b-2 data-selected:text-blue-600">
              Избранные
            </Tab>
          </TabList>

          <TabPanels className="m-auto max-w-[1440px] lg:m-auto lg:max-w-[900px] xl:max-w-[1180px]">
            <TabPanel className="">
              {restaurants.length > 0 ? (
                <>
                  {renderCards(restaurants)}

                  {totalRestaurantPages > 1 ? (
                    <div className="pb-10">
                      <Pagination
                        totalPages={totalRestaurantPages}
                        currentPage={currentRestaurantPage}
                        paginationName="pageRestaurant"
                      />
                    </div>
                  ) : null}
                </>
              ) : (
                <h2 className={`${roboto.className} mb-4 pt-6 text-2xl font-bold text-gray-800`}>
                  Ресторанов не найдено
                </h2>
              )}
            </TabPanel>

            <TabPanel>
              {ordersList.length > 0 ? (
                <>
                  {renderCards(ordersList)}

                  {totalOrdersPages > 1 ? (
                    <div className="pb-10">
                      <Pagination
                        totalPages={totalOrdersPages}
                        currentPage={currentOrderPage}
                        paginationName="pageOrder"
                      />
                    </div>
                  ) : null}
                </>
              ) : (
                <h2 className={`${roboto.className} mb-4 pt-6 text-2xl font-bold text-gray-800`}>
                  Нет недавних заказов
                </h2>
              )}
            </TabPanel>

            <TabPanel>
              {getFavoritesForPage(currentFavoritePage).length > 0 ? (
                <>
                  {renderCards(getFavoritesForPage(currentFavoritePage))}

                  {totalFavoritesPages > 1 ? (
                    <div className="pb-10">
                      <Pagination
                        totalPages={totalFavoritesPages}
                        currentPage={currentFavoritePage}
                        paginationName="pageFavorite"
                      />
                    </div>
                  ) : null}
                </>
              ) : (
                <h2 className={`${roboto.className} mb-4 pt-6 text-2xl font-bold text-gray-800`}>
                  Избранных ресторанов пока нет
                </h2>
              )}
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </>
  );
}
