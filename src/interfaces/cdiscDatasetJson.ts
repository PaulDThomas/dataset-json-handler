import { DatasetJsonItem } from "classes/DatasetJsonItemClass";
import { DataRow } from "main";

/**
 * CDISC implementation of Dataset JSON typescript interface
 */
export interface CdiscDatasetJson {
  datasetJSONCreationDateTime: string;
  datasetJSONVersion: string;
  fileOID: string;
  dbLastModifiedDateTime: string;
  originator: string;
  sourceSystem: {
    name: string;
    version: string;
  };
  studyOID: string;
  metaDataVersionOID: string;
  metaDataRef: string;
  itemGroupOID: string;
  records: number;
  name: string;
  label: string;
  columns: DatasetJsonItem[];
  rows: DataRow[];
}
