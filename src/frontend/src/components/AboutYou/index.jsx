import { useAboutMe } from "../../context/AboutMeProvider";
import AboutMeForm from "../AboutMeForm";
import { Text, Button, Img, Heading } from "./..";
import React, { useState } from "react";
export default function AboutYou({
  aboutMeText = "About You",
  candidateData,
  ...props
}) {
  //__________
  const { aboutMe, updateAboutMe, deleteAboutMe } = useAboutMe();
  const [isAboutYouFormOpen, setAboutYouFormOpen] = useState(false);

  const handleAboutYouEditClick = () => {
    setAboutYouFormOpen(true);
  };

  return (
    <div
      {...props}
      className={`${props.className} flex flex-col mt-8 ml-2 gap-4 p-6 pb-0 md:ml-0 sm:p-5 border-neutrals-20 border-2 border-solid bg-color-white`}
    >
      <div className="flex items-center justify-between gap-5 self-stretch">
        <Heading
          size="display_2"
          as="h2"
          className="!text-neutrals-100 font-semibold text-[20px]"
        >
          {aboutMeText}
        </Heading>

        <div className="border-2 p-1 rounded">
          <Img
            src="/images/img_icon_brands_primary.svg"
            onClick={handleAboutYouEditClick}
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 self-stretch sm:gap-4">
        {candidateData && (
          <Heading
            size="body_large___semibold"
            as="h6"
            className="leading-[160%] !text-neutrals-100 sm:text-[13px] pb-6 "
          >
            {candidateData?.desc}
          </Heading>
        )}
      </div>
      {isAboutYouFormOpen && (
        <AboutMeForm onClose={() => setAboutYouFormOpen(false)} mode="edit" />
      )}
    </div>
  );
}
