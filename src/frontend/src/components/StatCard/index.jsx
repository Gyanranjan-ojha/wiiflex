import { useGoTo } from "../../lib/utils";
import { Img } from "../Img";
import { Text } from "../Text";

const StatCard = ({ title, number, iconSrc, total_screening_tests_count }) => {
  const goTo = useGoTo();
  return (
    <div
      className="bg-white rounded-lg cursor-pointer shadow relative p-2 pt-4 flex items-center bg-[#f3f8ff] transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
      onClick={() => goTo("/screen-test-sent/candidates")}
    >
      <div className="w-auto h-auto min-w-[20%] min-h-[35%] flex justify-center items-center absolute border-[1px] bg-[#f3f8ff] border-cyan-900 top-[-18px] left-[-12px] bg-white rounded-xl p-1 shadow">
        <Text className="text-lg !font-bold !text-cyan-900">
          {total_screening_tests_count}
        </Text>
      </div>
      <div className="ml-1">
        <Text className="text-gray-500 text-base mr-1">{title}</Text>
      </div>
      <Img src={iconSrc} alt={title} className="h-12 w-12 !ml-1" />
    </div>
  );
};

export default StatCard;
