import { DatasetJsonItemClass } from "../classes/DatasetJsonItemClass";

export const moveVariable = (
  originalArray: DatasetJsonItemClass[],
  variable: DatasetJsonItemClass,
  newPosition: number,
): DatasetJsonItemClass[] => {
  const ix = originalArray.findIndex((v) => v.OID === variable.OID ?? "");
  const newArray: DatasetJsonItemClass[] = [...originalArray];
  if (ix >= 0) {
    newArray.splice(ix, 1);
    newArray.splice(
      ix >= newPosition ? newPosition : newPosition - 1,
      0,
      variable as DatasetJsonItemClass,
    );
  } else {
    newArray.splice(newPosition, 0, variable);
  }
  return newArray;
};
