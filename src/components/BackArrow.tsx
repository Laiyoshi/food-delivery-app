'use client';

import { ArrowLongLeftIcon } from '@heroicons/react/24/outline';

export default function BackArrow() {
  return (
    <button
      onClick={() => window.history.back()}
      className="rounded-lg hover:bg-gray-100 focus:outline-none"
    >
      <ArrowLongLeftIcon className="h-8 w-8 text-gray-800" />
    </button>
  );
}
