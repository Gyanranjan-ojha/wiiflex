import React from "react";

const sizes = {
  xs: "text-xs font-normal",
  lg: "text-[15px] font-normal",
  s: "text-[13px] font-normal",
  xl: "text-lg font-normal",
  md: "text-sm font-normal",
};

const Text = ({ children, className = "", as, size = "md", ...restProps }) => {
  const Component = as || "p";

  return (
    <Component className={`text-cyan-900_66 font-poppins ${className} ${sizes[size]}`} {...restProps}>
      {children}
    </Component>
  );
};

export { Text };
