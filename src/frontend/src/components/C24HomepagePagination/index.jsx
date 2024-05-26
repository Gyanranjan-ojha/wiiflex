import React from "react";
import { Button, Img, Heading } from "./..";

export default function C24HomepagePagination({
  one = "1",
  two = "2",
  page = "...",
  nine = "9",
  ten = "10",
  ...props
}) {
  return (
    <div {...props} className={`${props.className} flex items-center mt-[27px] gap-1.5`}>
      <Button color="blue_gray_300_87" size="sm" shape="round" className="w-[25px] !rounded-[3px]">
        <Img src="images/img_arrow_left.svg" />
      </Button>
      <Button
        color="white_A700"
        size="xs"
        shape="round"
        className="min-w-[25px] !rounded-[3px] border border-solid border-indigo-900 font-sfprotext font-bold !text-indigo-900"
      >
        {one}
      </Button>
      <Button
        color="white_A700"
        size="xs"
        shape="round"
        className="min-w-[25px] !rounded-[3px] border border-solid border-gray-300 font-inter font-bold !text-blue_gray-900"
      >
        {two}
      </Button>
      <Heading
        size="xs"
        as="p"
        className="flex h-[25px] w-[25px] items-center justify-center rounded-[3px] border border-solid border-gray-300 bg-white-A700 text-center !font-inter !text-[10.94px] !text-blue_gray-900"
      >
        {page}
      </Heading>
      <Button
        color="white_A700"
        size="xs"
        shape="round"
        className="min-w-[25px] !rounded-[3px] border border-solid border-gray-300 font-inter font-bold !text-blue_gray-900"
      >
        {nine}
      </Button>
      <Button
        color="white_A700"
        size="xs"
        shape="round"
        className="min-w-[25px] !rounded-[3px] border border-solid border-gray-300 font-inter font-bold !text-blue_gray-900"
      >
        {ten}
      </Button>
      <Button
        color="white_A700"
        size="sm"
        shape="round"
        className="w-[25px] !rounded-[3px] border border-solid border-gray-300"
      >
        <Img src="images/img_arrow_right.svg" />
      </Button>
    </div>
  );
}
