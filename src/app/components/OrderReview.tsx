'use client';

import React, { useState } from 'react';

import { ReviewData } from '@/app/types/types';

type Props = {
  orderId: number;
};

export function OrderReview({ orderId }: Props) {
  const [review, setReview] = useState<ReviewData>({
    orderId,
    restaurantRating: 0,
    deliveryRating: 0,
    comment: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmitReview = async () => {
    if (!review.restaurantRating || !review.deliveryRating || !review.comment.trim()) {
      setSubmitError('Пожалуйста, заполните все поля для отправки отзыва.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(review),
      });

      if (!response.ok) {
        throw new Error('Ошибка при отправке отзыва');
      }

      alert('Спасибо за ваш отзыв!');
      setReview({
        orderId,
        restaurantRating: 0,
        deliveryRating: 0,
        comment: '',
      });
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Произошла ошибка при отправке отзыва.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-lg border-1 border-gray-300 bg-white p-6 text-sm shadow-(--shadow-card) md:text-base">
      <h3 className="mb-4 text-base font-bold text-gray-800 md:text-xl">Оценить заказ</h3>
      <div className="mb-4 flex flex-col justify-between gap-4 md:flex-row md:gap-12">
        <div className="flex items-center justify-between gap-3 md:w-1/2">
          <p className="">Ресторан:</p>
          <div className="flex flex-1 justify-between">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                xmlns="http://www.w3.org/2000/svg"
                fill={review.restaurantRating > index ? 'currentColor' : 'none'}
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className={`h-6 w-6 cursor-pointer ${
                  review.restaurantRating > index ? 'text-yellow-500' : 'text-gray-600'
                }`}
                onClick={() => setReview(prev => ({ ...prev, restaurantRating: index + 1 }))}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                />
              </svg>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between gap-3 md:w-1/2">
          <p className="">Доставка:</p>
          <div className="flex flex-1 justify-between">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                xmlns="http://www.w3.org/2000/svg"
                fill={review.deliveryRating > index ? 'currentColor' : 'none'}
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className={`h-6 w-6 cursor-pointer ${
                  review.deliveryRating > index ? 'text-yellow-500' : 'text-gray-600'
                }`}
                onClick={() => setReview(prev => ({ ...prev, deliveryRating: index + 1 }))}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                />
              </svg>
            ))}
          </div>
        </div>
      </div>
      <textarea
        className="mb-4 h-24 w-full resize-none rounded-lg border border-gray-300 p-2"
        placeholder="Что вам понравилось?"
        value={review.comment}
        onChange={e => setReview(prev => ({ ...prev, comment: e.target.value }))}
      ></textarea>
      {submitError && <p className="mb-4 text-red-500">{submitError}</p>}
      <button
        className="w-full rounded-lg bg-blue-500 py-2 text-base font-bold text-white hover:bg-blue-600 disabled:opacity-50"
        onClick={handleSubmitReview}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Отправка...' : 'Оставить отзыв'}
      </button>
    </div>
  );
}
