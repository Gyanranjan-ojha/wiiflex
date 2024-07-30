import { useParams } from "react-router-dom";
import { Heading, Text, Button, Img } from "..";
import { useEducationForm } from "../../context/EducationsProvider";
import { baseUrl } from "../../lib/utils";
import axios from "axios";
import { useUserDetails } from "../../context/UserContextProvider";
export default function Education({
  educationTitle = "Educations",
  degree = "",
  university_name = "",
  subject = "",
  studyType = "",
  duration = "",
  description = "",
  address = "",
  showMoreButton = "",
  educationId,
  setIsEducationFormOpen,
  study_type = "",
  setEducationFormMode,
  ...props
}) {
  const { editEducation } = useEducationForm();
  const { candidateData, fetchCandidateData } = useUserDetails();

  const params = useParams();
  let candidateId = params?.id;

  // Get candidateId from localStorage if it's undefined or null
  if (!candidateId) {
    candidateId = localStorage.getItem("candidateId");
  }

  const handleEditClick = () => {
    editEducation(candidateId, educationId);
    setEducationFormMode("add-on");
    setIsEducationFormOpen(true);
  };

  const deleteEducationHandler = async () => {
    const adminEmail = localStorage.getItem("email") || "barkaleamol@gmail.com";

    let body = {
      education_ids: [educationId],
      candidate_id: candidateId,
      email: adminEmail,
    };

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
      className={`${props.className} w-full flex flex-col items-center ml-2 md:ml-0 sm:py-5`}
    >
      <div className="flex items-center justify-between gap-5 self-stretch px-6 sm:px-5"></div>
      <div className="flex flex-col gap-6 self-stretch mx-[22px] sm:gap-6 sm:px-5">
        <div className="mt-6 flex flex-col gap-2.5 sm:gap-2.5 pr-2">
          <div className="flex w-full flex-col gap-2 sm:w-full sm:gap-2">
            <div className="flex items-center justify-between gap-5">
              <div>
                <Heading
                  size="display_2"
                  as="h3"
                  className="!text-neutrals-100 font-semibold text-[20px]"
                >
                  {university_name}
                </Heading>
                <Heading
                  size="body_large___semibold"
                  as="h6"
                  className="!text-neutrals-100 sm:text-[15px]"
                >
                  {degree} {study_type ? " " + `(${study_type})` : ""}
                </Heading>
              </div>
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
            <div className="w-[84%]">
              <Text as="p" className="!text-neutrals-80 sm:text-[13px]">
                {subject}
              </Text>
              <div className="mb-1 flex flex-col items-start gap-2.5 sm:gap-2.5">
                <Text as="p" className="sm:text-[13px]">
                  {degree}
                </Text>
                <Text as="p" className="sm:text-[13px]">
                  {duration}
                </Text>
              </div>
              <Text as="p" className="sm:text-[13px]">
                {description}
              </Text>
              <Text as="p" className="sm:text-[13px]">
                {address}
              </Text>
            </div>
          </div>
        </div>
        <div className="h-px bg-neutrals-20" />
      </div>
      <div className="flex">
        <Heading
          size="body_normal___semibold"
          as="h6"
          className="!text-brands-primary sm:text-[13px]"
        >
          {showMoreButton}
        </Heading>
      </div>
    </div>
  );
}
