import { Heading } from "../Heading";
import { Img } from "../Img";

const FormCoverImg = () => {
  return (
    <div className="flex w-1/2 min-h-full flex-col items-center justify-start bg-blue-100 pt-[51px] md:w-full md:gap-[84px] md:p-5 md:pb-5 sm:gap-14 sm:py-5 sm:pl-5">
      <Heading size="6xl" as="h1" className="!text-white-A700 md:ml-0">
        Connect. Merge. Work
      </Heading>
      <Img
        src="/images/img_abstraction.png"
        alt="abstraction"
        className="h-auto max-h-[82vh] w-[87%] self-center object-contain"
      />
    </div>
  );
};

export default FormCoverImg;
