import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button, Heading, Text, Img } from "../../components";
import Header from "../../components/Header";

export default function CandidatePage() {
  return (
    <>
      <Helmet>
        <title>WIIFLEX</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet>
      <div className="flex w-full flex-col items-center gap-5 bg-white-A700 pt-[21px] sm:pt-5">
        <header className="flex flex-col items-center gap-[13px] self-stretch">
          <div className="container-xs flex items-end justify-between gap-5 md:flex-col md:p-5">
            <Img
              src="images/img_wiiflex_softwar.png"
              alt="wiiflexsoftwar"
              className="mt-[7px] h-[50px] w-[9%] object-cover md:w-full"
            />
            <ul className="!mb-2 flex items-start gap-[25px] sm:flex-col">
              <li>
                <a href="#">
                  <div className="flex flex-col gap-1.5">
                    <Heading size="xl" as="h6" className="!text-light_blue-700">
                      Active Jobs
                    </Heading>
                    <div className="h-[2px] bg-light_blue-700" />
                  </div>
                </a>
              </li>
              <li>
                <a href="#" className="cursor-pointer">
                  <Text as="p" className="!text-gray-800 hover:font-bold hover:!text-light_blue-700">
                    Archived
                  </Text>
                </a>
              </li>
              <li>
                <a href="#" className="cursor-pointer">
                  <Text as="p" className="!text-gray-800 hover:font-bold hover:!text-light_blue-700">
                    Saved Candidates
                  </Text>
                </a>
              </li>
              <li>
                <a href="#" className="cursor-pointer">
                  <Text as="p" className="!text-gray-800 hover:font-bold hover:!text-light_blue-700">
                    Interviews
                  </Text>
                </a>
              </li>
              <li>
                <a href="#" className="cursor-pointer">
                  <Text as="p" className="!text-gray-800 hover:font-bold hover:!text-light_blue-700">
                    Message
                  </Text>
                </a>
              </li>
            </ul>
            <div className="flex w-[20%] items-center justify-between gap-5 md:w-full">
              <Button size="4xl" className="min-w-[120px] rounded-[25px] font-dmsans font-medium sm:px-5">
                Post Job
              </Button>
              <a href="#">
                <Img src="images/img_shape.svg" alt="shape" className="mb-3 h-[20px] self-end" />
              </a>
              <div className="flex items-center">
                <div className="flex flex-col rounded-[23px] bg-gray-200">
                  <a href="#">
                    <Img src="images/img_rectangle.png" alt="image" className="h-[46px] rounded-[22px] object-cover" />
                  </a>
                </div>
                {/* <Text as="p" className="ml-2.5 !text-gray-800_02">
                    John Smith
                    {firstName} {lastName}
                    </Text>
                  <Img src="images/img_keyboard_arrow_down.svg" alt="keyboardarrow" className="ml-[7px] h-[20px]" /> */}
                  <Header />
              </div>
            </div>
          </div>
          <div className="h-px w-full self-stretch bg-gray-500_19" />
        </header>
        <div className="flex w-[41%] flex-col items-end gap-[428px] md:w-full md:gap-[321px] md:p-5 sm:gap-[214px]">
          <div className="flex w-[89%] items-start justify-center gap-3.5 rounded border-[0.5px] border-solid border-gray-200_03 bg-white-A700 pb-[31px] pl-3.5 pr-4 pt-4 md:w-full md:flex-col sm:pb-5">
            <div className="w-[9%] rounded-[30px] bg-gray-100_02 md:w-full md:p-5">
              <Img src="images/img_9650.png" alt="circleimage" className="h-[58px] rounded-[50%]" />
            </div>
            <div className="flex flex-1 flex-col items-start md:self-stretch">
              <div className="flex items-start justify-between gap-5 self-stretch">
                <Heading as="h1" className="mt-2 !text-light_blue-700">
                  John Doe
                </Heading>
                <div className="flex items-center gap-[18px]">
                  <Img src="images/img_favorite.svg" alt="favorite" className="h-[15px] w-[16px] self-start" />
                  <div className="h-full w-[4px] bg-black-900" />
                </div>
              </div>
              <Text size="s" as="p" className="mt-2 !text-gray-800_01">
                <span className="text-gray-800_01">
                  Had 5 years of working experience as design lead. Working for a reputated com..&nbsp;
                </span>
                <span className="font-semibold text-gray-800_01">See More</span>
              </Text>
              <div className="mt-[18px] flex w-[31%] items-center justify-between gap-5 md:w-full">
                <div className="flex flex-col items-start pt-px">
                  <Text size="xs" as="p">
                    City
                  </Text>
                  <Heading as="h2" className="self-center">
                    BEN
                  </Heading>
                </div>
                <div className="flex flex-col items-start">
                  <Text size="xs" as="p">
                    State
                  </Text>
                  <Heading as="h3" className="h-[20px] w-[21px]">
                    KA
                  </Heading>
                </div>
                <div className="flex flex-col items-start pt-px">
                  <Text size="xs" as="p">
                    Country
                  </Text>
                  <Heading as="h4">INDIA</Heading>
                </div>
              </div>
              <Heading size="s" as="h5" className="mt-5 !text-gray-800_01">
                Applicant Video:
              </Heading>
              <div className="relative mt-2 h-[309px] self-stretch md:h-auto">
                <div className="h-[192px] w-[62%] rounded border-[0.5px] border-solid border-gray-200_03 bg-white-A700" />
                <div className="absolute bottom-0 left-0 right-0 top-0 m-auto h-max w-full rounded-tl-[3px] rounded-tr-[3px] bg-gray-100_01 pl-[38px] pr-[79px] md:pr-5 sm:px-5">
                  <div className="relative h-[309px] md:h-auto">
                    <Img
                      src="images/img_9650_2x_removebg_preview.png"
                      alt="96502x"
                      className="h-[309px] w-full rounded-tl-[3px] rounded-tr-[3px] object-cover"
                    />
                    <Button size="3xl" shape="square" className="absolute bottom-0 right-[40%] top-0 my-auto w-[50px]">
                      <Img src="images/img_icons8_circled_play.svg" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="mt-[19px] flex w-[45%] flex-col items-start gap-[9px] md:w-full">
                <Heading size="s" as="h6" className="!text-gray-800_01">
                  Skills
                </Heading>
                <div className="flex gap-2.5 self-stretch">
                  <Button
                    color="white_A700"
                    className="w-full flex-1 rounded-[17px] border-[0.5px] border-solid border-gray-200_03"
                  >
                    Sketch
                  </Button>
                  <Button
                    color="white_A700"
                    className="w-full flex-1 rounded-[17px] border-[0.5px] border-solid border-gray-200_03"
                  >
                    Indesign
                  </Button>
                  <Button
                    color="white_A700"
                    className="min-w-[98px] rounded-[17px] border-[0.5px] border-solid border-gray-200_03"
                  >
                    Adobe
                  </Button>
                </div>
              </div>
              <div className="mt-[29px] flex w-[84%] md:w-full">
                <div className="flex w-full flex-col items-start">
                  <Heading size="s" as="p" className="!text-gray-800_01">
                    Applicant Note:
                  </Heading>
                  <Text size="s" as="p" className="mt-2 w-[74%] leading-[19px] !text-gray-800_01 md:w-full">
                    <>
                      Just saw your job application. I think i am perfect fit for <br />
                      all your requirements and can start from your desired time. Lets talk in details in a interview.
                    </>
                  </Text>
                  <div className="mt-5 flex items-center justify-between gap-5 self-stretch">
                    <Link to="/viewresume">
                      <Heading as="p" className="mb-2.5 self-end !text-light_blue-700 underline">
                        See Resume
                      </Heading>
                    </Link>
                    <Button size="xl" shape="round" className="min-w-[300px] font-bold sm:px-5">
                      Schedule Interview
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mr-[34px] flex gap-[30px] self-stretch md:mr-0">
            <Button
              color="white_A700"
              size="xl"
              shape="round"
              className="w-full border-[0.5px] border-solid border-light_blue-700 font-bold !text-light_blue-700 sm:px-5"
            >
              Edit Resume
            </Button>
            <Button size="xl" shape="round" className="w-full font-bold sm:px-5">
              Save and Continue
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
