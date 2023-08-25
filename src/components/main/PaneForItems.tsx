import { SimpleTable } from "@asup/simple-table";
import { fieldsForItems } from "../../consts/fieldsForItems";
import { useContext } from "react";
import { DSJContext } from "../../context/DSJContextProvider";

export const PaneForItems = () => {
  const { state } = useContext(DSJContext);
  return (
    <>
      {!state.datasetJson ? (
        <></>
      ) : (
        <div>
          <SimpleTable
            id="items-table"
            fields={fieldsForItems}
            keyField={"OID"}
            data={state.datasetJson ? state.datasetJson.items.map((item) => item.data) : []}
            headerLabel="Items"
            showSearch={true}
            showFilter
          />
        </div>
      )}
    </>
  );
};
