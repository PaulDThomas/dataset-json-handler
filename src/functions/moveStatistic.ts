import { eStatistic } from '../interfaces/summaryInterfaces';

export const moveStatistic = (
  originalArray: eStatistic[],
  newStatistic: eStatistic,
  newPosition: number,
): eStatistic[] => {
  const ix = originalArray.findIndex((s) => s === newStatistic);
  console.log(`Moving statistic to ${newPosition} from ${ix}`);
  const newArray: eStatistic[] = [...originalArray];
  if (ix >= 0) {
    console.log('Moving');
    newArray.splice(ix, 1);
    newArray.splice(ix >= newPosition ? newPosition : newPosition - 1, 0, newStatistic);
  } else {
    console.log('Adding');
    newArray.splice(newPosition, 0, newStatistic);
  }
  return newArray;
};
