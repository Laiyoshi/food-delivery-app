'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@headlessui/react';
import { ArrowLongLeftIcon } from '@heroicons/react/24/outline';

import { CategoryDish, MenuItem } from '../types/types';
import { FilterDropdown } from '../ui/FilterDropdown';
import MenuCard from './MenuCard';

type Props = {
  menuData: MenuItem;
  categories: CategoryDish[];
};

export default function MenuList({ menuData, categories }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="mx-5 max-w-[1440px] lg:mx-[75px] xl:mx-auto xl:max-w-[1180px]">
      <Button
        onClick={() => router.push('/')}
        className="mt-8 mb-6 flex cursor-pointer items-center justify-start gap-2"
      >
        <ArrowLongLeftIcon className="flex h-9" />

        <h1 className="text-3xl font-bold text-gray-800">
          {!menuData ? 'Загрузка...' : menuData.restaurantName}
        </h1>
      </Button>

      <FilterDropdown
        label="Категория"
        value={searchParams.get('category') || 'Категория'}
        onChange={value => updateFilter('category', value)}
        options={categories.map(item => item.name)}
      />

      {menuData.menu?.map((item, index) => (
        <div key={index}>
          <h2 className="mt-6 mb-4 text-2xl font-bold text-gray-800">{item.category}</h2>

          <div className="flex max-w-[1440px] flex-wrap justify-center gap-5 sm:justify-start lg:justify-start xl:mx-auto xl:max-w-[1180px] xl:justify-start">
            {item.dishes.map((dish, key) => (
              <MenuCard key={key} menuData={dish} />
            ))}
          </div>
        </div>
      )) ?? <h2>Меню ресторана отсутствует</h2>}
    </div>
  );
}
