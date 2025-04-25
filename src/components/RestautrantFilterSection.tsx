'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { FilterSectionProps } from '@/app/types/types';
import { FilterDropdown } from '@/ui/FilterDropdown';

export default function FilterSection({ cuisineOptions, deliveryOptions }: FilterSectionProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState({
    cuisine: searchParams.get('cuisineType') || '',
    rating: searchParams.get('rating') || '',
    deliveryTime: searchParams.get('deliveryTime') || '',
  });

  useEffect(() => {
    setFilters({
      cuisine: searchParams.get('cuisineType') || '',
      rating: searchParams.get('rating') || '',
      deliveryTime: searchParams.get('deliveryTime') || '',
    });
  }, [searchParams]);

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
    <div className="max-w-[1440px] lg:mx-[75px] xl:mx-auto xl:max-w-[1180px]">
      <div className="mx-5 my-6 flex flex-wrap gap-2 lg:mx-0 lg:gap-4">
        <FilterDropdown
          value={filters.cuisine}
          label="Тип кухни"
          onChange={value => updateFilter('cuisineType', value)}
          options={cuisineOptions}
        />

        <FilterDropdown
          label="Рейтинг ресторана"
          value={filters.rating}
          onChange={value => updateFilter('rating', value)}
          options={[5, 4, 3, 2]}
        />

        <FilterDropdown
          label="Время доставки"
          value={filters.deliveryTime}
          onChange={value => updateFilter('deliveryTime', value)}
          options={deliveryOptions}
        />
      </div>
    </div>
  );
}
