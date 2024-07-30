import React from "react";
import { Heading, Text, Button, Img } from "..";
import { usePersonalInfoForm } from "../../context/PersonalInfoProvider";
import PersonalInfoForm from "../PersonalInfoForm";
import { Link } from "react-router-dom";
import ProfileEmail from "../ProfileEmail";
const PersonalInfo = ({
  positions = "",
  organization = "",
  location = "",
  email = "",
  phone = "",
  languages = "",
  showMoreButton = "",
  index,
  setIsPersonalInfoFormOpen,
  isPersonalInfoFormOpen,
  candidateData,
  ...props
}) => {
  const { editPersonalInfo, deletePersonalInfo, personalInfos } =
    usePersonalInfoForm();

  const handleEditClick = () => {
    editPersonalInfo(index);
    setIsPersonalInfoFormOpen(true);
  };

  const handleAddClick = () => {
    setIsPersonalInfoFormOpen(true);
  };

  const handleDeleteClick = () => {
    deletePersonalInfo(index);
  };

  return (
    <div
      {...props}
      className={`${props.className} w-full flex flex-col items-center ml-2 md:ml-0 sm:py-5 bg-color-white`}
    >
      <div className="flex items-center justify-between gap-5 self-stretch px-6 sm:px-5"></div>
      <div className="flex flex-col gap-6 self-stretch bg-color-white px-[22px] sm:gap-6 sm:px-5">
        <div className="mt-6 flex flex-col gap-2.5 sm:gap-2.5 pr-2">
          <div className="flex w-full flex-col gap-2 sm:w-full sm:gap-2">
            <div className="flex items-center justify-between gap-5">
              <div className="flex">
                {Object.keys(candidateData).length === 0 && (
                  <div
                    className="border-2 p-1 rounded"
                    onClick={handleAddClick}
                  >
                    <Img src="/images/img_plus.svg" />
                  </div>
                )}
              </div>
            </div>

            {Object.keys(candidateData).length !== 0 && (
              <div className="w-full">
                <div className="flex flex-row w-full">
                  <div className=" w-[68%] mr-2.5 flex items-start justify-center md:mr-0 md:flex-col">
                    {/* profile summary section */}
                    <div className="flex flex-1 items-start md:self-stretch sm:flex-col">
                      {/* Profile Upload */}
                      {/* <div className="flex w-[34%] flex-col items-start self-center sm:w-full">
                        <div className="w-[68%] md:w-full">
                          <div>
                            <div className="rounded-[70px] border-8 border-solid border-color-white">
                              <Img
                                src="/images/img_vishnu_profile_picture.png"
                                alt="profile image"
                                className="w-[94px] h-[94px] rounded-[66px] object-cover md:h-auto"
                              />
                            </div>
                          </div>
                        </div>
                      </div> */}
                      <div className="mt-2 flex flex-1 flex-col items-start gap-2.5 sm:self-stretch">
                        <Heading
                          size="display_2"
                          as="h2"
                          className="!text-neutrals-100 font-semibold  text-[20px]"
                        >
                          {candidateData?.name}
                        </Heading>
                        <Text
                          size="textlg"
                          as="p"
                          className="!text-color-black"
                        >
                          <span className="text-neutrals-60">
                            {candidateData?.current_designation} at
                          </span>
                          <span className="text-color-black">&nbsp;</span>
                          <span className="font-medium text-neutrals-100">
                            {candidateData?.current_organization}
                          </span>
                        </Text>
                        <div className="flex items-center gap-2 self-stretch">
                          <Img
                            src="/images/img_linkedin.svg"
                            alt="linkedin icon"
                            className="h-[24px] w-[24px]"
                          />
                          <Text size="textlg" as="p">
                            {candidateData?.city_state},{" "}
                            {candidateData?.pincode}, {candidateData?.country}
                          </Text>
                        </div>
                      </div>
                    </div>
                    <Button
                      size="lg"
                      shape="square"
                      color="undefined_undefined"
                      className="text-[#4640DE] border-2 px-4 py-2 rounded hover:bg-blue-50"
                      onClick={handleAddClick}
                    >
                      Edit Profile
                    </Button>
                    {/* <Link
                  // to="/"
                  to="#"
                  className="text-[#4640DE] border border-[#4640DE] px-4 py-2 rounded hover:bg-blue-50"
                >
                  Edit Profile
                </Link> */}
                  </div>
                  {/* additional details section */}
                  <div className="flex w-[32%] justify-center md:w-full">
                    <div className="flex w-full flex-col gap-4  border-2 border-neutrals-20 bg-color-white p-6 sm:p-5">
                      <div className="flex items-center justify-between gap-5">
                        <Heading
                          size="display_2"
                          as="h5"
                          className="!text-neutrals-100"
                        >
                          Additional Details
                        </Heading>
                        <Button
                          shape="square"
                          color="undefined_undefined"
                          className="w-[40px] !p-0"
                        >
                          <Img
                            src="/images/img_icon_brands_primary.svg"
                            onClick={handleAddClick}
                          />
                        </Button>
                      </div>
                      <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-4 md:mr-0 md:flex-row sm:flex-col">
                          <ProfileEmail emailText={candidateData?.email} />
                          <ProfileEmail
                            lockImage="img_icon_2.svg"
                            emailLabel="Phone"
                            emailText={candidateData?.phone}
                            className="mr-[30px] md:mr-0"
                          />
                        </div>
                        <div className="flex items-start gap-4">
                          <div>
                            <Img
                              src="/images/img_settings.svg"
                              alt="settings icon"
                              className="h-[24px] w-[24px]"
                            />
                          </div>
                          <div className="flex flex-1 flex-col items-start gap-1 self-center">
                            <Text as="p">Languages</Text>
                            <Text as="p" className="!text-cyan-900">
                              {candidateData?.languages}
                            </Text>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* <div className="w-[40%]">
              <Text as="p" className="!text-neutrals-80 sm:text-[13px]">
                {candidateData?.positions}
              </Text>
              <div className="mb-1 flex flex-col items-start gap-2.5 sm:gap-2.5">
                <Text as="p" className="sm:text-[13px]">
                  {candidateData?.organization}
                </Text>
                <Text as="p" className="sm:text-[13px]">
                  {candidateData?.location}
                </Text>
              </div>
              <Text as="p" className="sm:text-[13px]">
                {candidateData?.email}
              </Text>
              <Text as="p" className="sm:text-[13px]">
                {candidateData?.phone}
              </Text>
              <Text as="p" className="sm:text-[13px]">
                {candidateData?.languages}
              </Text>
            </div> */}
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
      {isPersonalInfoFormOpen && (
        <PersonalInfoForm
          onClose={() => setIsPersonalInfoFormOpen(false)}
          mode="edit"
        />
      )}
    </div>
  );
};

export default PersonalInfo;
