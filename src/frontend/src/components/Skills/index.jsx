import { ChipView, Button, Img, Heading, Text } from "..";
import React, { useState } from "react";
import SkillsForm from "../SkillsForm";
import { useSkills } from "../../context/SkillsProvider";
import { useParams } from "react-router-dom";
import { useUserDetails } from "../../context/UserContextProvider";
import { baseUrl } from "../../lib/utils";
import axios from "axios";
import ModalWrapper from "../ModalWrapper";

export default function Skills({
  skills = "Skills",
  skillsData,
  mode,
  setSkillsFormMode,
  ...props
}) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [chipOptions, setChipOptions] = useState(() => [
    { value: 1, label: `Communication` },
    { value: 2, label: `Analytics` },
    { value: 3, label: `Facebook Ads` },
    { value: 4, label: `Content Planning` },
    { value: 5, label: `Community Manager` },
  ]);
  const [selectedChipOptions, setSelectedChipOptions] = React.useState([]);
  const { suggestedSkills } = useSkills();
  const { fetchCandidateData } = useUserDetails();

  const params = useParams();
  let candidateId = params?.id;

  // Get candidateId from localStorage if it's undefined or null
  if (!candidateId) {
    candidateId = localStorage.getItem("candidateId");
  }

  const handleAddSkillClick = () => {
    setSkillsFormMode("add-on");
    setIsFormOpen(true);
  };

  const deleteSkillHandler = async (skillId) => {
    const adminEmail = localStorage.getItem("email") || "barkaleamol@gmail.com";

    let body = {
      skill_ids: [skillId],
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
        return true;
      } else {
        console.error("Registration failed with status:", response.status);
        return false;
      }
    } catch (err) {
      alert(err.response?.data?.error);
      return false;
    } finally {
      // setLoading(false);
    }
  };

  console.log("sskillsData:", skillsData);
  const postSkills = async (newSkill) => {
    const adminEmail = localStorage.getItem("email") || "barkaleamol@gmail.com";

    let body = {
      candidate_skills_data: [newSkill],
      candidate_id: candidateId,
      email: adminEmail,
    };
    //TODO: API CALL
    try {
      const response = await axios.post(
        `${baseUrl}/candidates/create_candidate/`,
        body
      );
      console.log("response.status:", response.status);
      if (response.status === 200 || response.status === 201) {
        fetchCandidateData(candidateId);
        return true;
      } else {
        console.error("Registration failed with status:", response.status);
        return false;
      }
    } catch (err) {
      alert(err.response?.data?.error);
      return false;
    } finally {
      // setLoading(false);
    }
  };

  return (
    <div
      {...props}
      className={`${props.className} flex flex-col mt-6 ml-2 gap-4 p-6 md:ml-0 sm:p-5 border-neutrals-20 border-2 border-solid bg-color-white`}
    >
      <div className="flex items-center justify-between self-stretch">
        <Heading
          size="display_2"
          as="h2"
          className="!text-neutrals-100 font-semibold text-[20px]"
        >
          {skills}
        </Heading>
        <div className="flex flex-1 justify-end gap-2">
          <Button
            shape="square"
            color="undefined_undefined"
            className="w-[40px] !p-0"
            onClick={handleAddSkillClick}
          >
            <div className="border-2 p-1 rounded">
              <Img src="/images/img_icon_brands_primary.svg" />
            </div>
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {skillsData?.reverse().map((skill) => (
          <div
            key={skill.id}
            className="bg-[#1A4F6E] text-color-white rounded-full px-3 py-1 cursor-pointer"
            onClick={() => deleteSkillHandler(skill.id)}
          >
            {skill?.name}
          </div>
        ))}
      </div>
      {isFormOpen && (
        <SkillsForm
          onClose={() => setIsFormOpen(false)}
          mode={mode}
          skillsData={skillsData}
        />
      )}
      <Text className="mt-4 mb-2 font-semibold">
        Suggested based on your profile
      </Text>
      <div className="flex flex-wrap gap-2">
        {suggestedSkills?.map((skill, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-full px-3 py-1 cursor-pointer"
            onClick={() => postSkills(skill.skill)}
          >
            {skill.skill}
          </div>
        ))}
      </div>
    </div>
  );
  // return (
  //   <div
  //     {...props}
  //     className={`${props.className} flex flex-col mt-6 ml-2 gap-4 p-6 md:ml-0 sm:p-5 border-neutrals-20 border border-solid bg-color-white`}
  //   >
  //     <div className="flex items-center justify-center self-stretch">
  //       <Heading
  //         size="display_2"
  //         as="h2"
  //         className="!text-neutrals-100 font-semibold text-[20px]"
  //       >
  //         {skills}
  //       </Heading>
  //       <div className="flex flex-1 justify-end gap-2">
  //         <Button
  //           shape="square"
  //           color="undefined_undefined"
  //           className="w-[40px] !p-0"
  //         >
  //           {/* <Img src="/images/img_icon_brands_primary_40x40.svg" /> */}
  //         </Button>
  //         <Button
  //           shape="square"
  //           color="undefined_undefined"
  //           className="w-[40px] !p-0"
  //         >
  //           <div className="border-2 p-1 rounded">
  //             <Img src="/images/img_plus.svg" />
  //           </div>
  //           {/* <Img src="/images/img_icon_brands_primary.svg" /> */}
  //         </Button>
  //       </div>
  //     </div>
  //     {/* <ChipView
  //       options={chipOptions}
  //       setOptions={setChipOptions}
  //       values={selectedChipOptions}
  //       setValues={setSelectedChipOptions}
  //       className="flex flex-wrap self-stretch"
  //     >
  //       {(option) => (
  //         <React.Fragment key={option.index}>
  //           {option.isSelected ? (
  //             <div
  //               onClick={option.toggle}
  //               className="border-style-[normal] flex h-[34px] min-w-[148px] cursor-pointer flex-row items-center justify-center border border-indigo-a700_99 bg-neutrals-10i px-3 text-center font-epilogue text-base text-brands-primary"
  //             >
  //               <span>{option.label}</span>
  //             </div>
  //           ) : (
  //             <div
  //               onClick={option.toggle}
  //               className="flex h-[34px] min-w-[148px] cursor-pointer flex-row items-center justify-center bg-neutrals-10i px-3 text-center font-epilogue text-base text-brands-primary"
  //             >
  //               <span>{option.label}</span>
  //             </div>
  //           )}
  //         </React.Fragment>
  //       )}
  //     </ChipView> */}
  //   </div>
  // );
}
