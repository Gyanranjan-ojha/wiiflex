import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const shapes = {
  round: "rounded",
  square: "rounded-[0px]",
};
const variants = {
  fill: {
    white_A700: "bg-white-A700 text-cyan-900",
  },
};
const sizes = {
  lg: "h-[70px] pl-[15px] pr-[35px] text-sm",
  md: "h-[45px] pl-3 pr-[35px] text-sm",
  xs: "h-[21px] pr-[23px] text-sm",
  sm: "h-[45px] px-5",
};

const SelectBox = React.forwardRef(
  (
    {
      children,
      className = "",
      options = [],
      isSearchable = false,
      isMulti = false,
      indicator,
      shape,
      variant = "fill",
      size = "lg",
      color = "white_A700",
      ...restProps
    },
    ref,
  ) => {
    return (
      <>
        <Select
          ref={ref}
          options={options}
          className={`${className} flex ${(shape && shapes[shape]) || ""} ${(size && sizes[size]) || ""} ${(variant && variants[variant]?.[color]) || ""}`}
          isSearchable={isSearchable}
          isMulti={isMulti}
          components={{
            IndicatorSeparator: () => null,
            ...(indicator && { DropdownIndicator: () => indicator }),
          }}
          styles={{
            container: (provided) => ({
              ...provided,
              zIndex: 0,
            }),
            control: (provided) => ({
              ...provided,
              backgroundColor: "transparent",
              border: "0 !important",
              boxShadow: "0 !important",
              minHeight: "auto",
              width: "100%",
              "&:hover": {
                border: "0 !important",
              },
            }),
            input: (provided) => ({
              ...provided,
              color: "inherit",
            }),
            option: (provided, state) => ({
              ...provided,
              backgroundColor: state.isSelected ? "#ffffff" : "transparent",
              color: state.isSelected ? "#4a4a4a" : "inherit",
              "&:hover": {
                backgroundColor: "#ffffff",
                color: "#4a4a4a",
              },
            }),
            valueContainer: (provided) => ({
              ...provided,
              padding: 0,
            }),
            placeholder: (provided) => ({
              ...provided,
              margin: 0,
            }),
            menuPortal: (base) => ({ ...base, zIndex: 999999 }),
          }}
          menuPortalTarget={document.body}
          closeMenuOnScroll={(event) => {
            return event.target.id === "scrollContainer";
          }}
          {...restProps}
        />
        {children}
      </>
    );
  },
);

SelectBox.propTypes = {
  className: PropTypes.string,
  options: PropTypes.array,
  isSearchable: PropTypes.bool,
  isMulti: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.string,
  indicator: PropTypes.node,
  shape: PropTypes.oneOf(["round", "square"]),
  size: PropTypes.oneOf(["lg", "md", "xs", "sm"]),
  variant: PropTypes.oneOf(["fill"]),
  color: PropTypes.oneOf(["white_A700"]),
};

export { SelectBox };
