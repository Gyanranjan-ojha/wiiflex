import React from "react";
import { Text, Heading } from "./..";

export default function C26ViewResumeColumn({
  schoolname = "School Name",
  universityname = "UIU",
  schoollocation = "School Location",
  city = "NY",
  degreelevel = "Degree Level",
  highschooldiploma = "High School Diploma",
  degreefield = "Degree Field",
  highschooldiplomaone = "High School Diploma",
  startdate = "Start Date",
  jancounter = "jan 2016",
  enddate = "End Date",
  jancounter1 = "Jan 2020",
  education = "Education Details",
  cmopletedmy = "Cmopleted my graduation deploma there.",
  ...props
}) {
  return (
    <div
      {...props}
      className={`${props.className} flex flex-col w-full pt-[15px] pb-10 px-2.5 sm:pb-5 border-gray-200_03 border-[0.5px] border-solid bg-white-A700 rounded`}
    >
      <div className="flex flex-col items-start self-stretch">
        <Text size="xs" as="p">
          {schoolname}
        </Text>
        <Heading as="p">{universityname}</Heading>
        <Text size="xs" as="p" className="mt-[11px]">
          {schoollocation}
        </Text>
        <Heading as="p" className="h-[20px] w-[20px]">
          {city}
        </Heading>
        <Text size="xs" as="p" className="mt-[11px]">
          {degreelevel}
        </Text>
        <Heading as="p">{highschooldiploma}</Heading>
        <Text size="xs" as="p" className="mt-2.5">
          {degreefield}
        </Text>
        <Heading as="p">{highschooldiplomaone}</Heading>
        <div className="mt-2.5 flex w-[78%] items-center justify-between gap-5 md:w-full">
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
        <div className="mt-[15px] h-px w-full self-stretch bg-gray-500_33" />
        <Heading size="s" as="p" className="mt-[13px]">
          {education}
        </Heading>
        <Text as="p" className="mt-2.5 !text-blue_gray-700">
          {cmopletedmy}
        </Text>
      </div>
    </div>
  );
}
