import React from "react";

const sizes = {
  "3xl": "text-2xl font-bold md:text-[22px]",
  "2xl": "text-xl font-bold",
  "5xl": "text-[32px] font-bold md:text-3xl sm:text-[28px]",
  xl: "text-base font-bold",
  "4xl": "text-[25px] font-semibold md:text-[23px] sm:text-[21px]",
  "6xl": "text-[42px] font-bold md:text-[38px] sm:text-[32px]",
  s: "text-xs font-bold",
  md: "text-sm font-bold",
  xs: "text-[10px] font-bold",
  lg: "text-[15px] font-bold",
};

const Heading = ({ children, className = "", size = "md", as, ...restProps }) => {
  const Component = as || "h6";

  return (
    <Component className={`text-cyan-900 font-poppins ${className} ${sizes[size]}`} {...restProps}>
      {children}
    </Component>
  );
};

export { Heading };
