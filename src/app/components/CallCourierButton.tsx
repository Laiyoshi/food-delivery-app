'use client';

import React from 'react';

const CallCourierButton = ({ phone }: { phone: string }) => {
  return (
    <button
      onClick={() => window.open(`tel:${phone}`, '_self')}
      className="w-full border-1 border-gray-300 shadow-(--shadow-card) rounded-lg bg-white py-3 text-center text-base font-bold text-gray-800 hover:bg-gray-100"
    >
      Позвонить курьеру
    </button>
  );
};

export default CallCourierButton;