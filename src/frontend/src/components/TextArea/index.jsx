import React from "react";
import PropTypes from "prop-types";

const shapes = {
  round: "rounded",
};
const variants = {
  tarOutlineGray20003: "!border-gray-200_03 border-[0.5px] border-solid bg-white-A700",
};
const sizes = {
  xs: "h-[216px] p-3.5 text-xs",
};

const TextArea = React.forwardRef(
  (
    {
      className = "",
      name = "",
      placeholder = "",
      shape,
      size = "xs",
      variant = "tarOutlineGray20003",
      onChange,
      ...restProps
    },
    ref,
  ) => {
    const handleChange = (e) => {
      if (onChange) onChange(e?.target?.value);
    };

    return (
      <textarea
        ref={ref}
        className={`${className} ${(shape && shapes[shape]) || ""} ${sizes[size] || ""} ${variants[variant] || ""}`}
        name={name}
        onChange={handleChange}
        placeholder={placeholder}
        {...restProps}
      />
    );
  },
);

TextArea.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  shape: PropTypes.oneOf(["round"]),
  size: PropTypes.oneOf(["xs"]),
  variant: PropTypes.oneOf(["tarOutlineGray20003"]),
};

export { TextArea };
