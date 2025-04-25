'use client';
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type Props = {
  question: string;
  linkText: string;
  linkHref: string;
  isInsideForm?: boolean;
  className?: string;
};

export default function AuthFooter({
  question,
  linkText,
  linkHref,
  isInsideForm = false,
  className = "",
}: Props) {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') ?? '/';
  const link = linkHref + '?callbackUrl=' + callbackUrl
  console.log(link);
  if (isInsideForm) {
    return (
      <div
        className={`hidden sm:flex flex-col mt-6 sm:mt-8 text-sm text-gray-500 text-left ${className}`}
      >
        <span>{question}</span>
        <Link
          href={link}
          className="text-blue-600 font-semibold hover:underline"
        >
          {linkText}
        </Link>
      </div>
    );
  }

  return (
    <div
      className={`absolute bottom-6 left-6 text-sm sm:hidden text-gray-500 text-left ${className}`}
    >
      <span className="block">{question}</span>
      <Link
        href={link}
        className="text-blue-600 font-semibold hover:underline block"
      >
        {linkText}
      </Link>
    </div>
  );
};
