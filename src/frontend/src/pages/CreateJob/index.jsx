import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button, Input, Img, Heading, Text } from "../../components";

export default function CreateJobPage() {
  return (
    <>
      <Helmet>
        <title>WIIFLEX</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet>
      <div className="flex w-full items-center justify-between gap-5 bg-white-A700 pr-[259px] md:flex-col md:pr-5">
        <div className="flex w-[58%] flex-col items-start justify-center gap-28 bg-blue-100 pb-[323px] pl-[33px] pt-6 md:w-full md:gap-[84px] md:p-5 md:pb-5 sm:gap-14 sm:py-5 sm:pl-5">
          <Heading size="6xl" as="h1" className="ml-[157px] !text-white-A700 md:ml-0">
            Connect. Merge. Work
          </Heading>
          <Img
            src="images/img_abstraction.png"
            alt="abstraction"
            className="h-[685px] w-[69%] self-center object-cover"
          />
        </div>
        <div className="mb-[61px] w-[35%] self-end md:w-full">
        {/* <header className="flex w-full items-center justify-between">
          <Img src="images/img_header_logo.png" alt="headerlogo" className="h-[37px] w-[87px] object-contain" />
          <div className="flex items-center ml-auto">
            <div className="h-[46px] w-[46px] rounded-[23px] bg-gray-200"></div>
            <Text as="p" className="ml-2.5 !text-gray-800_02">
              {firstName} {lastName}
            </Text>
            <Img src="images/img_keyboard_arrow_down.svg" alt="keyboardarrow" className="ml-[7px] h-[20px]" />
          </div>
        </header> */}
          <div className="flex-col items-start">
            <Heading size="3xl" as="h2" className="!text-teal-900">
              Post a job
            </Heading>
            <div className="mt-[22px] flex items-center gap-[25px]">
              <Heading size="xl" as="h3" className="text-light_blue-700 whitespace-nowrap">
              {/* <Heading size="xl" as="h3"> */}
                Company Details
              </Heading>
              <Text as="p" className="text-gray-600_01 whitespace-nowrap">
                Job Details
              </Text>
              <Text as="p" className="text-gray-600_01 whitespace-nowrap">
                Candidate Requirements
              </Text>
              <Text as="p" className="text-gray-600_01 whitespace-nowrap">
                Job Description
              </Text>
            </div>
            <div className="h-px w-[25%] bg-light_blue-700" />
            <div className="mt-[38px] flex w-[62%] flex-col gap-[15px] md:w-full md:p-5">
              <Input
                type="text"
                name="name"
                placeholder={`Your Company Name`}
                className="h-[70px] rounded border-[0.5px] border-gray-200_03 pl-3.5 pr-[35px] text-sm font-bold text-cyan-900 sm:pr-5"
              >
                ABC Tech Consulting
              </Input>
              <Input
                name="howmany"
                placeholder={`Company Size`}
                // suffix={
                //   <Img
                //     src="images/img_keyboard_arrow_down.svg"
                //     alt="keyboard_arrow_down - material"
                //     className="h-[20px] w-[15px]"
                //   />
                // }
                className="h-[70px] gap-px rounded border-[0.5px] border-gray-200_03 pl-3.5 pr-[35px] text-sm font-bold text-cyan-900 sm:pr-5"
              >
                How Many Employees?
              </Input>
              <Input
                type="text"
                name="name"
                placeholder={`Your Name`}
                className="h-[70px] rounded border-[0.5px] border-gray-200_03 pl-3.5 pr-[35px] text-sm font-bold text-cyan-900 sm:pr-5"
              >
              </Input>
              <Input
                type="text"
                name="name"
                placeholder={`Phone `}
                className="h-[70px] rounded border-[0.5px] border-gray-200_03 pl-3.5 pr-[35px] text-sm font-bold text-cyan-900 sm:pr-5"
              >
                (+91)
              </Input>
              {/* <div className="flex rounded border-[0.5px] border-solid border-gray-200_03 bg-white-A700 px-3.5 pb-2.5 pt-[11px]">
                <div className="flex flex-col items-start gap-[5px]">
                  <Text size="xs" as="p">
                    Phone
                  </Text>
                  <div className="flex items-center gap-[18px]">
                    <div className="flex flex-wrap items-center">
                      <Img src="images/img_close.svg" alt="close" className="h-[21px] self-start" />
                      <Heading as="h4" className="ml-[9px] self-end">
                        (+91)
                      </Heading>
                    </div>
                    <Heading as="h5" className="self-end">
                    </Heading>
                  </div>
                </div>
              </div> */}
            </div>
            <Heading as="h6" className="mt-[35px]">
              Company Location
            </Heading>
            <div className="mt-[13px] flex w-[62%] flex-col items-start gap-[13px] md:w-full md:p-5">
              <div className="flex gap-2.5 self-stretch">
                <Input
                  name="location"
                  placeholder={`City`}
                  // suffix={
                  //   <Img
                  //     src="images/img_keyboard_arrow_down.svg"
                  //     alt="keyboard_arrow_down - material"
                  //     className="h-[20px] w-[15px]"
                  //   />
                  // }
                  className="h-[70px] w-full gap-px rounded border-[0.5px] border-gray-200_03 pl-3.5 pr-[35px] text-sm font-bold text-cyan-900 sm:pr-5"
                >
                  HYD
                </Input>
                <Input
                  name="ny"
                  placeholder={`State`}
                  // suffix={
                  //   <Img
                  //     src="images/img_keyboard_arrow_down.svg"
                  //     alt="keyboard_arrow_down - material"
                  //     className="h-[20px] w-[15px]"
                  //   />
                  // }
                  className="h-[70px] w-full gap-px rounded border-[0.5px] border-gray-200_03 pl-3.5 pr-[35px] text-sm font-bold text-cyan-900 sm:pr-5"
                >
                  TG
                </Input>
              </div>
              <Input
                name="country"
                placeholder={`Country`}
                // suffix={
                //   <Img
                //     src="images/img_keyboard_arrow_down.svg"
                //     alt="keyboard_arrow_down - material"
                //     className="h-[20px] w-[15px]"
                //   />
                // }
                className="h-[70px] w-[48%] gap-px rounded border-[0.5px] border-gray-200_03 pl-3.5 pr-[35px] text-sm font-bold text-cyan-900 sm:pr-5"
              >
                India
              </Input>
              <Input
                name="streetaddress"
                placeholder={`Company Street Address`}
                className="h-[70px] self-stretch rounded border-[0.5px] border-gray-200_03 pl-3.5 pr-[35px] text-sm font-bold text-cyan-900 sm:pr-5"
              >
                123 Hitech City, Hyderabad, 500082
              </Input>
            </div>
            <Heading as="p" className="mt-6">
              Job Location
            </Heading>
            <div className="mt-6 flex w-[42%] flex-col items-start md:w-full md:p-5">
              <div className="h-[20px] w-[20px] rounded-[10px] border-[0.5px] border-solid border-light_blue-700 bg-white-A700" />
              <div className="relative mt-[-20px] flex items-center gap-1.5">
                <Img src="images/img_checkmark.svg" alt="checkmark" className="h-[19px] w-[19px] self-start" />
                <div className="flex">
                  <Heading size="lg" as="p" className="!text-light_blue-700">
                    Same as Company Location
                  </Heading>
                </div>
              </div>
            </div>
            <div className="mt-[19px] flex w-[62%] gap-[9px] md:w-full md:p-5">
              <Input
                name="city"
                placeholder={`City`}
                // suffix={
                //   <Img
                //     src="images/img_keyboard_arrow_down.svg"
                //     alt="keyboard_arrow_down - material"
                //     className="h-[20px] w-[15px]"
                //   />
                // }
                className="h-[70px] w-full gap-px rounded border-[0.5px] border-gray-200_03 pl-3.5 pr-[35px] text-sm font-bold text-cyan-900 sm:pr-5"
              >
                HYD
              </Input>
              <Input
                name="ny_one"
                placeholder={`State`}
                // suffix={
                //   <Img
                //     src="images/img_keyboard_arrow_down.svg"
                //     alt="keyboard_arrow_down - material"
                //     className="h-[20px] w-[15px]"
                //   />
                // }
                className="h-[70px] w-full gap-px rounded border-[0.5px] border-gray-200_03 pl-3.5 pr-[35px] text-sm font-bold text-cyan-900 sm:pr-5"
              >
                TG
              </Input>
            </div>
            <Input
              name="country"
              placeholder={`Country`}
              // suffix={
              //   <Img
              //     src="images/img_keyboard_arrow_down.svg"
              //     alt="keyboard_arrow_down - material"
              //     className="h-[20px] w-[15px]"
              //   />
              // }
              className="mt-[15px] h-[70px] w-[30%] gap-px rounded border-[0.5px] border-gray-200_03 pl-3.5 pr-[35px] text-sm font-bold text-cyan-900 sm:pr-5"
            >
              India
            </Input>
            <Input
              name="streetaddress"
              placeholder={`Company Street Address`}
              className="mt-[15px] h-[70px] w-[62%] rounded border-[0.5px] border-gray-200_03 pl-3.5 pr-[35px] text-sm font-bold text-cyan-900 sm:pr-5"
            >
              123 Hitech City, Hyderabad, 500082
            </Input>
            <Link to="/createjob1">
              <Button size="xl" shape="round" className="mt-[11px] min-w-[360px] font-bold sm:px-5">
                Next
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
