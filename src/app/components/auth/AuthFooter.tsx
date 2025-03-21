import Link from "next/link";

const AuthFooter = ({ question, linkText, linkHref, isInsideForm }: { 
  question: string; 
  linkText: string; 
  linkHref: string;
  isInsideForm?: boolean;
}) => {
  return (
    <>
      {isInsideForm ? (
        <div className="hidden sm:flex flex-col mt-6 sm:mt-8 text-sm text-gray-500 text-left">
          <span>{question}</span>
          <Link href={linkHref} className="text-blue-600 font-semibold hover:underline">
            {linkText}
          </Link>
        </div>
      ) : (
        <div className="absolute bottom-6 left-6 text-sm sm:hidden text-gray-500 text-left">
          <span className="block">{question}</span>
          <Link href={linkHref} className="text-blue-600 font-semibold hover:underline block">
            {linkText}
          </Link>
        </div>
      )}
    </>
  );
};

export default AuthFooter;