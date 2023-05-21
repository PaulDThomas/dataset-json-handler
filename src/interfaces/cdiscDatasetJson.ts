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
          type: 'string' | 'integer';
          length?: number;
        }[];
        itemData: (string | number | null)[][];
      };
    };
  };
}
