import { useContext, useState } from "react";
import { ListingContext, ListingHeader } from "../../context/ListingContext";
import { UPDATE_COLUMN } from "../../context/lsReducer";

interface LabelEditProps {
  rowData: ListingHeader;
}

export const LabelEdit = ({ rowData }: LabelEditProps): JSX.Element => {
  const { dispatch } = useContext(ListingContext);
  const [currentValue, setCurrentValue] = useState<string>(rowData.label);
  return (
    <>
      <input
        id={`${rowData.item.OID}-label-input`}
        value={currentValue}
        onChange={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setCurrentValue(e.currentTarget.value);
        }}
        onBlur={(e) => {
          e.preventDefault();
          e.stopPropagation();
          const columnUpdate = { ...rowData, label: currentValue };
          dispatch({ operation: UPDATE_COLUMN, columnUpdate });
        }}
      />
    </>
  );
};
