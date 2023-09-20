import { SimpleTable } from "@asup/simple-table";
import { useContext } from "react";
import { DSJContext } from "../../context/DSJContextProvider";

export const PaneForData = () => {
  const { state } = useContext(DSJContext);
  return (
    <>
      {!state.datasetJson ? (
        <></>
      ) : (
        <div>
          <SimpleTable
            id="data-table"
            fields={state.datasetJson.simpleTableFields}
            keyField={"__rowNumber"}
            data={state.datasetJson ? state.datasetJson.dataRows : []}
            headerLabel="Data"
          />
        </div>
      )}
    </>
  );
};
