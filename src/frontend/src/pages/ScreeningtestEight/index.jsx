import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button, Heading, Img, Text, Input, SelectBox } from "../../components";

const dropDownOptions = [
  { label: "Option1", value: "option1" },
  { label: "Option2", value: "option2" },
  { label: "Option3", value: "option3" },
];

export default function ScreeningtestEightPage() {
  return (
    <>
      <Helmet>
        <title>WIIFLEX</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet>
      <div className="flex w-full flex-col items-center gap-[59px] bg-white-A700 pt-[21px] sm:gap-[29px] sm:pt-5">
        <header className="flex flex-col items-center gap-[13px] self-stretch">
          <div className="mx-auto flex w-full max-w-[1853px] items-end md:flex-col md:p-5">
            <Img
              src="images/img_wiiflex_softwar.png"
              alt="wiiflexsoftwar"
              className="mt-[7px] h-[50px] w-[10%] object-cover md:w-full"
            />
            <ul className="!mb-2 !ml-[485px] flex items-start gap-[25px] md:ml-0 md:flex-col">
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
              <li>
                <a href="#" className="cursor-pointer">
                  <Text as="p" className="!text-gray-800 hover:font-bold hover:!text-light_blue-700">
                    Advanced Search
                  </Text>
                </a>
              </li>
            </ul>
            <div className="ml-[221px] flex items-center md:ml-0 sm:flex-col">
              <Button size="4xl" className="min-w-[120px] rounded-[25px] font-dmsans font-medium sm:px-5">
                Post Job
              </Button>
              <a href="#">
                <Img
                  src="images/img_shape.svg"
                  alt="shape"
                  className="mb-3 ml-10 h-[20px] self-end sm:ml-0 sm:w-full"
                />
              </a>
              <div className="ml-[41px] flex flex-col rounded-[23px] bg-gray-200 sm:ml-0">
                <a href="#">
                  <Img src="images/img_rectangle.png" alt="image" className="h-[46px] rounded-[22px] object-cover" />
                </a>
              </div>
              <Text as="p" className="ml-2.5 !text-gray-800_02 sm:ml-0">
                John Smith
              </Text>
            </div>
          </div>
          <div className="h-px w-full self-stretch bg-gray-500_19" />
        </header>
        <div className="flex w-[39%] flex-col items-end md:w-full md:p-5">
          <Heading size="3xl" as="h1" className="mr-[178px] !text-teal-900 md:mr-0">
            Send Screening Tests
          </Heading>
          <div className="mr-[131px] mt-[27px] w-[60%] md:mr-0 md:w-full">
            <div className="flex flex-col items-start gap-1">
              <Text size="xs" as="p">
                Number of rounds
              </Text>
              <SelectBox size="sm" shape="square" name="dropdown" options={dropDownOptions} className="self-stretch" />
            </div>
            <div className="mt-3 flex gap-5">
              <Input
                type="text"
                name="name"
                placeholder={`Round one name`}
                className="h-[70px] w-full rounded border-[0.5px] border-gray-200_03 pl-3.5 pr-[35px] text-sm font-bold text-cyan-900 sm:pr-5"
              >
                Test one
              </Input>
              <div className="flex w-full flex-col items-start gap-[11px] rounded border-[0.5px] border-solid border-gray-200_03 bg-white-A700 pb-1.5 pl-3.5 pr-[11px] pt-[13px]">
                <Text size="xs" as="p">
                  Round one type
                </Text>
                <div className="flex items-start justify-between gap-5 self-stretch">
                  <Heading as="h2">Screening test</Heading>
                  <Img src="images/img_path.svg" alt="path" className="mt-1.5 h-[6px]" />
                </div>
              </div>
            </div>
            <div className="mt-3 flex flex-col items-start gap-0.5">
              <Text size="xs" as="p">
                Select screening test
              </Text>
              <SelectBox
                size="md"
                shape="round"
                indicator={<Img src="images/img_path.svg" alt="path" className="h-[6px] w-[12px]" />}
                name="iosdeveloper"
                placeholder={`iOS developer screening test `}
                options={dropDownOptions}
                className="gap-px self-stretch border-[0.5px] border-solid border-gray-200_03 font-bold sm:pr-5"
              />
            </div>
            <div className="mt-5">
              <div className="flex flex-col gap-3">
                <div className="flex gap-5">
                  <Input
                    type="text"
                    name="name"
                    placeholder={`Round two name`}
                    className="h-[70px] w-full rounded border-[0.5px] border-gray-200_03 pl-3.5 pr-[35px] text-sm font-bold text-cyan-900 sm:pr-5"
                  >
                    Test two
                  </Input>
                  <div className="flex w-full flex-col items-start gap-[9px] rounded border-[0.5px] border-solid border-gray-200_03 bg-white-A700 pb-2 pl-3.5 pr-[11px] pt-[13px]">
                    <Text size="xs" as="p">
                      Round two type
                    </Text>
                    <div className="flex items-center justify-between gap-5 self-stretch">
                      <Heading as="h3">Video</Heading>
                      <Img src="images/img_path.svg" alt="path" className="mb-1.5 h-[6px] self-end" />
                    </div>
                  </div>
                </div>
                <div className="flex gap-5">
                  <Input
                    type="text"
                    name="name"
                    placeholder={`Round three name`}
                    className="h-[70px] w-full rounded border-[0.5px] border-gray-200_03 pl-3.5 pr-[35px] text-sm font-bold text-cyan-900 sm:pr-5"
                  >
                    Test three
                  </Input>
                  <div className="flex w-full flex-col items-start gap-[9px] rounded border-[0.5px] border-solid border-gray-200_03 bg-white-A700 pb-2 pl-3.5 pr-[11px] pt-[13px]">
                    <Text size="xs" as="p">
                      Round three type
                    </Text>
                    <div className="flex items-center justify-between gap-5 self-stretch">
                      <Heading as="h4">Video</Heading>
                      <Img src="images/img_path.svg" alt="path" className="mb-1.5 h-[6px] self-end" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mr-[136px] mt-[81px] flex w-[58%] gap-[9px] md:mr-0 md:w-full sm:flex-col">
            <div className="flex px-3 pb-[9px] pt-3">
              <Heading size="lg" as="h2" className="!text-light_blue-700">
                Cancel
              </Heading>
            </div>
            <Link to="/homepage">
              <Button size="xl" shape="round" className="min-w-[175px] font-bold sm:px-5">
                Send Test
              </Button>
            </Link>
          </div>
          <div className="mt-[576px] flex gap-[30px] self-stretch">
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
