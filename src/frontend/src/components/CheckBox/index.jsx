import React from "react";
import PropTypes from "prop-types";

const CheckBox = React.forwardRef(
  (
    {
      className = "",
      name = "",
      value,
      label = "",
      id,
      onChange,
      checked,
      variant = "primary",
      size = "xs",
      ...restProps
    },
    ref
  ) => {
    const checkboxId = id || `checkbox-${name}-${value}`;
    return (
      <>
        <label className={`container ${className}`} htmlFor={id}>
          {label}
          <input
            ref={ref}
            type="checkbox"
            name={name}
            checked={checked}
            onChange={onChange}
            id={checkboxId}
            className="checkbox-radio-like"
            {...restProps}
          />
          <span className="checkmark"></span>
        </label>
      </>
    );
  }
);

CheckBox.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string,
  size: PropTypes.oneOf(["xs"]),
  variant: PropTypes.oneOf(["primary"]),
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export { CheckBox };
