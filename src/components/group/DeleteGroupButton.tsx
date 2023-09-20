import { useContext } from "react";
import { SummaryTableContext } from "../../context/SummaryTableContext";
import { DELETE_GROUP } from "../../context/stReducer";

interface DeleteGroupButtonProps {
  id: string;
}

export const DeleteGroupButton = ({ id }: DeleteGroupButtonProps) => {
  const { dispatch } = useContext(SummaryTableContext);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch({ operation: DELETE_GROUP, deleteId: id });
      }}
      title="Delete group"
      className="delete-button"
    >
      x
    </button>
  );
};

DeleteGroupButton.displayName = "DeleteGroupButton";
