import { Text, Heading, Button, Img } from "..";
import React from "react";
import { useProfileForm } from "../../context/ProfileFormProvider";
import { useParams } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../lib/utils";
import { useUserDetails } from "../../context/UserContextProvider";

export default function ProfileExperiencecard({
  productText = "",
  twitterText = "",
  workType = "",
  servingPeriod = "",
  manchesterukText = "",
  descriptionText = "",
  country = "",
  experienceId,
  setIsFormOpen,
  setExperienceFormMode,
  ...props
}) {
  const params = useParams();
  let candidateId = params?.id;

  // Get candidateId from localStorage if it's undefined or null
  if (!candidateId) {
    candidateId = localStorage.getItem("candidateId");
  }
  const { editExperience } = useProfileForm();
  const { candidateData, fetchCandidateData } = useUserDetails();

  const handleEditClick = () => {
    editExperience(candidateId, experienceId);
    setExperienceFormMode("add-on");
    setIsFormOpen(true);
  };

  const deleteEducationHandler = async () => {
    const adminEmail = localStorage.getItem("email") || "barkaleamol@gmail.com";

    let body = {
      experience_ids: [experienceId],
      candidate_id: candidateId,
      email: adminEmail,
    };
    console.log("deleteEducationHandler body:", body);

    try {
      const response = await axios.delete(
        `${baseUrl}/candidates/delete_candidate/`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          data: body,
        }
      );
      console.log("response.status:", response.status);
      if (response.status === 200 || response.status === 201) {
        fetchCandidateData(candidateId);
        // reset();
      } else {
        console.error("Registration failed with status:", response.status);
      }
    } catch (err) {
      alert(err.response?.data?.error);
    } finally {
      // setLoading(false);
    }
  };
  return (
    <div
      {...props}
      className={`${props.className} flex flex-col gap-6 pl-4 pr-2 sm:px-5 bg-color-white flex-1`}
    >
      <div className="mt-6 flex flex-col gap-2.5 self-stretch sm:gap-2.5">
        <div className="flex w-full flex-col gap-1.5 sm:w-full sm:gap-1.5">
          <div className="flex items-center justify-between gap-5">
            <Heading
              size="body_large___semibold"
              as="p"
              className="!text-neutrals-100 font-semibold sm:text-[15px]"
            >
              {productText}
            </Heading>
            <div className="flex">
              <Button
                shape="square"
                color="undefined_undefined"
                className="w-[40px] !p-0"
              >
                <div className="border-2 p-1 rounded">
                  <Img
                    src="/images/img_icon_brands_primary.svg"
                    onClick={handleEditClick}
                  />
                </div>
              </Button>
              <Button
                shape="square"
                color="undefined_undefined"
                className="rounded-md !p-1 text-color-white bg-light_blue-700 text-white"
                onClick={deleteEducationHandler}
              >
                Delete
              </Button>
            </div>
          </div>

          <div className="flex flex-col items-start gap-2 sm:gap-2 w-[84%]">
            <div className="flex items-center justify-start gap-2 sm:w-full">
              <Heading
                size="body_normal___medium"
                as="p"
                className="!text-neutrals-100 sm:text-[13px]"
              >
                {twitterText}
              </Heading>
              <div className="h-[4px] w-[4px] rounded-sm bg-blue_gray-200" />
              <Text as="p" className="!text-neutrals-80 sm:text-[13px]">
                {workType}
              </Text>
              <div className="h-[4px] w-[4px] rounded-sm bg-blue_gray-200" />
              <Text as="p" className="!text-neutrals-80 sm:text-[13px]">
                {servingPeriod}
              </Text>
            </div>
            <Text as="p" className="!text-neutrals-100 sm:text-[13px]">
              {manchesterukText} {country ? ", " + country : ""}
            </Text>
            <Heading
              size="body_large___semibold"
              as="h6"
              className="!text-neutrals-100 sm:text-[15px]"
            >
              {descriptionText}
            </Heading>
          </div>
        </div>
      </div>
      <div className="h-px self-stretch bg-neutrals-20" />
    </div>
  );
}
