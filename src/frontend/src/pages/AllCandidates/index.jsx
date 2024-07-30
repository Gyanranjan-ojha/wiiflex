import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import { Button, Heading, Text, Img } from "../../components";
import HomepagePagination from "../../components/HomepagePagination";
import axios from "axios";
import Navbar from "../../components/Navbar";
import ErrorBoundary from "../../components/ErrorBoundry";
import { baseUrl, useGoTo } from "../../lib/utils";
import ExpandableText from "../../components/ExpandableText";

export default function AllCandidates() {
  const [userData, setUserData] = useState({});
  const goTo = useGoTo();
  const { jobId } = useParams();

  // useEffect(() => {
  //   const timer = setTimeout(async () => {
  //     try {
  //       const email = localStorage.getItem("email") || "";
  //       const response = await axios.get(
  //         `${baseUrl}/job/get_jobs/?email=${email}`
  //       );
  //       console.log("Status:", response.status);
  //       console.log("response.data:", response.data);
  //       if (response.status === 200) setUserData(response.data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   }, 1000);

  //   return () => clearTimeout(timer);
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/job/get_particular_job`, {
          params: { job_id: jobId },
        });
        console.log("get_particular_job Status:", response.status);
        console.log("get_particular_job response.data:", response.data[0]);
        if (response.status === 200) setUserData(response.data[0]);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  const longText =
    "Had 5 years of working experience as design lead. Working for a reputated com Had 5 years of working experience as design lead. Working for a reputated com Had 5 years of working experience as design lead. Working for a reputated com Had 5 years of working experience as design lead. Working for a reputated com";

  return (
    <ErrorBoundary>
      <Helmet>
        <title>WIIFLEX</title>
        <meta
          name="description"
          content="Web site created using create-react-app"
        />
      </Helmet>
      <Navbar id={jobId} />
      <div className="flex w-full flex-col items-center gap-[22px] bg-white-A700 pt-[21px] sm:pt-5">
        <div className="flex w-[55%] flex-col items-end gap-[301px] md:w-full md:gap-[225px] md:p-5 sm:gap-[150px]">
          <div className="flex w-full flex-col items-center md:w-full">
            <div className="flex flex-col items-start self-stretch">
              <div className="flex w-[94%] items-start justify-between gap-5 md:w-full">
                {userData && userData.name && (
                  <Heading size="2xl" as="h1">
                    {userData.name} needed
                  </Heading>
                )}
              </div>
              <Text
                as="p"
                className="mt-1.5 w-full leading-[21px] !text-gray-800_02"
              >
                {userData && userData.description && (
                  <span className="text-gray-800_02">
                    <>
                      <ExpandableText
                        text={userData.description}
                        initialMaxLength={1100}
                        finalMaxLength={4100}
                      />
                      <br />
                      <br />
                    </>
                  </span>
                )}
                <span className="font-bold text-gray-800_02">
                  <>
                    {userData.name}
                    <br />
                  </>
                </span>
                <span className="text-gray-800_02">
                  <>
                    Experience Required:{" "}
                    {userData && userData.required_experience_years
                      ? `${userData.required_experience_years} year/s`
                      : "Experience requirement not specified"}
                  </>
                </span>
              </Text>
              <div className="mt-[19px] flex w-full items-center gap-1.5 md:w-full sm:flex-col">
                <Heading size="s" as="h2" className="!text-teal-900">
                  Skills -{/* need to loop through, for upcoming feature */}
                </Heading>
                <Button
                  color="teal_900"
                  className="w-full flex-1 rounded-[17px] sm:self-stretch"
                >
                  Adobe XD
                </Button>
                <Button
                  color="teal_900"
                  className="w-full flex-1 rounded-[17px] sm:self-stretch"
                >
                  Sketch Pro
                </Button>
                <Button
                  color="teal_900"
                  className="w-full flex-1 rounded-[17px] sm:self-stretch"
                >
                  Adobe XD
                </Button>
                <Button
                  color="teal_900"
                  className="w-full flex-1 rounded-[17px] sm:self-stretch"
                >
                  Sketch Pro
                </Button>
              </div>

              <div className="mt-[19px] flex flex-col w-full">
                <div className="flex">
                  <Heading size="s" as="h3" className="!text-teal-900">
                    Location -{userData.city}
                  </Heading>
                </div>
                <div className="flex justify-between mt-2 self-stretch">
                  <div>
                    <Heading size="s" as="h5" className="!text-teal-900">
                      Job Type -{" "}
                      {userData && userData.job_type
                        ? userData.job_type
                        : "Not specified"}
                    </Heading>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heading size="s" as="h6" className="!text-teal-900">
                      Salary -{" "}
                    </Heading>
                    <Heading size="s" as="p" className="!text-teal-900">
                      {userData && userData.pay_from && userData.pay_to
                        ? `${userData.pay_from} - ${userData.pay_to}`
                        : "Not specified"}
                    </Heading>
                  </div>
                </div>
              </div>
              <div className="mt-[18px] h-px self-stretch bg-gray-500_47" />
            </div>
            <Heading
              as="p"
              className="ml-[5px] mt-[9px] self-start !text-light_blue-700 md:ml-0"
            >
              Candidates
            </Heading>
            <div className="mt-2.5 grid grid-cols-2 justify-center gap-[21px] self-stretch md:grid-cols-1">
              <div
                className="flex flex-col items-start justify-between rounded-xl border border-gray-200 bg-white p-3.5 cursor-pointer shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                onClick={() => goTo(`/candidate/${jobId}`)}
              >
                <div className="flex items-start gap-[17px] self-stretch">
                  <Img
                    src="/images/img_bitmap.png"
                    alt="steve_morgan"
                    className="mt-1.5 h-[60px] w-[60px] object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex flex-col gap-[7px]">
                      <div className="flex items-center justify-between gap-5">
                        <Link to="/candidate">
                          <Heading
                            as="p"
                            className="self-end !text-light_blue-700"
                          >
                            Steve Morgan
                          </Heading>
                        </Link>
                        <div className="flex items-center w-1/2 gap-5 bg-yellow-300 rounded-md ">
                          <Text
                            size="s"
                            as="p"
                            className="leading-[19px] !text-gray-800_01 p-1"
                          >
                            Screen test sent
                          </Text>
                        </div>
                      </div>
                      <ExpandableText
                        text={longText}
                        initialMaxLength={75}
                        finalMaxLength={150}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-[30px] flex flex-wrap">
                  <Text
                    size="xs"
                    as="p"
                    className="self-start !text-gray-800_01"
                  >
                    Location -
                  </Text>
                  <Heading
                    size="s"
                    as="p"
                    className="ml-[5px] h-[18px] w-[18px] self-start !text-teal-900"
                  >
                    NY
                  </Heading>
                  <Text
                    size="xs"
                    as="p"
                    className="ml-[54px] self-end !text-gray-800_01"
                  >
                    Type -
                  </Text>
                  <Heading
                    size="s"
                    as="p"
                    className="self-start !text-gray-800_01"
                  >
                    Remote
                  </Heading>
                </div>
                <div className="mt-[13px] h-[2px] self-stretch bg-gray-500_33" />
                <div className="mt-[15px] w-[95%] flex  flex-col items-start gap-[9px] md:w-full">
                  <Heading size="s" as="p" className="!text-gray-800_01">
                    Skillss
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
              <div
                className="flex flex-col items-start justify-between rounded-xl border border-gray-200 bg-white p-3.5 cursor-pointer shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                onClick={() => goTo(`/candidate/${jobId}`)}
              >
                <div className="flex items-start gap-[17px] self-stretch">
                  <Img
                    src="/images/img_bitmap_60x60.png"
                    alt="steve_morgan"
                    className="mt-1.5 h-[60px] w-[60px] object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex flex-col gap-[7px]">
                      <div className="flex items-center justify-between gap-5">
                        <Link to="/candidate">
                          <Heading
                            as="p"
                            className="self-end !text-light_blue-700"
                          >
                            Dusana G.{" "}
                          </Heading>
                        </Link>
                        <div className="flex items-center w-1/2 gap-5 bg-green-500 rounded-md ">
                          <Text
                            size="s"
                            as="p"
                            className="leading-[19px] !text-white-A700 p-1"
                          >
                            Screen test sent
                          </Text>
                        </div>
                      </div>
                      <ExpandableText
                        text={longText}
                        initialMaxLength={75}
                        finalMaxLength={150}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-[30px] flex flex-wrap">
                  <Text
                    size="xs"
                    as="p"
                    className="self-start !text-gray-800_01"
                  >
                    Location -
                  </Text>
                  <Heading
                    size="s"
                    as="p"
                    className="ml-[5px] h-[18px] w-[18px] self-start !text-teal-900"
                  >
                    NY
                  </Heading>
                  <Text
                    size="xs"
                    as="p"
                    className="ml-[54px] self-end !text-gray-800_01"
                  >
                    Type -
                  </Text>
                  <Heading
                    size="s"
                    as="p"
                    className="self-start !text-gray-800_01"
                  >
                    Remote
                  </Heading>
                </div>
                <div className="mt-[13px] h-[2px] self-stretch bg-gray-500_33" />
                <div className="mt-[15px] w-[95%] flex  flex-col items-start gap-[9px] md:w-full">
                  <Heading size="s" as="p" className="!text-gray-800_01">
                    Skillss
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
              <div
                className="flex flex-col items-start justify-between rounded-xl border border-gray-200 bg-white p-3.5 cursor-pointer shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                onClick={() => goTo(`/candidate/${jobId}`)}
              >
                <div className="flex items-start gap-[17px] self-stretch">
                  <Img
                    src="/images/img_bitmap.png"
                    alt="steve_morgan"
                    className="mt-1.5 h-[60px] w-[60px] object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex flex-col gap-[7px]">
                      <div className="flex items-center justify-between gap-5">
                        <Link to="/candidate">
                          <Heading
                            as="p"
                            className="self-end !text-light_blue-700"
                          >
                            Steve Morgan
                          </Heading>
                        </Link>
                        <div className="flex items-center w-1/2 gap-5 bg-yellow-300 rounded-md ">
                          <Text
                            size="s"
                            as="p"
                            className="leading-[19px] !text-gray-800_01 p-1"
                          >
                            Screen test sent
                          </Text>
                        </div>
                      </div>
                      <ExpandableText
                        text={longText}
                        initialMaxLength={75}
                        finalMaxLength={150}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-[30px] flex flex-wrap">
                  <Text
                    size="xs"
                    as="p"
                    className="self-start !text-gray-800_01"
                  >
                    Location -
                  </Text>
                  <Heading
                    size="s"
                    as="p"
                    className="ml-[5px] h-[18px] w-[18px] self-start !text-teal-900"
                  >
                    NY
                  </Heading>
                  <Text
                    size="xs"
                    as="p"
                    className="ml-[54px] self-end !text-gray-800_01"
                  >
                    Type -
                  </Text>
                  <Heading
                    size="s"
                    as="p"
                    className="self-start !text-gray-800_01"
                  >
                    Remote
                  </Heading>
                </div>
                <div className="mt-[13px] h-[2px] self-stretch bg-gray-500_33" />
                <div className="mt-[15px] w-[95%] flex  flex-col items-start gap-[9px] md:w-full">
                  <Heading size="s" as="p" className="!text-gray-800_01">
                    Skillss
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
              <div
                className="flex flex-col items-start justify-between rounded-xl border border-gray-200 bg-white p-3.5 cursor-pointer shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                onClick={() => goTo(`/candidate/${jobId}`)}
              >
                <div className="flex items-start gap-[17px] self-stretch">
                  <Img
                    src="/images/img_bitmap_60x60.png"
                    alt="steve_morgan"
                    className="mt-1.5 h-[60px] w-[60px] object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex flex-col gap-[7px]">
                      <div className="flex items-center justify-between gap-5">
                        <Link to="/candidate">
                          <Heading
                            as="p"
                            className="self-end !text-light_blue-700"
                          >
                            Dusana G.{" "}
                          </Heading>
                        </Link>
                        <div className="flex items-center w-1/2 gap-5 bg-green-500 rounded-md ">
                          <Text
                            size="s"
                            as="p"
                            className="leading-[19px] !text-white-A700 p-1"
                          >
                            Screen test sent
                          </Text>
                        </div>
                      </div>
                      <ExpandableText
                        text={longText}
                        initialMaxLength={75}
                        finalMaxLength={150}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-[30px] flex flex-wrap">
                  <Text
                    size="xs"
                    as="p"
                    className="self-start !text-gray-800_01"
                  >
                    Location -
                  </Text>
                  <Heading
                    size="s"
                    as="p"
                    className="ml-[5px] h-[18px] w-[18px] self-start !text-teal-900"
                  >
                    NY
                  </Heading>
                  <Text
                    size="xs"
                    as="p"
                    className="ml-[54px] self-end !text-gray-800_01"
                  >
                    Type -
                  </Text>
                  <Heading
                    size="s"
                    as="p"
                    className="self-start !text-gray-800_01"
                  >
                    Remote
                  </Heading>
                </div>
                <div className="mt-[13px] h-[2px] self-stretch bg-gray-500_33" />
                <div className="mt-[15px] w-[95%] flex  flex-col items-start gap-[9px] md:w-full">
                  <Heading size="s" as="p" className="!text-gray-800_01">
                    Skillss
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
            <HomepagePagination />
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
