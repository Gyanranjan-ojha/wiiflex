import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button, Switch, Heading, TextArea, Text, Img } from "../../components";
// import Header from "../../components/Header";

export default function CreateJob3Page() {
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
          <div className="flex w-[57%] flex-col items-start justify-center gap-[154px] bg-blue-100 pb-32 pl-[169px] pr-14 pt-12 md:w-full md:gap-[115px] md:p-5 sm:gap-[77px]">
            <Heading size="6xl" as="h1" className="ml-[21px] !text-white-A700 md:ml-0">
              Connect. Merge. Work
            </Heading>
            <Img src="images/img_abstraction.png" alt="abstraction" className="h-[685px] w-[87%] object-cover" />
          </div>
          <div className="mt-[51px] flex w-[35%] flex-col gap-7 md:w-full">
            <div className="flex flex-col items-start gap-[23px]">
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
              <Text as="p" className="text-gray-600_01 whitespace-nowrap">
                Candidate Requirements
              </Text>
              <Heading size="xl" as="h3" className="text-light_blue-700 whitespace-nowrap">
                Job Description
              </Heading>
            </div>
            </div>
            <div className="flex flex-col items-start">
              <div className="flex flex-col items-start self-stretch">
                <Heading as="h4">Write Your Full Job Description</Heading>
                <Text as="p" className="mt-[5px] w-[100%] leading-6 !text-cyan-900 md:w-full">
                  <>
                    Describe Job Descriptions in Details, Requirements
                    Skills or Education*
                  </>
                </Text>
                <TextArea
                  shape="round"
                  name="job_description"
                  placeholder={`Job Description`}
                  className="mt-[15px] self-stretch !border-gray-200_03 text-cyan-900_66 sm:pb-5 sm:pr-5"
                />
              </div>
              <div className="mt-7 flex flex-col items-start gap-[9px] self-stretch">
                <Heading as="h5" className="!text-light_blue-700">
                  Options Included
                </Heading>
                <div className="flex items-center justify-between gap-5 self-stretch pb-[11px] pt-3">
                  <Heading as="h6" className="self-start">
                    See Video Interviews
                  </Heading>
                  <Switch />
                </div>
                <div className="flex items-center justify-between gap-5 self-stretch pb-[11px] pt-3">
                  <Heading as="p" className="self-start">
                    Video Calling
                  </Heading>
                  <Switch />
                </div>
                <div className="flex items-center justify-between gap-5 self-stretch pb-[11px] pt-3">
                  <Heading as="p" className="self-start">
                    Email
                  </Heading>
                  <Switch />
                </div>
              </div>
              <Link to="/homepage">
                <Button size="xl" shape="round" className="mt-[50px] min-w-[360px] font-bold sm:px-5">
                  Post Job
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
