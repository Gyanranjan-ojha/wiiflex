import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Button, Heading, Text, Img } from "../../components";
import C24HomepagePagination from "../../components/C24HomepagePagination";
import Header from "../../components/Header";

export default function HomepagePage() {
  return (
    <>
      <Helmet>
        <title>WIIFLEX</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet>
      <div className="flex w-full flex-col items-center gap-[22px] bg-white-A700 pt-[21px] sm:pt-5">
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
              <Link to="/createjob">
                <Button size="4xl" className="min-w-[120px] rounded-[25px] font-dmsans font-medium sm:px-5">
                  Post Job
                </Button>
              </Link>
              <a href="#">
                <Img src="images/img_shape.svg" alt="shape" className="mb-3 h-[20px] self-end" />
              </a>
              <div className="flex items-center">
                <div className="flex flex-col rounded-[23px] bg-gray-200">
                  <a href="#">
                    <Img src="images/img_rectangle.png" alt="image" className="h-[46px] rounded-[22px] object-cover" />
                  </a>
                </div>
                <div>
                  {/* <Text as="p" className="ml-2.5 !text-gray-800_02">
                    John Smith
                    {firstName} {lastName}
                    </Text>
                  <Img src="images/img_keyboard_arrow_down.svg" alt="keyboardarrow" className="ml-[7px] h-[20px]" /> */}
                  <Header />
                </div>
              </div>
            </div>
          </div>
          <div className="h-px w-full self-stretch bg-gray-500_19" />
        </header>
        <div className="flex w-[41%] flex-col items-end gap-[301px] md:w-full md:gap-[225px] md:p-5 sm:gap-[150px]">
          <div className="flex w-[89%] flex-col items-center md:w-full">
            <div className="flex flex-col items-start self-stretch">
              <div className="flex w-[94%] items-start justify-between gap-5 md:w-full">
                <Heading size="2xl" as="h1">
                  Senior UI Designer needed
                </Heading>
                {/* <div className="h-[16px] w-[4px] bg-black-900" /> */}
              </div>
              <Text as="p" className="mt-1.5 w-full leading-[21px] !text-gray-800_02">
                <span className="text-gray-800_02">
                  <>
                    Our company Microsoft is looking for a senior UI and UX lead designer to take over March, 2020.
                    <br />
                    <br />
                  </>
                </span>
                <span className="font-bold text-gray-800_02">
                  <>
                    Requirements:
                    <br />
                  </>
                </span>
                <span className="text-gray-800_02">
                  <>
                    - 5 years Experience
                    <br />- Team Leader
                    <br />- Innovative and Creative eye
                  </>
                </span>
              </Text>
              <div className="mt-[19px] flex w-[90%] items-center gap-1.5 md:w-full sm:flex-col">
                <Heading size="s" as="h2" className="!text-teal-900">
                  Skills -
                </Heading>
                <Button color="teal_900" className="w-full flex-1 rounded-[17px] sm:self-stretch">
                  Adobe XD
                </Button>
                <Button color="teal_900" className="w-full flex-1 rounded-[17px] sm:self-stretch">
                  Sketch Pro
                </Button>
                <Button color="teal_900" className="w-full flex-1 rounded-[17px] sm:self-stretch">
                  Adobe XD
                </Button>
                <Button color="teal_900" className="w-full flex-1 rounded-[17px] sm:self-stretch">
                  Sketch Pro
                </Button>
              </div>
              <div className="mt-[19px] flex justify-between gap-5 self-stretch">
                <div className="flex">
                  <Heading size="s" as="h3" className="!text-teal-900">
                    Location -
                  </Heading>
                  <Heading size="s" as="h4" className="h-[17px] w-[18px] !text-teal-900">
                    NY
                  </Heading>
                  <div className="ml-[54px] flex">
                    <Heading size="s" as="h5" className="!text-teal-900">
                      Type - In-house
                    </Heading>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-1">
                  <Heading size="s" as="h6" className="self-end !text-teal-900">
                    Salary
                  </Heading>
                  <Heading size="s" as="p" className="!text-teal-900">
                    - 50-60k
                  </Heading>
                </div>
              </div>
              <div className="mt-[18px] h-px self-stretch bg-gray-500_47" />
            </div>
            <Heading as="p" className="ml-[5px] mt-[9px] self-start !text-light_blue-700 md:ml-0">
              Candidates
            </Heading>
            <div className="mt-2.5 grid grid-cols-2 justify-center gap-[21px] self-stretch md:grid-cols-1">
              <div className="flex w-full flex-col items-start rounded border-[0.5px] border-solid border-gray-200_03 bg-white-A700 pb-2 pl-3.5 pr-[13px] pt-3.5">
                <div className="flex items-start gap-[17px] self-stretch">
                  <Img
                    src="images/img_bitmap.png"
                    alt="steve_morgan"
                    className="mt-1.5 h-[60px] w-[60px] object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex flex-col gap-[7px]">
                      <div className="flex items-center justify-between gap-5">
                        <Link to="/candidate">
                          <Heading as="p" className="self-end !text-light_blue-700">
                            Steve Morgan
                          </Heading>
                        </Link>
                        <div className="flex items-center gap-5">
                          <Img src="images/img_favorite.svg" alt="steve_morgan" className="h-[15px] w-[16px]" />
                          <Button size="md" shape="circle" className="w-[30px] !rounded-[15px]">
                            <Img src="images/img_television.svg" />
                          </Button>
                        </div>
                      </div>
                      <Text size="s" as="p" className="leading-[19px] !text-gray-800_01">
                        <span className="text-gray-800_01">
                          Had 5 years of working experience as design lead. Working for a reputated com..&nbsp;
                        </span>
                        <span className="font-semibold text-gray-800_01">See More</span>
                      </Text>
                    </div>
                  </div>
                </div>
                <div className="mt-[30px] flex flex-wrap">
                  <Text size="xs" as="p" className="self-start !text-gray-800_01">
                    Location -
                  </Text>
                  <Heading size="s" as="p" className="ml-[5px] h-[18px] w-[18px] self-start !text-teal-900">
                    NY
                  </Heading>
                  <Text size="xs" as="p" className="ml-[54px] self-end !text-gray-800_01">
                    Type -
                  </Text>
                  <Heading size="s" as="p" className="self-start !text-gray-800_01">
                    Remote
                  </Heading>
                </div>
                <div className="mt-[13px] h-[2px] self-stretch bg-gray-500_33" />
                <div className="mt-[15px] flex w-[95%] flex-col items-start gap-[9px] md:w-full">
                  <Heading size="s" as="p" className="!text-gray-800_01">
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
                      className="min-w-[82px] rounded-[17px] border-[0.5px] border-solid border-gray-200_03"
                    >
                      Adobe
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex w-full flex-col gap-[15px] rounded border-[0.5px] border-solid border-gray-200_03 bg-white-A700 pb-2 pl-4 pr-[13px] pt-3.5">
                <div>
                  <div className="flex flex-col items-start">
                    <div className="flex items-start gap-[13px] self-stretch">
                      <Img
                        src="images/img_bitmap_60x60.png"
                        alt="bitmap"
                        className="mt-[11px] h-[60px] w-[60px] object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex flex-col gap-[7px]">
                          <div className="flex items-center self-start">
                            <Link to="/candidate">
                              <Heading as="p" className="self-end !text-light_blue-700">
                                Dusana Semenov
                              </Heading>
                            </Link>
                            <Img
                              src="images/img_favorite_light_blue_700.svg"
                              alt="favorite"
                              className="ml-[50px] h-[15px] w-[16px]"
                            />
                            <Button size="md" shape="circle" className="ml-3 w-[30px] !rounded-[15px]">
                              <Img src="images/img_television.svg" />
                            </Button>
                          </div>
                          <Text size="s" as="p" className="leading-[19px] !text-gray-800_01">
                            <span className="text-gray-800_01">
                              Had 5 years of working experience as design lead. Working for a reputated com..&nbsp;
                            </span>
                            <span className="font-semibold text-gray-800_01">See More</span>
                          </Text>
                        </div>
                      </div>
                    </div>
                    <div className="mt-[30px] flex flex-wrap">
                      <Text size="xs" as="p" className="self-start !text-gray-800_01">
                        Location -
                      </Text>
                      <Heading size="s" as="p" className="ml-[5px] h-[18px] w-[18px] self-start !text-teal-900">
                        NY
                      </Heading>
                      <Text size="xs" as="p" className="ml-[54px] self-end !text-gray-800_01">
                        Type -
                      </Text>
                      <Heading size="s" as="p" className="self-start !text-gray-800_01">
                        Remote
                      </Heading>
                    </div>
                    <div className="mt-[13px] h-[2px] w-full self-stretch bg-gray-500_33" />
                  </div>
                </div>
                <div className="flex w-[86%] flex-col items-start gap-[9px] md:w-full">
                  <Heading size="s" as="p" className="!text-gray-800_01">
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
                      className="min-w-[82px] rounded-[17px] border-[0.5px] border-solid border-gray-200_03"
                    >
                      Adobe
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex w-full justify-center rounded border-[0.5px] border-solid border-gray-200_03 bg-white-A700 pb-2 pl-3.5 pr-[13px] pt-3.5">
                <div className="flex w-full flex-col gap-[13px]">
                  <div className="flex flex-col gap-[30px]">
                    <div className="flex items-start gap-[17px]">
                      <Img src="images/img_bitmap.png" alt="bitmap" className="mt-1.5 h-[60px] w-[60px] object-cover" />
                      <div className="flex-1">
                        <div className="flex flex-col gap-[7px]">
                          <div className="flex items-center justify-between gap-5">
                            <Link to="/candidate">
                              <Heading as="p" className="self-end !text-light_blue-700">
                                Steve Morgan
                              </Heading>
                            </Link>
                            <div className="flex items-start gap-5">
                              <Img src="images/img_favorite.svg" alt="favorite" className="mt-1.5 h-[15px] w-[16px]" />
                              <Button size="md" shape="circle" className="w-[30px] !rounded-[15px]">
                                <Img src="images/img_television.svg" />
                              </Button>
                            </div>
                          </div>
                          <Text size="s" as="p" className="leading-[19px] !text-gray-800_01">
                            <span className="text-gray-800_01">
                              Had 5 years of working experience as design lead. Working for a reputated com..&nbsp;
                            </span>
                            <span className="font-semibold text-gray-800_01">See More</span>
                          </Text>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap">
                      <Text size="xs" as="p" className="self-start !text-gray-800_01">
                        Location -
                      </Text>
                      <Heading size="s" as="p" className="ml-[5px] h-[18px] w-[18px] self-start !text-teal-900">
                        NY
                      </Heading>
                      <Text size="xs" as="p" className="ml-[54px] self-end !text-gray-800_01">
                        Type -
                      </Text>
                      <Heading size="s" as="p" className="self-start !text-gray-800_01">
                        Remote
                      </Heading>
                    </div>
                  </div>
                  <div className="flex flex-col items-start gap-[15px]">
                    <div className="h-[2px] w-full self-stretch bg-gray-500_33" />
                    <div className="flex w-[86%] flex-col items-start gap-[9px] md:w-full">
                      <Heading size="s" as="p" className="!text-gray-800_01">
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
                          className="min-w-[82px] rounded-[17px] border-[0.5px] border-solid border-gray-200_03"
                        >
                          Adobe
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex w-full flex-col rounded border-[0.5px] border-solid border-gray-200_03 bg-white-A700 pb-2 pl-4 pr-[13px] pt-3.5">
                <div className="flex items-start gap-[13px]">
                  <Img
                    src="images/img_bitmap_60x60.png"
                    alt="bitmap"
                    className="mt-[11px] h-[60px] w-[60px] object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex flex-col gap-[7px]">
                      <div className="flex items-start self-start">
                        <Link to="/candidate">
                          <Heading as="p" className="!text-light_blue-700">
                            Dusana Semenov
                          </Heading>
                        </Link>
                        <Img
                          src="images/img_favorite.svg"
                          alt="favorite"
                          className="ml-[50px] mt-1.5 h-[15px] w-[16px]"
                        />
                        <Button size="md" shape="circle" className="ml-3 w-[30px] !rounded-[15px]">
                          <Img src="images/img_television.svg" />
                        </Button>
                      </div>
                      <Text size="s" as="p" className="leading-[19px] !text-gray-800_01">
                        <span className="text-gray-800_01">
                          Had 5 years of working experience as design lead. Working for a reputated com..&nbsp;
                        </span>
                        <span className="font-semibold text-gray-800_01">See More</span>
                      </Text>
                    </div>
                  </div>
                </div>
                <div className="mt-[30px]">
                  <div className="flex flex-col items-start gap-[13px]">
                    <div className="flex flex-wrap">
                      <Text size="xs" as="p" className="self-start !text-gray-800_01">
                        Location -
                      </Text>
                      <Heading size="s" as="p" className="ml-[5px] h-[18px] w-[18px] self-start !text-teal-900">
                        NY
                      </Heading>
                      <Text size="xs" as="p" className="ml-[54px] self-end !text-gray-800_01">
                        Type -
                      </Text>
                      <Heading size="s" as="p" className="self-start !text-gray-800_01">
                        Remote
                      </Heading>
                    </div>
                    <div className="h-[2px] w-full self-stretch bg-gray-500_33" />
                  </div>
                </div>
                <div className="mt-[15px] flex w-[86%] md:w-full">
                  <div className="flex w-full flex-col items-start gap-[9px]">
                    <Heading size="s" as="p" className="!text-gray-800_01">
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
                        className="min-w-[82px] rounded-[17px] border-[0.5px] border-solid border-gray-200_03"
                      >
                        Adobe
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <C24HomepagePagination />
          </div>
          <div className="mr-[35px] flex gap-[30px] self-stretch md:mr-0">
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
