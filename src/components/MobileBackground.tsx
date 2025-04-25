export default function MobileBackground() {
  return (
    <div
      className="fixed lg:hidden z-0 inset-0 w-full h-full bg-no-repeat bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/background/mobile.png')",
      }}
    />
  );
}