import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button, Input, Img, Heading, Text, Radio, RadioGroup } from "../../components";
// import Header from "../../components/Header";

export default function CreateJob2Page() {
  return (
    <>
      <Helmet>
        <title>WIIFLEX</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet>
      <div className="flex w-full flex-col bg-white-A700 pt-6 sm:pt-5">
        {/* <div>
          <Header />
        </div> */}
        <div className="flex w-[87%] items-start justify-between gap-5 md:w-full md:flex-col md:p-5">
          <div className="flex w-[57%] flex-col items-start justify-center gap-[123px] bg-blue-100 pb-[369px] pl-[169px] pr-14 pt-[79px] md:w-full md:gap-[92px] md:p-5 sm:gap-[61px]">
            <Heading size="6xl" as="h1" className="ml-[21px] !text-white-A700 md:ml-0">
              Connect. Merge. Work
            </Heading>
            <Img src="images/img_abstraction.png" alt="abstraction" className="h-[685px] w-[87%] object-cover" />
          </div>
          <div className="mt-[51px] flex w-[35%] flex-col items-start md:w-full">
            <Heading size="3xl" as="h2" className="!text-teal-900">
              Post a job
            </Heading>
            <div className="mt-[22px] flex items-center gap-[25px]">
              <Text as="p" className="text-gray-600_01 whitespace-nowrap">
                Company Details
              </Text>
              <Text as="p" className="text-gray-600_01 whitespace-nowrap">
                Job Details
              </Text>
              <Heading size="xl" as="h3" className="text-light_blue-700 whitespace-nowrap">
                Candidate Requirements
              </Heading>
              <Text as="p" className="text-gray-600_01 whitespace-nowrap">
                Job Description
              </Text>
            </div>
            <div className="h-px w-[25%] bg-light_blue-700" />
            <Heading as="h4" className="mt-[25px]">
              Candidate Requirements
            </Heading>
            <div className="mt-[13px] flex w-[70%] flex-col gap-[15px] md:w-full">
              <Input
                name="date"
                placeholder={`How Many Hires Do You Require For this Job?`}
                // suffix={
                //   <Img
                //     src="images/img_keyboard_arrow_down.svg"
                //     alt="keyboard_arrow_down - material"
                //     className="h-[20px] w-[15px]"
                //   />
                // }
                className="h-[70px] flex-grow gap-px rounded border-[0.5px] border-gray-200_03 pl-3.5 pr-[35px] text-sm font-bold text-cyan-900 sm:pr-5"
              >
                10
              </Input>
              <div className="flex flex-1 rounded border-[0.5px] border-solid border-gray-200_03 bg-white-A700 pb-2 pl-[13px] pr-[9px] pt-[13px]">
                <div className="flex w-full flex-col items-start gap-2">
                  <Text size="xs" as="p">
                    How Urgently Do You Need to Make a Hire?
                  </Text>
                  <div className="flex items-center justify-between gap-5 self-stretch">
                    <Heading as="h5" className="self-start">
                      2 weeks
                    </Heading>
                    {/* <Img src="images/img_keyboard_arrow_down.svg" alt="keyboardarrow" className="h-[20px] self-end" /> */}
                  </div>
                </div>
              </div>
            </div>
            <Heading as="h6" className="ml-[7px] mt-7 md:ml-0">
              Additional Job Details
            </Heading>
            <div className="ml-[7px] mt-[17px] flex w-[60%] flex-col items-start gap-[19px] md:ml-0 md:w-full">
              <Text as="p" className="!text-cyan-900">
                What Availability is Needed For This Job?
              </Text>
              <RadioGroup name="what" className="flex flex-col">
                <Radio
                  value="mondaytofriday"
                  label="Monday to Friday"
                  className="mr-[13px] flex-1 gap-2 p-px text-sm font-bold text-light_blue-700 md:mr-0"
                />
                <Radio
                  value="noweekends"
                  label="No Weekends"
                  className="mr-[43px] mt-5 flex-1 gap-2 text-sm text-cyan-900 md:mr-0"
                />
                <Radio
                  value="weekendsrequired"
                  label="Weekends Required"
                  className="mt-5 flex-1 gap-2 p-px text-sm text-cyan-900"
                />
                <Radio
                  value="holidaysrequired"
                  label="Holidays Required"
                  className="mr-[13px] mt-5 flex-1 gap-2 p-px text-sm text-cyan-900 md:mr-0"
                />
                <Radio
                  value="dayshift"
                  label="Day Shift"
                  className="mr-[77px] mt-5 flex-1 gap-2 p-px text-sm text-cyan-900 md:mr-0"
                />
                <Radio
                  value="nightshift"
                  label="Night Shift"
                  className="mr-[63px] mt-5 flex-1 gap-2 p-px text-sm font-bold text-light_blue-700 md:mr-0"
                />
                <Radio
                  value="overtime"
                  label="Overtime"
                  className="mr-[74px] mt-5 flex-1 gap-2 text-sm text-cyan-900 md:mr-0"
                />
                <Radio
                  value="hourshift"
                  label="8 Hour Shift"
                  className="mr-[59px] mt-5 flex-1 gap-2 text-sm text-cyan-900 md:mr-0"
                />
                <Radio
                  value="hourshift1"
                  label="10 Hour Shift"
                  className="mr-[55px] mt-5 flex-1 gap-2 text-sm text-cyan-900 md:mr-0"
                />
                <Radio
                  value="hourshift2"
                  label="12 Hour Shift"
                  className="mr-[55px] mt-5 flex-1 gap-2 text-sm text-cyan-900 md:mr-0"
                />
                <Radio
                  value="oncall"
                  label="On Call"
                  className="mr-[88px] mt-5 flex-1 gap-2 text-sm text-cyan-900 md:mr-0"
                />
                <Radio
                  value="overnightshift"
                  label="Overnight Shift"
                  className="mr-9 mt-5 flex-1 gap-2 p-px text-sm text-cyan-900 md:mr-0"
                />
              </RadioGroup>
            </div>
            <div className="mt-[30px] w-[69%] md:w-full">
              <div className="flex rounded border-[0.5px] border-solid border-gray-200_03 bg-white-A700 px-3.5 pb-[9px] pt-3">
                <div className="flex flex-col items-start gap-2">
                  <Text size="xs" as="p">
                    Please Enter Your Company’s Website
                  </Text>
                  <Heading as="p">(if there is one or leave the form empty)</Heading>
                </div>
              </div>
              <Input
                name="yes"
                placeholder={`Does This Job Allow Hires Fully Remote?`}
                // suffix={
                //   <Img
                //     src="images/img_keyboard_arrow_down.svg"
                //     alt="keyboard_arrow_down - material"
                //     className="h-[20px] w-[15px]"
                //   />
                // }
                className="mt-[15px] h-[70px] gap-px rounded border-[0.5px] border-gray-200_03 pl-3.5 pr-[35px] text-sm font-bold text-cyan-900 sm:pr-5"
              >
                Yes
              </Input>
              <Link to="/createjob3">
                <Button size="xl" shape="round" className="mt-10 w-full font-bold sm:px-5">
                  Next
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
