import { eItemType } from '../classes/DatasetJsonItemClass';

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
          type: eItemType;
          length?: number;
        }[];
        itemData: (string | number | null)[][];
      };
    };
  };
}
