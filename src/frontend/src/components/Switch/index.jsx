import React from "react";

import SwitchProvider from "@dhiwise/react-switch";
import PropTypes from "prop-types";

const sizes = {
  xs: {
    width: 52,
    height: 26,
  },
};

const Switch = ({
  value = false,
  className,
  checkedIcon = <></>,
  uncheckedIcon = <></>,
  onChange,
  checked,
  size = "xs",
}) => {
  const handleChange = (val) => {
    onChange?.(val); // Call the passed onChange with new value
  };
  return (
    <div className={className}>
      <SwitchProvider
        checked={checked}
        onChange={handleChange}
        {...sizes[size]}
        checkedIcon={checkedIcon}
        uncheckedIcon={uncheckedIcon}
      />
    </div>
  );
};

Switch.propTypes = {
  className: PropTypes.string,
  checkedIcon: PropTypes.node,
  uncheckedIcon: PropTypes.node,
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  size: PropTypes.oneOf(["xs"]),
};

export { Switch };
