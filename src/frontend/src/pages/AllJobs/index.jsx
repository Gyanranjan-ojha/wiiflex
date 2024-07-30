import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import { Button, Heading, Text } from "../../components";
import HomepagePagination from "../../components/HomepagePagination";
import axios from "axios";
import Navbar from "../../components/Navbar";
import ErrorBoundary from "../../components/ErrorBoundry";
import { baseUrl, useGoTo } from "../../lib/utils";
import ExpandableText from "../../components/ExpandableText";

export default function AllJobs() {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);

  const { jobId } = useParams();
  const goTo = useGoTo();

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(async () => {
      try {
        const email = localStorage.getItem("email") || "gyan@gmail.com";
        const response = await axios.get(`${baseUrl}/job/get_jobs`, {
          params: { email: email },
        });
        console.log("Data:", response.status);
        if (response.status === 200) setUserData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  function formatRelativeDate(dateString) {
    const today = new Date();
    const date = new Date(dateString + "T00:00:00"); // Assuming dateString is in local time zone

    const dayDiff = Math.floor((today - date) / (1000 * 60 * 60 * 24));

    const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

    if (dayDiff === 0) {
      return "Today";
    } else if (dayDiff === 1) {
      return "Yesterday";
    } else {
      return rtf.format(-dayDiff, "day");
    }
  }
  console.log("userData:", userData);

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
            <Heading
              as="h1"
              className="mt-[9px] text-[22px] self-start !text-light_blue-700 md:ml-0"
            >
              Jobs
            </Heading>
            <div className="mt-2.5 grid grid-cols-2 justify-center gap-[21px] self-stretch md:grid-cols-1">
              {userData && userData.length > 0 ? (
                userData?.map((job, index) => {
                  const {
                    id,
                    name,
                    description,
                    city,
                    state,
                    country,
                    address,
                    required_experience_years,
                    pay_from,
                    pay_to,
                    company__name,
                    user__first_name,
                    user__last_name,
                    job_type,
                    created_date,
                  } = job;

                  return (
                    <div
                      className="flex flex-col items-start rounded-xl border border-gray-200 bg-white p-3.5 cursor-pointer shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                      onClick={() => goTo(`/all-candidates/${id}`)}
                      key={index}
                    >
                      <div className="flex items-start gap-[17px] self-stretch">
                        <div className="flex-1">
                          <div className="flex flex-col gap-[7px]">
                            <div className="flex items-center justify-between gap-5">
                              <Link to="/candidate">
                                <Heading
                                  as="p"
                                  className="self-end !text-light_blue-700"
                                >
                                  {name}
                                </Heading>
                              </Link>
                              <div className="flex items-center gap-5 bg-yellow-300 rounded-xl">
                                <Text
                                  size="s"
                                  as="p"
                                  className="leading-[19px] !text-gray-800_01 p-2"
                                >
                                  {formatRelativeDate(created_date)}
                                </Text>
                              </div>
                            </div>
                            <ExpandableText
                              text={description}
                              initialMaxLength={75}
                              finalMaxLength={150}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="mt-[30px] flex flex-wrap justify-between">
                        <div className="flex items-center space-x-1">
                          <Text size="xs" as="p" className="text-gray-800">
                            Location -
                          </Text>
                          <Heading size="s" as="p" className="text-teal-900">
                            {city}
                          </Heading>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Text size="xs" as="p" className="text-gray-800">
                            Type -
                          </Text>
                          <Heading size="s" as="p" className="text-gray-800">
                            {job_type}
                          </Heading>
                        </div>
                        <div className="flex items-center space-x-1 w-full justify-between mt-2">
                          <div className="flex items-center space-x-1">
                            <Text size="xs" as="p" className="text-gray-800">
                              Experience -
                            </Text>
                            <Heading size="s" as="p" className="text-teal-900">
                              {required_experience_years}
                            </Heading>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Text size="xs" as="p" className="text-gray-800">
                              Salary -
                            </Text>
                            <Heading size="s" as="p" className="text-gray-800">
                              {pay_from} - {pay_to}
                            </Heading>
                          </div>
                        </div>
                      </div>
                      <div className="mt-[13px] h-[2px] self-stretch bg-gray-500_33" />
                      {/* <div className="mt-[15px] flex w-[95%] flex-col items-start gap-[9px] md:w-full">
                        <Heading size="s" as="p" className="!text-gray-800_01">
                          Skills
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
                      </div> */}
                    </div>
                  );
                })
              ) : loading ? (
                <div className="flex flex-1 items-start justify-start">
                  <Text size="lg" as="h1" className="text-gray-500">
                    Fethching Jobs...
                  </Text>
                </div>
              ) : (
                <div className="flex flex-1 items-start justify-start">
                  <Text size="lg" as="h1" className="text-gray-500">
                    No jobs found
                  </Text>
                </div>
              )}
            </div>
            {/* <HomepagePagination /> */}
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
