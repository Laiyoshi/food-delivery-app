import CartButton from '@/components/CartButton';
import MenuList from '@/components/MenuList';
import { SearchParams } from '@/app/types/types';
import { fetchCategoriesMenu, fetchRestaurantMenu } from '@/utils/data';

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<SearchParams>;
};

export default async function Menu({ params, searchParams }: Props) {
  const { id } = await params;
  const searchParameters = await searchParams;

  const menuData = await fetchRestaurantMenu({
    params: { id },
    searchParams: searchParameters,
  });
  const categories = await fetchCategoriesMenu({ params: { id } });

  return (
    <>
      <MenuList menuData={menuData} categories={categories} />
      <CartButton />
    </>
  );
}
