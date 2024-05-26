import React from "react";
import PropTypes from "prop-types";

const variants = {
  primary:
    "border-blue_gray-200 border-[0.5px] border-solid bg-white-A700 checked:border-blue_gray-200 checked:border-[0.5px] checked:border-solid checked:bg-white-A700 checked:focus:bg-white-A700 checked:focus:border-blue_gray-200",
};
const sizes = {
  xs: "h-[19px] w-[19px]",
  sm: "h-[20px] w-[20px] rounded-[10px]",
};

const Radio = React.forwardRef(
  ({ className = "", name = "", label = "", id = "radio_id", variant = "primary", size = "sm", ...restProps }, ref) => {
    return (
      <label className={className + " flex items-center gap-[5px] cursor-pointer"}>
        <input
          className={` ${(size && sizes[size]) || ""} ${(variant && variants[variant]) || ""}`}
          ref={ref}
          type="radio"
          name={name}
          {...restProps}
          id={id}
        />
        <span>{label}</span>
      </label>
    );
  },
);

Radio.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string,
  size: PropTypes.oneOf(["xs", "sm"]),
  variant: PropTypes.oneOf(["primary"]),
};

export { Radio };
