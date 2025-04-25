export default function AuthBackground() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <div 
        className="fixed sm:hidden z-0 inset-0 w-full h-full bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: "url('/images/background/mobile.png')" }} 
      />
      
      <div 
        className="fixed hidden sm:block inset-0 w-screen h-screen bg-no-repeat bg-cover bg-center"
        style={{ 
          backgroundImage: "url('/images/background/desktop.png')",
          backgroundSize: "100vw 100vh",
          backgroundPosition: "center",
        }} 
      />
    </div>
  );
};