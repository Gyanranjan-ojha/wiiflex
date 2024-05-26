import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button, Heading, Text, Img } from "../../components";
import Header from "../../components/Header";

export default function ScreeningtestOnePage() {
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
        <div className="flex w-[94%] items-start justify-between gap-5 md:w-full md:flex-col md:p-5">
          <div className="flex w-[53%] flex-col items-start justify-center gap-[131px] bg-blue-100 pb-[137px] pl-[159px] pr-14 pt-[62px] md:w-full md:gap-[98px] md:p-5 sm:gap-[65px]">
            <Heading size="6xl" as="h1" className="ml-[31px] !text-white-A700 md:ml-0">
              Connect. Merge. Work
            </Heading>
            <Img src="images/img_abstraction.png" alt="abstraction" className="h-[685px] w-[86%] object-cover" />
          </div>
          <div className="mt-[274px] flex w-[42%] flex-col items-center md:w-full">
            <Heading size="3xl" as="h2" className="!text-teal-900">
              Add Screening Tests
            </Heading>
            <div className="mt-[25px] self-stretch pb-[18px]">
              <Text as="p" className="leading-[21px] !text-gray-600_01">
                <>
                  You can add screening test for the candidates. If they pass, they will be welcome to have an interview
                  in the next round.
                </>
              </Text>
            </div>
            <div className="mt-[61px] flex w-[47%] items-center justify-between gap-5 md:w-full">
              <Heading as="h3" className="!text-light_blue-700">
                Cancel
              </Heading>
              <Link to="/screeningtesttwo">
                <Button size="xl" shape="round" className="min-w-[246px] font-bold sm:px-5">
                  Yes
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
