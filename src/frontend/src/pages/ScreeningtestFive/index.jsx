import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button, Heading, Img, Input } from "../../components";
import Header from "../../components/Header";

export default function ScreeningtestFivePage() {
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
              Screening Tests Summary
            </Heading>
            <div className="self-stretch">
              <div className="flex flex-col items-center">
                <Input
                  type="text"
                  name="name"
                  placeholder={`Test Name`}
                  className="h-[70px] self-stretch rounded border-[0.5px] border-gray-200_03 pl-3.5 pr-[35px] text-sm font-bold text-cyan-900 sm:pr-5"
                >
                  iOS Developers screening tests
                </Input>
                <Heading as="h3" className="mt-7 self-start !text-gray-600">
                  Questions
                </Heading>
                <div className="mt-[18px] flex items-center justify-between gap-5 self-stretch">
                  <div className="flex flex-col gap-[20px]">
                    <Heading as="h4">How many years of experience you have?</Heading>
                    <Heading as="h5">How many hours can you work per week?</Heading>
                  </div>
                  <div className="flex flex-col gap-[42px] self-end">
                    <Img src="images/img_path.svg" alt="path" className="h-[6px]" />
                    <Img src="images/img_path.svg" alt="path" className="h-[6px]" />
                  </div>
                </div>
                <div className="mt-[50px] flex items-center justify-between gap-5 self-stretch">
                  <Heading as="h6" className="!text-light_blue-700">
                    Cancel
                  </Heading>
                  <Link to="/screeningtestsix">
                    <Button size="xl" shape="round" className="min-w-[246px] font-bold sm:px-5">
                      Finalise Test
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
