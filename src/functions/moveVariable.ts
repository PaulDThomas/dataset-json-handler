import { DatasetJsonItemClass } from '../classes/DatasetJsonItemClass';

export const moveVariable = (
  originalArray: DatasetJsonItemClass[],
  variable: DatasetJsonItemClass,
  newPosition: number,
): DatasetJsonItemClass[] => {
  const ix = originalArray.findIndex((v) => v.OID === variable.OID ?? '');
  console.log(`Moving variable to ${newPosition} from ${ix}`);
  const newArray: DatasetJsonItemClass[] = [...originalArray];
  if (ix >= 0) {
    console.log('Moving');
    newArray.splice(ix, 1);
    newArray.splice(
      ix >= newPosition ? newPosition : newPosition - 1,
      0,
      variable as DatasetJsonItemClass,
    );
  } else {
    console.log(`Adding ${variable.name}`);
    newArray.splice(newPosition, 0, variable);
  }
  return newArray;
};
