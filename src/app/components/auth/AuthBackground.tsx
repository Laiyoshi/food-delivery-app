const AuthBackground = () => {
  return (
    <div className="absolute inset-0 w-full h-full">
      <div 
        className="sm:hidden absolute inset-0 w-full h-full bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: "url('/images/background/mobile.png')" }} 
      />
      
      <div 
        className="hidden sm:block absolute inset-0 w-screen h-screen bg-no-repeat bg-cover bg-center"
        style={{ 
          backgroundImage: "url('/images/background/desktop.png')",
          backgroundSize: "100vw 100vh",
          backgroundPosition: "center",
        }} 
      />
    </div>
  );
};

export default AuthBackground;