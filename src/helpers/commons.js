import { Dimensions } from "react-native";

const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");
// width percentage
export const wp = (percentage = 0) => {
  const width = deviceWidth;
  return (percentage * width) / 100;
};

// height percentage
export const hp = (percentage = 0) => {
  const height = deviceHeight;
  return (percentage * height) / 100;
};

// truncate text
export const truncateText = (text, length) => {
  if (text.length <= length) return text;
  return text.substring(0, length) + "...";
};
