import React from "react";
import PropTypes from "prop-types";

const shapes = {
  square: "rounded-[0px]",
  round: "rounded",
};
const variants = {
  underline: {
    gray_200_04: "text-gray-500_05 border-b border-gray-200_04 border-solid",
  },
  fill: {
    white_A700: "bg-white-A700 text-cyan-900",
  },
};
const sizes = {
  md: "h-[70px] pl-[13px] pr-[35px] text-sm",
  xs: "h-[27px] pr-[35px] text-[15px]",
  sm: "h-[35px] pl-3.5 pr-[35px] text-sm",
};

const Input = React.forwardRef(
  (
    {
      className = "",
      name = "",
      placeholder = "",
      type = "text",
      children,
      label = "",
      prefix,
      suffix,
      onChange, // <-- accept onChange prop
      shape,
      variant = "fill",
      size = "sm",
      color = "white_A700",
      ...restProps
    },
    ref,
  ) => {
    const handleChange = (e) => {
      if (onChange) {
        onChange(e); // <-- pass event object to onChange handler
      }
    };

    return (
      <>
        <label
          className={`${className} flex items-center justify-center cursor-text border-solid  ${
            (shape && shapes[shape]) || ""
          } ${variants[variant]?.[color] || variants[variant] || ""} ${sizes[size] || ""}`}
        >
          {!!label && label}
          {!!prefix && prefix}
          <input
            ref={ref}
            type={type}
            name={name}
            onChange={handleChange}
            placeholder={placeholder}
            {...restProps}
          />
          {!!suffix && suffix}
        </label>
      </>
    );
  },
);

Input.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  prefix: PropTypes.node,
  suffix: PropTypes.node,
  shape: PropTypes.oneOf(["square", "round"]),
  size: PropTypes.oneOf(["md", "xs", "sm"]),
  variant: PropTypes.oneOf(["underline", "fill"]),
  color: PropTypes.oneOf(["gray_200_04", "white_A700"]),
  onChange: PropTypes.func, // <-- add onChange prop type
};

export { Input };
