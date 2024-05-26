import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button, Heading, Text, Img } from "../../components";
import C26ViewResumeColumn from "../../components/C26ViewResumeColumn";
import C26ViewResumeStackjobtitle from "../../components/C26ViewResumeStackjobtitle";
import Header from "../../components/Header";

export default function ViewResumePage() {
  return (
    <>
      <Helmet>
        <title>WIIFLEX</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet>
      <div className="flex w-full flex-col items-center gap-[57px] bg-white-A700 pb-[26px] pt-6 sm:gap-7 sm:py-5">
        <header className="self-stretch">
          <div className="flex flex-col gap-[13px]">
            <div className="mx-auto flex w-full max-w-[1878px] items-start justify-between gap-5 md:p-5">
              <Img src="images/img_wiiflex_softwar.png" alt="wiiflexsoftwar" className="h-[50px] w-[6%] object-cover" />
              <div className="flex w-[9%] items-center justify-center">
                <div className="h-[46px] w-[46px] rounded-[23px] bg-gray-200" />
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
            <div className="h-px bg-gray-500_19" />
          </div>
        </header>
        <div className="mx-auto flex w-full max-w-[1484px] flex-col items-start gap-[37px] md:p-5">
          <div className="h-[2px] w-full self-stretch bg-light_blue-700" />
          <div className="flex items-start self-stretch md:flex-col">
            <div className="flex w-[17%] flex-col items-start md:w-full">
              <div className="flex w-[70%] flex-col items-start gap-[19px] md:w-full">
                <div className="self-stretch rounded-lg bg-gray-100_01 pt-[11px]">
                  <Img
                    src="images/img_9650_2x_removebg_preview_144x155.png"
                    alt="96502x"
                    className="h-[144px] w-full rounded-lg object-cover md:h-auto"
                  />
                </div>
                <Heading size="2xl" as="h1" className="!text-light_blue-700">
                  John Doe
                </Heading>
              </div>
              <div className="mt-[39px] flex flex-col items-start gap-[11px]">
                <Text size="xs" as="p" className="!text-teal-900_cc">
                  Location
                </Text>
                <Heading as="h2">Bengaluru</Heading>
              </div>
              <div className="mt-5 flex flex-col items-start gap-[11px]">
                <Text size="xs" as="p" className="!text-teal-900_cc">
                  Email
                </Text>
                <Heading as="h3">Johndoe@gmail.com</Heading>
              </div>
              <div className="mt-5 flex flex-col items-start gap-1">
                <Text size="xs" as="p" className="!text-teal-900_cc">
                  Phone
                </Text>
                <div className="flex flex-wrap gap-[11px]">
                  <Img src="images/img_close.svg" alt="close" className="h-[21px] self-start" />
                  <Heading as="h4" className="self-end">
                    (+91)
                  </Heading>
                  <Heading as="h5" className="self-end">
                  </Heading>
                </div>
              </div>
              <div className="mt-5 h-px w-full rotate-[-90deg] self-stretch bg-gray-500_1e" />
              <div className="mt-[19px] flex w-[87%] flex-col items-start gap-3.5 md:w-full">
                <Heading size="s" as="h6">
                  Skills
                </Heading>
                <div className="flex gap-2.5 self-stretch">
                  <Button color="teal_900" className="w-full rounded-[17px]">
                    Focused
                  </Button>
                  <Button color="teal_900" className="w-full rounded-[17px]">
                    Doctor
                  </Button>
                </div>
              </div>
            </div>
            <div className="ml-[27px] h-[1094px] w-px bg-gray-500_1e md:ml-0 md:h-px md:w-[1094px]" />
            <div className="ml-[51px] flex w-[57%] flex-col md:ml-0 md:w-full">
              <div className="flex w-[91%] flex-col items-start gap-2 md:w-full">
                <Heading size="xl" as="h6" className="!text-light_blue-700">
                  Professional Summary
                </Heading>
                <Text as="p" className="w-full leading-6 !text-gray-800_02">
                  <>
                    Been working as a lead consultancy in RealEstate for last 5 years. Lorem Ipsum is simply dummy text
                    of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy
                    text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries, but also the leap into electronic
                    typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of
                    Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions.
                    <br />
                    <br /> of Lorem Ipsum.
                  </>
                </Text>
              </div>
              <div className="mt-[11px] flex flex-col gap-[19px]">
                <div className="flex">
                  <Heading size="xl" as="h6" className="!text-light_blue-700">
                    Work History
                  </Heading>
                </div>
                <div className="flex gap-5 md:flex-col">
                  {[...Array(2)].map((d, index) => (
                    <C26ViewResumeStackjobtitle
                      jobtitle="Job Title"
                      freelanceconsultant="Freelance Consultant"
                      position="Position"
                      seniorconsultant="Senior Consultant"
                      employername="Employer name"
                      microsoft="Microsoft"
                      city="City"
                      ny="NY"
                      state="State"
                      nyOne="NY"
                      startdate="Start Date"
                      jancounter="jan 2016"
                      enddate="End Date"
                      jancounter1="Jan 2020"
                      workdetails="Work Details"
                      duration="<>Senior Consultant for last 2 years. Managed all<br />the HR programs.</>"
                      key={"listjobtitle" + index}
                    />
                  ))}
                </div>
              </div>
              <div className="mt-[22px] flex flex-col items-start gap-[19px]">
                <Heading size="xl" as="h6" className="!text-light_blue-700">
                  Education
                </Heading>
                <div className="flex gap-7 self-stretch md:flex-col">
                  {[...Array(2)].map((d, index) => (
                    <C26ViewResumeColumn
                      schoolname="School Name"
                      universityname="UIU"
                      schoollocation="School Location"
                      city="NY"
                      degreelevel="Degree Level"
                      highschooldiploma="High School Diploma"
                      degreefield="Degree Field"
                      highschooldiplomaone="High School Diploma"
                      startdate="Start Date"
                      jancounter="jan 2016"
                      enddate="End Date"
                      jancounter1="Jan 2020"
                      education="Education Details"
                      cmopletedmy="Cmopleted my graduation deploma there."
                      key={"listschoolname" + index}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="ml-[19px] h-[788px] w-[2px] bg-gray-500_1e md:ml-0 md:h-[2px] md:w-[788px]" />
            <div className="ml-[30px] flex w-[27%] flex-col items-start md:ml-0 md:w-full">
              <Heading size="xl" as="h6" className="!text-light_blue-700">
                Accomplishments
              </Heading>
              <div className="mt-3 self-stretch rounded border-[0.5px] border-solid border-gray-200_03 bg-white-A700 pb-[15px] pl-[11px] pr-2 pt-[11px]">
                <Text as="p" className="leading-[25px] !text-blue_gray-700">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                  industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type
                  and scrambled it to make a type specimenbook.
                </Text>
              </div>
              <Heading size="xl" as="h6" className="mt-[22px] !text-light_blue-700">
                Certifications
              </Heading>
              <div className="mt-3.5 self-stretch rounded border-[0.5px] border-solid border-gray-200_03 bg-white-A700 px-2.5 pb-3 pt-[15px]">
                <div className="flex flex-col items-start">
                  <Text size="xs" as="p">
                    Certificate name
                  </Text>
                  <Heading as="p">Microsoft Excel Certification</Heading>
                  <Text size="xs" as="p" className="mt-[13px]">
                    Certified By
                  </Text>
                  <Heading as="p">Microsoft</Heading>
                  <div className="mt-3.5 flex w-[78%] items-center justify-between gap-5 md:w-full">
                    <div className="flex flex-col">
                      <Text size="xs" as="p">
                        Start Date
                      </Text>
                      <Heading as="p">Jan 2016</Heading>
                    </div>
                    <div className="flex flex-col items-start">
                      <Text size="xs" as="p">
                        End Date
                      </Text>
                      <Heading as="p">Jan 2020</Heading>
                    </div>
                  </div>
                  <div className="mt-[13px] h-px w-full self-stretch bg-gray-500_33" />
                  <div className="mt-3 flex flex-col items-start gap-2.5">
                    <Heading size="s" as="p">
                      Add Details
                    </Heading>
                    <Text as="p" className="!text-blue_gray-700">
                      Completed my MS Word diploma here.
                    </Text>
                  </div>
                </div>
              </div>
              <Heading size="xl" as="h6" className="mt-[15px] !text-light_blue-700">
                Software
              </Heading>
              <div className="mt-3.5 flex gap-[18px]">
                <Button color="teal_900" className="min-w-[102px] rounded-[17px]">
                  Adobe XD
                </Button>
                <Button color="teal_900" className="min-w-[111px] rounded-[17px]">
                  Sketch Pro
                </Button>
              </div>
              <Heading size="xl" as="h6" className="mt-[17px] !text-light_blue-700">
                language
              </Heading>
              <div className="mt-[11px] flex gap-[18px]">
                <Button color="teal_900" className="min-w-[102px] rounded-[17px] sm:px-5">
                  English
                </Button>
                <Button color="teal_900" className="min-w-[111px] rounded-[17px] sm:px-5">
                  French
                </Button>
              </div>
              <Heading size="xl" as="h6" className="mt-[15px] !text-light_blue-700">
                Interests
              </Heading>
              <div className="mt-[13px] flex gap-[18px]">
                <Button color="teal_900" className="min-w-[102px] rounded-[17px] sm:px-5">
                  Cycling
                </Button>
                <Button color="teal_900" className="min-w-[89px] rounded-[17px] sm:px-5">
                  Music
                </Button>
              </div>
            </div>
          </div>
          <div className="ml-[311px] flex gap-6 md:ml-0">
            <Link to="/screeningtestone">
              <Button
                color="white_A700"
                size="xl"
                shape="round"
                className="min-w-[360px] font-bold !text-light_blue-700 sm:px-5"
              >
                Send Screening Test
              </Button>
            </Link>
            <Button size="xl" shape="round" className="min-w-[360px] font-bold sm:px-5">
              Schedule Interview
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
