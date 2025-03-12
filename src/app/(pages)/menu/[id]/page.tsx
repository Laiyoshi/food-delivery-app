'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@headlessui/react';
import { ArrowLongLeftIcon } from '@heroicons/react/24/outline';

import MenuCard from '@/app/components/menu-card/MenuCard';
import { CategoryFilter, Dish, MenuItem } from '@/app/types/types';
import { FilterDropdown } from '@/app/ui/FilterDropdown/FilterDropdown';
import { fetchRestaurantMenu } from '@/app/utils/data';

export default function Menu() {
  const [menuData, setMenuData] = useState<MenuItem>();
  const { id } = useParams();
  const router = useRouter();
  const [filters, setFilters] = useState<CategoryFilter>({
    category: 'Категория',
    categoryFilter: [],
  });

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const data = await fetchRestaurantMenu({ params: { id: id as string } });
        const filterData = data.menu.map(item => item.category);
        setMenuData(data);
        setFilters(prev => ({ ...prev, categoryFilter: filterData }));
      } catch (error) {
        console.log('Ошибка загрузки данных', error);
      }
    };

    fetchMenuData();
  }, []);

  const filteredCategories = useMemo(() => {
    return (categoriesArray: MenuItem['menu']) => {
      return categoriesArray.filter(category => {
        return (
          !filters.category ||
          category.category === filters.category ||
          filters.category === 'Категория'
        );
      });
    };
  }, [filters]);

  return (
    <div className="max-w-[1440px] lg:mx-[75px] xl:mx-auto xl:max-w-[1180px]">
      <Button
        className="mt-8 mb-6 flex cursor-pointer items-center justify-start gap-2"
        onClick={() => router.push('/')}
      >
        <ArrowLongLeftIcon className="flex h-9" />
        <h1 className="text-3xl font-bold text-gray-800">
          {!menuData ? 'Загрузка...' : menuData.restaurantName}
        </h1>
      </Button>

      <FilterDropdown
        label="Категория"
        value={filters.category}
        onChange={value => setFilters(prev => ({ ...prev, category: value }))}
        options={filters.categoryFilter}
      />

      {menuData?.menu &&
        filteredCategories(menuData.menu).map((item, index) => (
          <div key={index}>
            <h2 className="mt-6 mb-4 text-2xl font-bold text-gray-800">{item.category}</h2>
            <div className="flex max-w-[1440px] flex-wrap justify-center gap-5 sm:justify-evenly lg:justify-center xl:mx-auto xl:max-w-[1180px] xl:justify-start">
              {item.dishes.map((dish, key) => (
                <MenuCard key={key} menuData={dish} />
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}
