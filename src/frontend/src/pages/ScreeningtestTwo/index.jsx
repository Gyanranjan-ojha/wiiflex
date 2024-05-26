import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button, Heading, Img, Input, Text } from "../../components";

export default function ScreeningtestTwoPage() {
  return (
    <>
      <Helmet>
        <title>WIIFLEX</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet>
      <div className="flex w-full items-center justify-center bg-white-A700 md:flex-col">
        <div className="flex w-full flex-col items-start justify-center gap-[131px] bg-blue-100 pb-[45px] pl-[159px] pr-14 pt-[154px] md:gap-[98px] md:p-5 sm:gap-[65px]">
          <Heading size="6xl" as="h1" className="ml-[31px] !text-white-A700 md:ml-0">
            Connect. Merge. Work
          </Heading>
          <Img src="images/img_abstraction.png" alt="abstraction" className="h-[685px] w-[86%] object-cover" />
        </div>
        <div className="relative ml-[-1px] flex w-full flex-col items-start justify-center gap-[73px] self-end bg-white-A700 pb-[576px] pl-[121px] pr-5 pt-6 md:ml-0 md:gap-[54px] md:p-5 md:pb-5 md:pl-5 sm:gap-9 sm:py-5">
          <div className="flex w-[20%] items-center gap-[13px] self-end md:w-full">
            <div className="flex flex-1 items-center justify-center gap-2.5">
              <div className="h-[46px] w-[46px] rounded-[23px] bg-gray-200" />
              <Text as="p" className="!text-gray-800_02">
                John Smith
              </Text>
            </div>
            <Img src="images/img_path.svg" alt="path" className="h-[6px]" />
          </div>
          <div className="flex w-[46%] flex-col items-center md:w-full">
            <Heading size="3xl" as="h2" className="self-start !text-teal-900">
              Add Screening Tests
            </Heading>
            <Input
              type="text"
              name="name"
              placeholder={`Test Name`}
              className="mt-5 h-[70px] self-stretch rounded border-[0.5px] border-gray-200_03 pl-3.5 pr-[35px] text-sm font-bold text-cyan-900 sm:pr-5"
            >
              iOS Developers screening tests
            </Input>
            <div className="mt-[35px] flex flex-col items-start gap-3.5 self-stretch">
              <Heading as="h3" className="ml-1.5 !text-gray-600 md:ml-0">
                Select Questions
              </Heading>
              <div className="flex flex-col gap-px self-stretch rounded border-[0.5px] border-solid border-light_blue-300 bg-white-A700 pb-3.5 pl-2 pr-[45px] pt-[15px] md:pr-5">
                <Heading as="h4" className="ml-[27px] !text-light_blue-700 md:ml-0">
                  Seach Questions
                </Heading>
                <Img src="images/img_search.svg" alt="search" className="h-[16px] md:w-full" />
                <Heading as="h5" className="!text-light_blue-700">
                  + Add Custom Questions
                </Heading>
                <div className="flex flex-col rounded-[10px] border-[0.5px] border-solid border-blue_gray-200 bg-white-A700 pb-px pr-px md:p-5">
                  <Img src="images/img_checkmark.svg" alt="checkmark" className="h-[19px] w-[19px]" />
                </div>
                <Heading as="h6">How many years of experience you have?</Heading>
                <Heading as="p" className="ml-[27px] md:ml-0">
                  Do you work with Figma?
                </Heading>
                <div className="h-[20px] w-[20px] rounded-[10px] border-[0.5px] border-solid border-blue_gray-200 bg-white-A700 md:p-5" />
                <Heading as="p">How many hours can you work per week?</Heading>
                <div className="flex flex-col rounded-[10px] border-[0.5px] border-solid border-blue_gray-200 bg-white-A700 pb-px pr-px md:p-5">
                  <Img src="images/img_checkmark.svg" alt="checkmark" className="h-[19px] w-[19px]" />
                </div>
                <Heading as="p">What is your expected monthly salary?</Heading>
                <div className="h-[20px] w-[20px] rounded-[10px] border-[0.5px] border-solid border-blue_gray-200 bg-white-A700 md:p-5" />
              </div>
            </div>
            <Link to="/screeningtestthree">
              <Button size="xl" shape="round" className="mt-[50px] w-full font-bold sm:px-5">
                Continue
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
