import { useContext } from "react";
import { SummaryTableContext } from "../../context/SummaryTableContext";
import { ADD_ANAL_GROUP, ADD_DATA_GROUP } from "../../context/stReducer";
import "./AddGroupButton.css";

export const AddGroupButton = () => {
  const { dispatch } = useContext(SummaryTableContext);

  return (
    <>
      <button
        className="add-group-button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          dispatch({ operation: ADD_DATA_GROUP, newId: crypto.randomUUID() });
        }}
      >
        {"\u2295"} data
      </button>
      <button
        className="add-group-button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          dispatch({ operation: ADD_ANAL_GROUP, newId: crypto.randomUUID() });
        }}
      >
        {"\u2295"} analysis
      </button>
    </>
  );
};
