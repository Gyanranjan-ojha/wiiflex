const ModalWrapper = ({ children }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center ">
      <div className="w-1/2 bg-color-white max-h-[80vh] border-[1px] shadow-md overflow-auto scrollbar-thin">
        {children}
      </div>
    </div>
  );
};

export default ModalWrapper;
