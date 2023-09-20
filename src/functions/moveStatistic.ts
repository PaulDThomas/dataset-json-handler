import { eStatistic } from "enums/eStatistic";

export const moveStatistic = (
  originalArray: eStatistic[],
  newStatistic: eStatistic,
  newPosition: number,
): eStatistic[] => {
  const ix = originalArray.findIndex((s) => s === newStatistic);
  const newArray: eStatistic[] = [...originalArray];
  if (ix >= 0) {
    newArray.splice(ix, 1);
    newArray.splice(ix >= newPosition ? newPosition : newPosition - 1, 0, newStatistic);
  } else {
    newArray.splice(newPosition, 0, newStatistic);
  }
  return newArray;
};
