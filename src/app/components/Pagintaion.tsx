'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';





export default function Pagination({
  totalPages,
  currentPage,
}: {
  totalPages: number;
  currentPage: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`/?${params.toString()}`);
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 8) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const showStart = currentPage <= 4;
    const showEnd = currentPage >= totalPages - 3;

    if (showStart) {
      pages.push(1, 2, 3, 4, 5, '...', totalPages);
    } else if (showEnd) {
      pages.push(
        1,
        '...',
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages
      );
    } else {
      pages.push(
        1,
        '...',
        currentPage - 2,
        currentPage - 1,
        currentPage,
        currentPage + 1,
        currentPage + 2,
        '...',
        totalPages
      );
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="mt-6 flex justify-center gap-1 sm:gap-2">
      <button
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
        className="flex cursor-pointer items-center gap-1 rounded px-3 py-2 text-sm text-gray-700 transition duration-300 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeftIcon className="h-4 w-4" />
        Назад
      </button>

      {pageNumbers.map((page, index) =>
        page === '...' ? (
          <span key={index} className="px-3 py-2 text-gray-400">
            ...
          </span>
        ) : (
          <button
            key={index}
            onClick={() => handlePageChange(Number(page))}
            className={`cursor-pointer rounded px-3 py-2 text-sm transition duration-300 ${
              page === currentPage ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-200'
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
        className="flex cursor-pointer items-center gap-1 rounded px-3 py-2 text-sm text-gray-700 transition duration-300 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Вперёд
        <ChevronRightIcon className="h-4 w-4" />
      </button>
    </div>
  );
}