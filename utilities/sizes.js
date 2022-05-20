import { Dimensions } from "react-native";
import Interpolator from "./Interpolator";

const screenHeight = Dimensions.get("screen").height;
const screenWidth = Dimensions.get("screen").width;

const getHeights = () => {
  let items = {};
  for (let i = 10; i <= 100; i += 5) {
    items[`height${i}p`] = screenHeight * (i / 100);
  }
  return items;
};

const getWidths = () => {
  let items = {};
  for (let i = 10; i <= 100; i += 5) {
    items[`width${i}p`] = screenWidth * (i / 100);
  }
  return items;
};

export const widths = getWidths();
export const heights = getHeights();
