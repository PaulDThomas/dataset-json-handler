import { iSimpleTableField, simpleTableSortFn } from "@asup/simple-table";

export const fieldsForItems: iSimpleTableField[] = [
  {
    name: "itemOID",
    label: "itemOID",
    sortFn: simpleTableSortFn,
    searchFn: (row, text) =>
      (row.name as string).toLocaleLowerCase().includes(text.toLocaleLowerCase()),
  },
  { name: "name", label: "Name", sortFn: simpleTableSortFn },
  { name: "label", label: "Label", sortFn: simpleTableSortFn },
  { name: "type", label: "Type", sortFn: simpleTableSortFn, canColumnFilter: true },
  { name: "length", label: "Length", sortFn: simpleTableSortFn },
];
