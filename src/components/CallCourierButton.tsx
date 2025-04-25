'use client';

type Props = {
  phone: string;
};

export default function CallCourierButton({ phone }: Props) {
  return (
    <button
      onClick={() => window.open(`tel:${phone}`, '_self')}
      className="w-full rounded-lg border-1 border-gray-300 bg-white py-3 text-center text-base font-bold text-gray-800 shadow-(--shadow-card) hover:bg-gray-100"
    >
      Позвонить курьеру
    </button>
  );
}
