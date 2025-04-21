import Image from 'next/image';

interface OrderMapProps {
  mapImageUrl: string; // URL изображения карты
}

const OrderMap: React.FC<OrderMapProps> = ({ mapImageUrl }) => {
  return (
    <div className="relative h-[300px] w-full overflow-hidden rounded-lg border-1 border-gray-300 shadow-(--shadow-card) lg:h-[300px]">
      {/* Отображаем изображение карты */}
      <Image
        src={mapImageUrl}
        alt="Карта доставки"
        layout="fill"
        objectFit="cover"
        priority
        className="rounded-lg"
      />
    </div>
  );
};

export default OrderMap;
