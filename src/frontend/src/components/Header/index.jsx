import React, { useEffect, useState } from "react";
import { Img, Text } from "./..";

export default function Header({ ...props }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    // Retrieve first name and last name from localStorage
    const storedFirstName = localStorage.getItem("firstName");
    const storedLastName = localStorage.getItem("lastName");

    setFirstName(storedFirstName);
    setLastName(storedLastName);
  }, []);
  return (
    <header {...props}>
      <div className="flex w-[50%] flex-col items-end gap-[2px]">
        <div className="flex w-[8%] items-center justify-center md:w-full">
          <div className="h-[46px] w-[46px] rounded-[23px] bg-gray-200" />
          <Text as="p" className=" !text-gray-800_02">
            {firstName} {lastName}
          </Text>
          {/* <Img src="images/img_keyboard_arrow_down.svg" alt="keyboardarrow" className="ml-[7px] h-[20px]" /> */}
        </div>
        <div className="h-px w-full self-stretch bg-gray-500_19" />
      </div>
    </header>
  );
}
