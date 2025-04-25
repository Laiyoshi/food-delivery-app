type Props = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

export default function AuthForm({ title, children, className = "" }: Props) {
  return (
    <div
      className={`relative w-full max-w-[375px] sm:w-[30vw] sm:min-w-[320px] sm:max-w-[400px] bg-transparent sm:bg-white p-0 sm:p-10 sm:shadow-lg rounded-none sm:rounded-lg border-none sm:border border-gray-300 ${className}`}
    >
      <h2 className="text-2xl sm:text-xl font-bold text-gray-800 text-left mb-6 sm:mb-8">
        {title}
      </h2>
      {children}
    </div>
  );
};