import { iSimpleTableRow } from "@asup/simple-table";

export const RenderMarkDown = (rowData: iSimpleTableRow, markDown: string): JSX.Element => {
  return (
    <>
      {markDown.replace(/\[(.*?)\]/gi, (match, $1) =>
        Object.keys(rowData).includes($1) ? (rowData[$1] as string) : match,
      )}
    </>
  );
};
