import { DataSetJsonItemClass } from '../classes/DatasetJsonItemClass';

export const moveVariable = (
  originalArray: DataSetJsonItemClass[],
  variable: DataSetJsonItemClass,
  newPosition: number,
): DataSetJsonItemClass[] => {
  const ix = originalArray.findIndex((v) => v.OID === variable.OID ?? '');
  console.log(`Moving variable to ${newPosition} from ${ix}`);
  const newArray: DataSetJsonItemClass[] = [...originalArray];
  if (ix >= 0) {
    console.log('Moving');
    newArray.splice(ix, 1);
    newArray.splice(
      ix >= newPosition ? newPosition : newPosition - 1,
      0,
      variable as DataSetJsonItemClass,
    );
  } else {
    console.log(`Adding ${variable.name}`);
    newArray.splice(newPosition, 0, variable);
  }
  return newArray;
};
