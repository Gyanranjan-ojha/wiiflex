import { Helmet } from "react-helmet";
import { Text, Img, Button, Heading } from "../../components";
import AboutYou from "../../components/AboutYou";
import Education from "../../components/Education";
import Skills from "../../components/Skills";
import ProfileEmail from "../../components/ProfileEmail";
import ProfileExperiencecard from "../../components/ProfileExperiencecard";
import Header from "../../components/Header";
import Sidebar1 from "../../components/Sidebar1";
import React, { useState, useRef, useEffect } from "react";
import { useProfileForm } from "../../context/ProfileFormProvider";
import ExperienceForm from "../../components/ExperienceForm";
import { useEducationForm } from "../../context/EducationsProvider";
import EducationForm from "../../components/EducationForm";
import Portfolio from "../../components/Portfolio";
import { Link } from "react-router-dom";
import PersonalInfo from "../../components/PersonalInfo";
import PersonalInfoForm from "../../components/PersonalInfoForm";
import axios from "axios";
import { baseUrl } from "../../lib/utils";
import { useParams } from "react-router-dom";
import { useUserDetails } from "../../context/UserContextProvider";

export default function DashboardProfilePage() {
  const { experiences, editExperience } = useProfileForm();
  const { educations, currentEducation, addEducation, editEducation } =
    useEducationForm();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [ExperienceFormMode, setExperienceFormMode] = useState("edit");
  const [EducationFormMode, setEducationFormMode] = useState("edit");
  const [SkillsFormMode, setSkillsFormMode] = useState("edit");

  const [isEducationFormOpen, setIsEducationFormOpen] = useState(false);
  const [isPersonalInfoFormOpen, setIsPersonalInfoFormOpen] = useState(false);

  const { id } = useParams();
  const { candidateData, fetchCandidateData } = useUserDetails();

  const [sliderState, setSliderState] = useState(0);
  const sliderRef = useRef(null);

  const handleAddExperienceClick = () => {
    editExperience(null);
    setExperienceFormMode("add-on");
    setIsFormOpen(true);
  };

  const handleAddEducationClick = () => {
    editEducation(null);
    setEducationFormMode("add-on");
    setIsEducationFormOpen(true);
  };

  useEffect(() => {
    fetchCandidateData(id);
  }, []);

  return (
    <>
      <Helmet>
        <title>User Profile - Product Designer at Gameopedia</title>
        <meta
          name="description"
          content="Explore the professional journey of Vishnu Barla, a seasoned Product Designer at Gameopedia. Gain insights into his skills, experiences, and educational background."
        />
      </Helmet>

      {/* profile main content section */}
      <div className="flex w-full items-start bg-color-white">
        {/* sidebar navigation section */}
        <Sidebar1 />

        {/* header and profile sections */}
        <div
          className="flex flex-1 flex-col gap-8 self-center"
          style={{ width: `calc(100vw - 291px)` }}
        >
          {/* profile header section */}
          <div className="flex items-center justify-between p-4 bg-color-white border-b-2 border-gray-200">
            <h1 className="text-2xl font-semibold text-gray-800">
              Candidate Profile
            </h1>
            <div className="flex items-center gap-4">
              <Link
                // to="/"
                to="/all-jobs"
                className="text-[#4640DE] border border-[#4640DE] px-4 py-2 rounded hover:bg-blue-50"
              >
                Back to homepage
              </Link>
              <button className="relative">
                <Img
                  src="/images/bell-icon.svg"
                  alt="Notifications"
                  className="w-6 h-6 text-gray-600"
                />
                <span className="absolute top-0 right-0 block h-2 w-2 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full"></span>
              </button>
            </div>
          </div>

          {/* profile content section */}
          <div className="w-full mb-1 flex items-start bg-color-white gap-[22px] px-6 md:flex-col sm:px-5">
            {/* profile overview section */}
            <div className="w-[68%] flex-1 self-center md:self-stretch">
              <PersonalInfo
                setIsPersonalInfoFormOpen={setIsPersonalInfoFormOpen}
                isPersonalInfoFormOpen={isPersonalInfoFormOpen}
                candidateData={candidateData}
              />
              {/* about section */}
              <AboutYou candidateData={candidateData} />
              {/* experience section */}
              <div className="ml-2 mt-5 border-2 border-solid border-neutrals-20 bg-color-white p-5 pl-2 md:ml-0 sm:py-5">
                <div className="flex items-center justify-between gap-5 pr-1 pl-4 sm:px-5">
                  <Heading
                    size="display_2"
                    as="h2"
                    className="!text-neutrals-100 font-semibold text-[20px]"
                  >
                    Experiences
                  </Heading>
                  <Button
                    shape="square"
                    color="undefined_undefined"
                    className="w-[40px] !p-0"
                    onClick={handleAddExperienceClick}
                  >
                    {/* <Img src="/images/img_icon_brands_primary.svg" /> */}
                    {/* <Img src="/images/img_plus.svg" /> */}
                    <div className="border-2 p-[2px] rounded">
                      <Img src="/images/img_plus.svg" />
                    </div>
                  </Button>
                </div>

                {/* education section */}
                <div className="flex flex-col items-center gap-0.5">
                  <div className="flex flex-col self-stretch">
                    {isFormOpen && (
                      <ExperienceForm
                        onClose={() => setIsFormOpen(false)}
                        mode={ExperienceFormMode}
                        experienceData={
                          candidateData.experiences_data
                            ? candidateData.experiences_data
                            : []
                        }
                      />
                    )}
                    {candidateData?.experiences_data?.map((experience) => (
                      <ProfileExperiencecard
                        key={experience.id}
                        productText={experience.designation}
                        twitterText={experience.company_name}
                        workType={experience.work_type}
                        servingPeriod={`${experience.joined_at} - ${
                          experience.is_currently_working
                            ? "Present"
                            : experience.resigned_at
                        }`}
                        manchesterukText={experience.work_address}
                        descriptionText={experience.work_desc}
                        country={experience.country}
                        experienceId={experience.id}
                        setIsFormOpen={setIsFormOpen}
                        setExperienceFormMode={setExperienceFormMode} // Pass setFormMode to ProfileExperienceCard
                      />
                    ))}
                  </div>
                  {/* <Heading
                    size="body_normal___semibold"
                    as="h3"
                    className="!text-brands-primary"
                  >
                    Show 3 more experiences
                  </Heading> */}
                </div>
              </div>
              <div className="flex flex-col items-center mt-6 ml-2 py-6 md:ml-0 sm:py-5 border-neutrals-20 border-2 border-solid bg-color-white">
                <div className="flex items-center justify-between gap-5 self-stretch px-6 sm:px-5">
                  <Heading
                    size="display_2"
                    as="h2"
                    className="!text-neutrals-100 font-semibold text-[20px]"
                  >
                    Educations
                  </Heading>
                  <Button
                    shape="square"
                    color="undefined_undefined"
                    className="!size-[32px] !p-0"
                    onClick={handleAddEducationClick}
                  >
                    <div className="border-2 p-[2px] rounded !container">
                      <Img src="/images/img_plus.svg" />
                    </div>
                  </Button>
                </div>
                {isEducationFormOpen && (
                  <EducationForm
                    onClose={() => setIsEducationFormOpen(false)}
                    educationsData={candidateData?.educations_data}
                    mode={EducationFormMode}
                  />
                )}
                {candidateData.educations_data?.map((education) => (
                  <Education
                    key={education.id}
                    degree={education.degree}
                    university_name={education.university_name}
                    subject={education.subject}
                    studyType={education.study_type}
                    duration={`${education.started_at} - ${
                      education.is_pursuing ? "Present" : education.end_at
                    }`}
                    description={education.study_desc}
                    address={education.study_address}
                    educationId={education.id}
                    setIsEducationFormOpen={setIsEducationFormOpen}
                    study_type={education.study_type}
                    setEducationFormMode={setEducationFormMode}
                  />
                ))}
              </div>

              <Skills
                skillsData={candidateData?.skills_data}
                mode={SkillsFormMode}
                setSkillsFormMode={setSkillsFormMode}
              />

              {/* portfolio section */}
              <Portfolio candidateData={candidateData} />
            </div>

            {/* additional details section */}
            {/* <div className="flex w-[32%] justify-center md:w-full">
              <div className="flex w-full flex-col gap-4 border border-solid border-neutrals-20 bg-color-white p-6 sm:p-5">
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
                    <Img src="/images/img_icon_brands_primary.svg" />
                  </Button>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="mr-[108px] flex flex-col gap-4 md:mr-0 md:flex-row sm:flex-col">
                    <ProfileEmail />
                    <ProfileEmail
                      lockImage="/images/img_icon_2.svg"
                      emailLabel="Phone"
                      emailText="+44 1245 572 135"
                      className="mr-[30px] md:mr-0"
                    />
                  </div>
                  <div className="flex items-start gap-4">
                    <Img
                      src="/images/img_settings.svg"
                      alt="settings icon"
                      className="h-[24px] w-[24px]"
                    />
                    <div className="flex flex-1 flex-col items-start gap-1 self-center">
                      <Text as="p">Languages</Text>
                      <Text as="p" className="!text-neutrals-100">
                        English, French
                      </Text>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
