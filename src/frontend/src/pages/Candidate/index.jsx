import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button, Heading, Text, Img } from "../../components";
import Navbar from "../../components/Navbar";
import VideoPlayer from "../../components/VideoPlayer";
import ErrorBoundary from "../../components/ErrorBoundry";
import { useGoTo } from "../../lib/utils";
import ExpandableText from "../../components/ExpandableText";

export default function CandidatePage() {
  const goTo = useGoTo();
  const { jobId } = useParams();
  const longText =
    "Had 5 years of working experience as design lead. Working fora reputated company. Had 5 years of working experience as design lead. Working fora reputated company.Had 5 years of working experience as design lead.";

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
      <div className="flex w-full flex-col items-center justify-center gap-5 bg-white-A700 pt-[21px] sm:pt-5">
        <div className="flex w-[50%] max-w-[768px] flex-col items-center gap-[428px] mb-[61px] md:w-full md:gap-[321px] md:p-5 sm:gap-[214px]">
          <div className="flex w-full items-start justify-center gap-3.5 rounded border-[0.5px] border-solid border-gray-200_03 bg-white-A700 pb-[31px] pl-3.5 pr-4 pt-4 md:w-full md:flex-col sm:pb-5">
            <div className="w-[10%] h-[10%] md:w-full md:p-5">
              <Img
                src="/images/img_9650.png"
                alt="circleimage"
                className="h-full w-full rounded-[50%] object-cover"
              />
            </div>
            <div className="flex w-[89%] flex-col items-start md:self-stretch">
              <div className="flex items-start justify-between gap-5 self-stretch">
                <Heading as="h1" className="!text-light_blue-700">
                  John Doe
                </Heading>
                <div className="flex items-center gap-[18px]">
                  <Img
                    src="/images/img_favorite.svg"
                    alt="favorite"
                    className="h-[15px] w-[16px] self-start"
                  />
                  <div className="h-full w-[4px] bg-black-900" />
                </div>
              </div>
              <ExpandableText
                text={longText}
                initialMaxLength={80}
                finalMaxLength={200}
              />
              <div className="mt-[18px] flex w-[31%] items-center justify-between gap-5 md:w-full">
                <div className="flex flex-col items-start pt-px">
                  <Text size="xs" as="p">
                    City
                  </Text>
                  <Heading as="h2" className="self-center">
                    BEN
                  </Heading>
                </div>
                <div className="flex flex-col items-start">
                  <Text size="xs" as="p">
                    State
                  </Text>
                  <Heading as="h3" className="h-[20px] w-[21px]">
                    KA
                  </Heading>
                </div>
                <div className="flex flex-col items-start pt-px">
                  <Text size="xs" as="p">
                    Country
                  </Text>
                  <Heading as="h4">INDIA</Heading>
                </div>
              </div>
              <Heading size="s" as="h5" className="mt-5 !text-gray-800_01">
                Applicant Video:
              </Heading>
              <div className="relative mt-2 h-[309px] self-stretch md:h-auto">
                <div className="h-[192px] w-[62%] rounded border-[0.5px] border-solid border-gray-200_03 bg-white-A700" />
                <div className="absolute bottom-0 left-0 right-0 top-0 m-auto h-max w-full rounded-tl-[3px] rounded-tr-[3px] bg-gray-100_01 md:pr-5 sm:px-5">
                  <div className="relative h-[309px] md:h-auto">
                    <VideoPlayer />
                  </div>
                </div>
              </div>
              <div className="mt-[19px] flex w-full flex-col items-start gap-[9px] md:w-full">
                <Heading size="s" as="h6" className="!text-gray-800_01">
                  Skills
                </Heading>
                <div className="flex gap-2.5 justify-start">
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
                    className="min-w-[98px] rounded-[17px] border-[0.5px] border-solid border-gray-200_03"
                  >
                    Adobe
                  </Button>
                </div>
              </div>
              <div className="mt-[29px] flex w-full md:w-full">
                <div className="flex w-full flex-col items-start">
                  <Heading size="s" as="p" className="!text-gray-800_01">
                    Applicant Note:
                  </Heading>
                  <Text
                    size="s"
                    as="p"
                    className="mt-2 w-full leading-[19px] !text-gray-800_01 md:w-full"
                  >
                    <>
                      Just saw your job application. I think i am perfect fit
                      for <br />
                      all your requirements and can start from your desired
                      time. Lets talk in details in a interview.
                    </>
                  </Text>
                  <div className="mt-5 flex items-center justify-between gap-5 self-stretch">
                    <Button
                      size="xl"
                      shape="round"
                      className="!bg-white-A700 text-light_blue-700 border-[1px] border-light_blue-700 min-w-[246px] font-bold transition-transform duration-300 hover:scale-105 sm:px-5"
                      onClick={() => goTo(`/viewresume/${jobId}`)}
                    >
                      See Resume
                    </Button>
                    <Button
                      size="xl"
                      shape="round"
                      className="min-w-[246px] font-bold px transition-transform duration-300 hover:scale-105 sm:px-5"
                    >
                      Schedule Interview
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
