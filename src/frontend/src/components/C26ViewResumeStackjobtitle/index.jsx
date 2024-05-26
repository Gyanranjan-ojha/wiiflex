import React from "react";
import { Text, Heading } from "./..";

export default function C26ViewResumeStackjobtitle({
  jobtitle = "Job Title",
  freelanceconsultant = "Freelance Consultant",
  position = "Position",
  seniorconsultant = "Senior Consultant",
  employername = "Employer name",
  microsoft = "Microsoft",
  city = "City",
  ny = "NY",
  state = "State",
  nyOne = "NY",
  startdate = "Start Date",
  jancounter = "jan 2016",
  enddate = "End Date",
  jancounter1 = "Jan 2020",
  workdetails = "Work Details",
  duration = (
    <>
      Senior Consultant for last 2 years. Managed all
      <br />
      the HR programs.
    </>
  ),
  ...props
}) {
  return (
    <div {...props} className={`${props.className} h-[378px] w-full relative`}>
      <div className="absolute bottom-0 left-0 right-0 top-0 m-auto flex h-max w-[97%] flex-col items-start rounded border-[0.5px] border-solid border-gray-200_03 bg-white-A700 px-2.5 pb-[72px] pt-[15px] md:pb-5">
        <Text size="xs" as="p">
          {jobtitle}
        </Text>
        <Heading as="p">{freelanceconsultant}</Heading>
        <div className="mt-[11px] flex flex-col items-start">
          <Text size="xs" as="p">
            {position}
          </Text>
          <Heading as="p">{seniorconsultant}</Heading>
        </div>
        <div className="mt-2.5 flex flex-col items-start">
          <Text size="xs" as="p">
            {employername}
          </Text>
          <Heading as="p">{microsoft}</Heading>
        </div>
        <div className="mt-[9px] flex w-[78%] md:w-full">
          <div className="flex w-full flex-col gap-2.5">
            <div className="flex w-[88%] items-center justify-between gap-5 md:w-full">
              <div className="flex flex-col items-start pt-px">
                <Text size="xs" as="p" className="self-center">
                  {city}
                </Text>
                <Heading as="p" className="h-[20px] w-[20px]">
                  {ny}
                </Heading>
              </div>
              <div className="flex flex-col items-start">
                <Text size="xs" as="p">
                  {state}
                </Text>
                <Heading as="p" className="h-[20px] w-[20px]">
                  {nyOne}
                </Heading>
              </div>
            </div>
            <div className="flex items-center justify-between gap-5">
              <div className="flex flex-col gap-0.5">
                <Text size="xs" as="p">
                  {startdate}
                </Text>
                <Heading as="p">{jancounter}</Heading>
              </div>
              <div className="flex flex-col items-start">
                <Text size="xs" as="p">
                  {enddate}
                </Text>
                <Heading as="p">{jancounter1}</Heading>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-[15px] h-px self-stretch bg-gray-500_33" />
        <Heading size="s" as="p" className="mt-[13px]">
          {workdetails}
        </Heading>
      </div>
      <Text
        as="p"
        className="absolute bottom-[21.00px] left-0 right-0 m-auto w-[97%] leading-[21px] !text-blue_gray-700"
      >
        {duration}
      </Text>
    </div>
  );
}
