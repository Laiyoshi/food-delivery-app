import Image from 'next/image';

type Props = {
  mapImageUrl: string;
};

export default function OrderMap({ mapImageUrl }: Props) {
  return (
    <div className="relative h-[300px] w-full overflow-hidden rounded-lg border-1 border-gray-300 shadow-(--shadow-card) lg:h-[300px]">
      <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A73344d14c028bcb6c4be6899ca3fc8db7eb26041ed58b17b3b122bdfa72c52e8&amp;source=constructor" className='w-full h-full'></iframe>
    </div>
  );
}
