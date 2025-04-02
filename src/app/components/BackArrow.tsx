'use client';

import React from 'react';
import { ArrowLongLeftIcon } from '@heroicons/react/24/outline';

const BackButton: React.FC = () => {
  return (
    <button
      onClick={() => window.history.back()}
      className="rounded-full hover:bg-gray-100 focus:outline-none lg:hidden"
    >
      <ArrowLongLeftIcon className="w-8 h-8 mr-2 text-gray-800" />
    </button>
  );
};

export default BackButton;