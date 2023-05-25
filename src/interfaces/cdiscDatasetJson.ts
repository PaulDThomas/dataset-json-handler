import { eVariableType } from '../classes/DatasetJsonItemClass';

export interface CdiscDatasetJson {
  clinicalData: {
    studyOID: string;
    metaDataVersionOID: string;
    itemGroupData: {
      [key: string]: {
        records: number;
        name: string;
        label: string;
        items: {
          OID: string;
          name: string;
          label: string;
          type: eVariableType;
          length?: number;
        }[];
        itemData: (string | number | null)[][];
      };
    };
  };
}
