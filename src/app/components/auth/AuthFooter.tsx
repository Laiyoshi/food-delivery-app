import { AuthFooterProps } from "@/app/types/types";
import Link from "next/link";

const AuthFooter = ({
  question,
  linkText,
  linkHref,
  isInsideForm = false,
  className = "",
}: AuthFooterProps) => {
  if (isInsideForm) {
    return (
      <div
        className={`hidden sm:flex flex-col mt-6 sm:mt-8 text-sm text-gray-500 text-left ${className}`}
      >
        <span>{question}</span>
        <Link
          href={linkHref}
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
        href={linkHref}
        className="text-blue-600 font-semibold hover:underline block"
      >
        {linkText}
      </Link>
    </div>
  );
};

export default AuthFooter;