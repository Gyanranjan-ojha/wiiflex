import { useState } from "react";
import { Text } from "../Text";

const ExpandableText = ({
  text,
  initialMaxLength = 50,
  finalMaxLength = 250,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleIsExpanded = (event) => {
    event.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  if (text.length <= initialMaxLength) {
    return <p className="mt-2 !text-gray-800_01">{text}</p>;
  }

  const getDisplayText = () => {
    if (text.length <= initialMaxLength) {
      return text;
    }

    if (isExpanded) {
      // Check if the actual length of text is less than the finalMaxLength
      return text.length > finalMaxLength
        ? `${text.substring(0, finalMaxLength)}...`
        : text;
    } else {
      // Always truncate to initialMaxLength if not expanded
      return `${text.substring(0, initialMaxLength)}...`;
    }
  };

  const displayText = getDisplayText();

  return (
    <Text size="s" as="p" className="mt-2 !text-gray-800_01">
      {displayText}
      <strong
        className="text-gray-800_01 cursor-pointer"
        onClick={toggleIsExpanded}
      >
        {isExpanded ? " See Less" : " See More"}
      </strong>
    </Text>
  );
};

export default ExpandableText;
