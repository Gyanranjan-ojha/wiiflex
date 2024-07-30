import React from "react";
import PropTypes from "prop-types";

const shapes = {
  round: "rounded",
};
const variants = {
  tarOutlineGray20003:
    "!border-gray-200_03 border-[0.5px] border-solid bg-white-A700",
};
const sizes = {
  xs: "h-[216px] p-3.5 text-xs",
};

const TextArea = React.forwardRef(
  (
    {
      className = "",
      name = "",
      value = "",
      placeholder = "",
      shape,
      size = "xs",
      variant = "tarOutlineGray20003",
      onChange,
      ...restProps
    },
    ref
  ) => {
    return (
      <textarea
        ref={ref}
        className={`${className} ${(shape && shapes[shape]) || ""} ${
          sizes[size] || ""
        } ${variants[variant] || ""}`}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        {...restProps}
      />
    );
  }
);
TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};

export { TextArea };
