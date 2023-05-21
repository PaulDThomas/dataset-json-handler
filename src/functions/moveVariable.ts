import { SummaryVariable } from '../interfaces/DatasetJsonItem';

export const moveVariable = (
  originalArray: SummaryVariable[],
  variable: SummaryVariable,
  newPosition: number,
): SummaryVariable[] => {
  const ix = originalArray.findIndex((v) => v.OID === variable.OID ?? '');
  console.log(`Moving variable to ${newPosition} from ${ix}`);
  const newArray: SummaryVariable[] = [...originalArray];
  if (ix >= 0) {
    console.log('Moving');
    newArray.splice(ix, 1);
    newArray.splice(
      ix >= newPosition ? newPosition : newPosition - 1,
      0,
      variable as SummaryVariable,
    );
  } else {
    console.log(`Adding ${variable.name}`);
    newArray.splice(newPosition, 0, variable);
  }
  return newArray;
};
