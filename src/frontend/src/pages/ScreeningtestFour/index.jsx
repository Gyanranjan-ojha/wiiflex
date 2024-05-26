import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button, Radio, CheckBox, Heading, Img, Input, Text, SelectBox } from "../../components";
import Header from "../../components/Header";

const dropDownOptions = [
  { label: "Option1", value: "option1" },
  { label: "Option2", value: "option2" },
  { label: "Option3", value: "option3" },
];

export default function ScreeningtestFourPage() {
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
          <div className="flex w-[66%] flex-col items-start justify-center gap-[145px] bg-blue-100 pb-[343px] pl-[159px] pr-14 pt-12 md:w-full md:gap-[108px] md:p-5 sm:gap-[72px]">
            <Heading size="6xl" as="h1" className="ml-[31px] !text-white-A700 md:ml-0">
              Connect. Merge. Work
            </Heading>
            <Img src="images/img_abstraction.png" alt="abstraction" className="h-[685px] w-[86%] object-cover" />
          </div>
          <div className="mt-[51px] flex w-[26%] flex-col items-center md:w-full">
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
            <Heading as="h3" className="ml-[7px] mt-2.5 self-start !text-gray-600 md:ml-0">
              Select Questions
            </Heading>
            <div className="mt-[18px] flex flex-col items-start self-stretch rounded-md bg-gray-50 px-[13px] pb-[18px] pt-3.5">
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
              <SelectBox
                shape="round"
                indicator={<Img src="images/img_path.svg" alt="path" className="h-[6px] w-[12px]" />}
                name="multiple"
                placeholder={`Question type`}
                options={dropDownOptions}
                className="mt-[11px] gap-px self-stretch border-[0.5px] border-solid border-gray-200_03 font-bold md:pt-5 sm:pr-5"
              />
              <div className="mt-[18px] flex w-[52%] flex-col gap-2.5 md:w-full">
                <div className="flex flex-col items-start">
                  <Text size="xs" as="p">
                    Select the correct answer
                  </Text>
                  <Text size="xs" as="p" className="mt-[9px]">
                    Answer 1
                  </Text>
                  <div className="flex items-center gap-4 self-stretch">
                    <div className="h-[20px] w-[20px] rounded-[10px] border-[0.5px] border-solid border-blue_gray-200 bg-white-A700" />
                    <Input
                      shape="round"
                      name="grouptwelve"
                      placeholder={`2`}
                      className="flex-grow border-[0.5px] border-gray-200_03 font-bold sm:pr-5"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-[15px]">
                  <div className="flex flex-col items-start gap-1">
                    <Text size="xs" as="p">
                      Answer 3
                    </Text>
                    <div className="flex items-center gap-4 self-stretch">
                      <div className="h-[20px] w-[20px] rounded-[10px] border-[0.5px] border-solid border-blue_gray-200 bg-white-A700" />
                      <Input
                        shape="round"
                        name="groupfourteen"
                        placeholder={`1`}
                        className="flex-grow border-[0.5px] border-gray-200_03 font-bold sm:pr-5"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col items-start gap-1">
                    <Text size="xs" as="p">
                      Answer 2
                    </Text>
                    <div className="flex items-center gap-[7px] self-stretch">
                      <div className="h-[20px] w-[20px] rounded-[10px] border-[0.5px] border-solid border-blue_gray-200 bg-white-A700" />
                      <Input
                        shape="round"
                        name="groupthirteen"
                        placeholder={`3`}
                        className="flex-grow border-[0.5px] border-gray-200_03 font-bold sm:pr-5"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col items-start gap-1">
                    <Text size="xs" as="p">
                      Answer 4
                    </Text>
                    <div className="flex items-center gap-[7px] self-stretch">
                      <div className="h-[20px] w-[20px] rounded-[10px] border-[0.5px] border-solid border-blue_gray-200 bg-white-A700" />
                      <Input
                        shape="round"
                        name="grouptwentyone"
                        placeholder={`4`}
                        className="flex-grow border-[0.5px] border-gray-200_03 font-bold sm:pr-5"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-[21px] flex items-center gap-[25px]">
                <Heading size="lg" as="h5" className="!text-light_blue-700">
                  Cancel
                </Heading>
                <Button size="xl" shape="round" className="min-w-[140px] font-bold sm:px-5">
                  Add
                </Button>
              </div>
            </div>
            <div className="mt-[18px]  self-stretch rounded border-[0.5px] border-solid border-light_blue-300 bg-white-A700 pb-[10px] pt-3.5">
              <div className="flex flex-col items-start gap-2.5">
                <div className="ml-2.5 flex items-center gap-[7px] md:ml-0">
                  <Img src="images/img_search.svg" alt="search" className="h-[16px] w-[16px]" />
                  <Heading as="h6" className="!text-light_blue-700">
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
                  value="doyouworkwithfigma1"
                  name="doyouwork1"
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
                  value="whatisyourexpectedmonthlysalary1"
                  name="whatisyour1"
                  label="What is your expected monthly salary?"
                  className="ml-2 w-[83%] gap-[7px] text-sm font-bold text-cyan-900 md:ml-0"
                />
              </div>
            </div>
            <Link to="/screeningtestfive">
              <Button size="xl" shape="round" className="mt-[17px] w-full font-bold sm:px-5">
                Continue
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
