import React from "react";
import { Input } from "../Input";
import { useScreenTestContext } from "../../context/ScreenTestContextProvider";

const CommonInput = ({ value, onChange, placeholder }) => {
  const { screenTestData, updateScreenTestData, validateScreenTest } =
    useScreenTestContext();
  return (
    <Input
      type="text"
      name="name"
      value={screenTestData.screening_test_name}
      onChange={(e) =>
        updateScreenTestData({
          ...screenTestData,
          screening_test_name: e.target.value,
        })
      }
      placeholder="Test name"
      className="mt-5 !h-[70px] self-stretch rounded border-[1px] border-gray-400 pl-3.5 pr-[35px] text-sm font-bold text-cyan-900 sm:pr-5"
      inputClassName="font-bold"
    >
      Input val
    </Input>
  );
};

export default CommonInput;
