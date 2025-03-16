import { MenuList } from '@/app/components/MenuList';
import { fetchCategoriesMenu, fetchRestaurantMenu } from '@/app/utils/data';

export default async function Menu({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string };
}) {
  const menuData = await fetchRestaurantMenu({ params, searchParams: searchParams });
  const categories = await fetchCategoriesMenu({ params });

  return <MenuList menuData={menuData} categories={categories} />;
}
