import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button, Heading, Img, Input } from "../../components";
import Header from "../../components/Header";

export default function ScreeningtestSixPage() {
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
          <div className="flex w-[66%] flex-col items-center justify-center bg-blue-100 px-14 pb-[137px] pt-[257px] md:w-full md:p-5">
            <Img src="images/img_abstraction.png" alt="abstraction" className="h-[685px] w-[76%] object-cover" />
          </div>
          <div className="mt-[51px] flex w-[26%] flex-col items-start md:w-full">
            <Heading size="3xl" as="h1" className="!text-teal-900">
              Screening Tests Summary
            </Heading>
            <Input
              type="text"
              name="name"
              placeholder={`Test Name`}
              className="mt-5 h-[70px] self-stretch rounded border-[0.5px] border-gray-200_03 pl-3.5 pr-[35px] text-sm font-bold text-cyan-900 sm:pr-5"
            >
              iOS Developers screening tests
            </Input>
            <div className="mt-7 self-stretch">
              <div className="flex flex-col items-start gap-[17px]">
                <Heading as="h2" className="!text-gray-600">
                  Questions
                </Heading>
                <div className="flex items-center justify-between gap-5 self-stretch">
                  <Heading as="h3">How many years of experience you have?</Heading>
                  <Img src="images/img_path.svg" alt="path" className="mb-1.5 h-[6px] self-end" />
                </div>
                <Heading as="h4">2</Heading>
                <div className="flex items-center justify-between gap-5 self-stretch">
                  <Heading as="h5">How many hours can you work per week?</Heading>
                  <Img src="images/img_path.svg" alt="path" className="mb-[5px] h-[6px] self-end" />
                </div>
              </div>
            </div>
            <div className="mt-[67px] flex items-center justify-between gap-5 self-stretch">
              <Heading as="h6" className="!text-light_blue-700">
                Cancel
              </Heading>
              <Link to="/screeningtesteight">
                <Button size="xl" shape="round" className="min-w-[246px] font-bold sm:px-5">
                  Finalise Test
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
