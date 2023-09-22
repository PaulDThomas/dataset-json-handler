import { useContext, useState } from "react";
import { ListingContext, ListingHeader } from "../../context/ListingContext";
import { UPDATE_COLUMN } from "../../context/lsReducer";

interface MarkDownEditProps {
  rowData: ListingHeader;
}

export const MarkDownEdit = ({ rowData }: MarkDownEditProps): JSX.Element => {
  const { dispatch } = useContext(ListingContext);
  const [currentValue, setCurrentValue] = useState<string>(rowData.md);
  return (
    <>
      <input
        id={`${rowData.item.OID}-md-input`}
        value={currentValue}
        onChange={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setCurrentValue(e.currentTarget.value);
        }}
        onBlur={(e) => {
          e.preventDefault();
          e.stopPropagation();
          const columnUpdate = { ...rowData, md: currentValue };
          dispatch({ operation: UPDATE_COLUMN, columnUpdate });
        }}
      />
    </>
  );
};
