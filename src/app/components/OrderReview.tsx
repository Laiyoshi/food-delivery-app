'use client';

import React, { useState } from 'react';
import { ReviewData } from '@/app/types/types';

interface OrderReviewProps {
  orderId: number;
}

const OrderReview: React.FC<OrderReviewProps> = ({ orderId }) => {
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
    <div className="bg-white shadow-(--shadow-card) rounded-lg p-6 border-1 border-gray-300">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Оценить заказ</h3>
      <div className="flex items-center mb-4">
        <p className="mr-4">Ресторан:</p>
        <div className="flex">
          {[...Array(5)].map((_, index) => (
            <svg
              key={index}
              xmlns="http://www.w3.org/2000/svg"
              fill={review.restaurantRating > index ? 'currentColor' : 'none'}
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className={`w-6 h-6 cursor-pointer ${
                review.restaurantRating > index ? 'text-yellow-500' : 'text-gray-400'
              }`}
              onClick={() =>
                setReview((prev) => ({ ...prev, restaurantRating: index + 1 }))
              }
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
      <div className="flex items-center mb-4">
        <p className="mr-4">Доставка:</p>
        <div className="flex">
          {[...Array(5)].map((_, index) => (
            <svg
              key={index}
              xmlns="http://www.w3.org/2000/svg"
              fill={review.deliveryRating > index ? 'currentColor' : 'none'}
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className={`w-6 h-6 cursor-pointer ${
                review.deliveryRating > index ? 'text-yellow-500' : 'text-gray-400'
              }`}
              onClick={() =>
                setReview((prev) => ({ ...prev, deliveryRating: index + 1 }))
              }
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
      <textarea
        className="w-full border border-gray-300 rounded-lg p-2 mb-4"
        placeholder="Что вам понравилось?"
        value={review.comment}
        onChange={(e) =>
          setReview((prev) => ({ ...prev, comment: e.target.value }))
        }
      ></textarea>
      {submitError && <p className="text-red-500 mb-4">{submitError}</p>}
      <button
        className="w-full bg-blue-500 text-white font-bold py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
        onClick={handleSubmitReview}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Отправка...' : 'Оставить отзыв'}
      </button>
    </div>
  );
};

export default OrderReview;