const PhoneContainer = ({ children }) => {
  return (
    <div className="w-[375px] h-[812px] bg-black rounded-[3rem] overflow-hidden shadow-2xl relative">
      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150px] h-[30px] bg-black rounded-b-[20px] z-50" />
      
      {/* Content */}
      <div className="w-full h-full relative z-10">
        {children}
      </div>
      
      {/* Home Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-white/60 rounded-full z-50" />
    </div>
  );
};

export default PhoneContainer;


