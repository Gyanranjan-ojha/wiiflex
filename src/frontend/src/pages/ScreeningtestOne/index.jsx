import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button, Heading, Text } from "../../components";
import ErrorBoundary from "../../components/ErrorBoundry";
import { useGoTo } from "../../lib/utils";

export default function ScreeningtestOnePage() {
  const goTo = useGoTo();

  const { jobId } = useParams();

  return (
    <ErrorBoundary>
      <Helmet>
        <title>WIIFLEX</title>
        <meta
          name="description"
          content="Web site created using create-react-app"
        />
      </Helmet>
      <div className="flex w-full flex-col items-center justify-start bg-white-A700 pt-6 md:p-5 sm:pt-5">
        <div className="mt-[51px] flex w-[55%] max-w-[565px] flex-col items-center md:w-full">
          <Heading size="3xl" as="h2" className="!text-teal-900">
            Add Screening Tests
          </Heading>
          <div className="mt-[25px] self-stretch pb-[18px]">
            <Text as="p" className="leading-[21px] !text-gray-600_01">
              <>
                You can add screening test for the candidates. If they pass,
                they will be welcome to have an interview in the next round.
              </>
            </Text>
          </div>
          <div className="mt-[61px] w-full flex items-center justify-between md:w-full">
            <Button
              size="xl"
              shape="round"
              className="!bg-white-A700 text-light_blue-700 border-[1px] border-light_blue-700 min-w-[246px] font-bold transition-transform duration-300 hover:scale-105 sm:px-5"
              onClick={() => goTo(`/viewresume/${jobId}`)}
            >
              Cancel
            </Button>
            <Button
              size="xl"
              shape="round"
              className="min-w-[246px] font-bold transition-transform duration-300 hover:scale-105 sm:px-5"
              onClick={() => goTo(`/screeningtesttwo/${jobId}`)}
            >
              Yes
            </Button>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
