import Image from 'next/image';

type Props = {
  mapImageUrl: string;
};

export default function OrderMap({ mapImageUrl }: Props) {
  return (
    <div className="relative h-[300px] w-full overflow-hidden rounded-lg border-1 border-gray-300 shadow-(--shadow-card) lg:h-[300px]">
      {/* Отображаем изображение карты */}
      <Image
        src={mapImageUrl}
        alt="Карта доставки"
        fill
        style={{ objectFit: 'cover' }}
        priority
        className="rounded-lg"
      />
    </div>
  );
}
