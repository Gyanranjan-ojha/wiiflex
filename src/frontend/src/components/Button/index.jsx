import React from "react";
import PropTypes from "prop-types";

const shapes = {
  square: "rounded-[0px]",
  circle: "rounded-[50%]",
  round: "rounded",
};
const variants = {
  fill: {
    teal_200: "bg-teal-200 text-white-A700",
    blue_gray_300_87: "bg-blue_gray-300_87",
    white_A700: "bg-white-A700 text-gray-800_01",
    teal_900: "bg-teal-900 text-white-A700",
    light_blue_700: "bg-light_blue-700 text-white-A700",
  },
};
const sizes = {
  "3xl": "h-[50px] px-3.5",
  "2xl": "h-[45px] pl-2.5 pr-[21px] text-xs",
  sm: "h-[25px] px-[3px]",
  "4xl": "h-[50px] px-[31px] text-sm",
  md: "h-[30px] px-[3px]",
  xs: "h-[25px] px-[9px] text-[10px]",
  xl: "h-[45px] px-[35px] text-base",
  lg: "h-[35px] px-4 text-sm",
};

const Button = ({
  children,
  className = "",
  leftIcon,
  rightIcon,
  shape,
  variant = "fill",
  size = "lg",
  color = "light_blue_700",
  ...restProps
}) => {
  return (
    <button
      className={`${className} flex flex-row items-center justify-center text-center cursor-pointer ${(shape && shapes[shape]) || ""} ${(size && sizes[size]) || ""} ${(variant && variants[variant]?.[color]) || ""}`}
      {...restProps}
    >
      {!!leftIcon && leftIcon}
      {children}
      {!!rightIcon && rightIcon}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  shape: PropTypes.oneOf(["square", "circle", "round"]),
  size: PropTypes.oneOf(["3xl", "2xl", "sm", "4xl", "md", "xs", "xl", "lg"]),
  variant: PropTypes.oneOf(["fill"]),
  color: PropTypes.oneOf(["teal_200", "blue_gray_300_87", "white_A700", "teal_900", "light_blue_700"]),
};

export { Button };
