import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button, Radio, CheckBox, Heading, Img, Text, Input } from "../../components";
import Header from "../../components/Header";

export default function ScreeningtestThreePage() {
  return (
    <>
      <Helmet>
        <title>WIIFLEX</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet>
      <div className="flex w-full flex-col bg-white-A700 pt-6 sm:pt-5">
        <div>
          <Header />
        </div>
        <div className="flex w-[76%] items-start justify-between gap-5 md:w-full md:flex-col md:p-5">
          <div className="flex w-[66%] flex-col items-start justify-center gap-[145px] bg-blue-100 pb-[137px] pl-[159px] pr-14 pt-12 md:w-full md:gap-[108px] md:p-5 sm:gap-[72px]">
            <Heading size="6xl" as="h1" className="ml-[31px] !text-white-A700 md:ml-0">
              Connect. Merge. Work
            </Heading>
            <Img src="images/img_abstraction.png" alt="abstraction" className="h-[685px] w-[86%] object-cover" />
          </div>
          <div className="mt-[51px] flex w-[26%] flex-col items-start gap-5 md:w-full">
            <Heading size="3xl" as="h2" className="!text-teal-900">
              Add Screening Tests
            </Heading>
            <div className="flex flex-col items-center self-stretch">
              <Input
                type="text"
                name="name"
                placeholder={`Test Name`}
                className="h-[70px] self-stretch rounded border-[0.5px] border-gray-200_03 pl-3.5 pr-[35px] text-sm font-bold text-cyan-900 sm:pr-5"
              >
                iOS Developers screening tests
              </Input>
              <Heading as="h3" className="ml-1.5 mt-2.5 self-start !text-gray-600 md:ml-0">
                Select Questions
              </Heading>
              <div className="mt-[18px] flex flex-col items-start self-stretch rounded-md bg-gray-50 px-[13px] pb-[17px] pt-3.5">
                <Heading as="h4" className="!text-gray-600">
                  Add Custom Questions
                </Heading>
                <Input
                  size="md"
                  shape="round"
                  name="type_question"
                  placeholder={`Type question…`}
                  className="mt-[15px] self-stretch border-[0.5px] border-gray-200_03 font-bold sm:pr-5"
                />
                <div className="mt-[11px] flex flex-col items-start gap-[9px] self-stretch rounded border-[0.5px] border-solid border-gray-200_03 bg-white-A700 pb-2 pl-[15px] pr-3 pt-3">
                  <Text size="xs" as="p">
                    Question type
                  </Text>
                  <div className="flex items-center justify-between gap-5 self-stretch">
                    <Heading as="h5">Written </Heading>
                    <Img src="images/img_path.svg" alt="path" className="mb-1.5 h-[6px] self-end" />
                  </div>
                </div>
                <div className="ml-[9px] mt-6 flex items-center gap-[25px] md:ml-0">
                  <Heading size="lg" as="h6" className="!text-light_blue-700">
                    Cancel
                  </Heading>
                  <Button size="xl" shape="round" className="min-w-[140px] font-bold sm:px-5">
                    Add
                  </Button>
                </div>
              </div>
              <div className="mt-5 self-stretch rounded border-[0.5px] border-solid border-light_blue-300 bg-white-A700 pb-[13px] pt-3.5">
                <div className="flex flex-col items-start gap-2.5">
                  <div className="ml-2.5 flex items-center gap-[7px] md:ml-0">
                    <Img src="images/img_search.svg" alt="search" className="h-[16px] w-[16px]" />
                    <Heading as="p" className="!text-light_blue-700">
                      Seach Questions
                    </Heading>
                  </div>
                  <div className="h-px w-full self-stretch bg-gray-200_01" />
                  <CheckBox
                    name="checkmark"
                    label="How many years of experience you have?"
                    id="checkmark"
                    className="ml-2 gap-[7px] p-px text-sm font-bold text-cyan-900 md:ml-0"
                  />
                  <div className="h-px w-full self-stretch bg-gray-200_01" />
                  <Radio
                    value="doyouworkwithfigma"
                    name="doyouwork"
                    label="Do you work with Figma?"
                    className="ml-2 w-[56%] gap-[7px] text-sm font-bold text-cyan-900 md:ml-0"
                  />
                  <div className="h-px w-full self-stretch bg-gray-200_01" />
                  <CheckBox
                    name="checkmark_one"
                    label="How many hours can you work per week?"
                    id="checkmarkone"
                    className="ml-2 gap-[7px] text-sm font-bold text-cyan-900 md:ml-0"
                  />
                  <div className="h-px w-full self-stretch bg-gray-200_01" />
                  <Radio
                    value="whatisyourexpectedmonthlysalary"
                    name="whatisyour"
                    label="What is your expected monthly salary?"
                    className="ml-2 w-[83%] gap-[7px] text-sm font-bold text-cyan-900 md:ml-0"
                  />
                </div>
              </div>
              <Link to="/screeningtestfour">
                <Button size="xl" shape="round" className="mt-[17px] w-full font-bold sm:px-5">
                  Continue
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
