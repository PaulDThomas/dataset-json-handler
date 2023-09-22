import { useContext } from "react";
import { SummaryTableContext } from "../../context/SummaryTableContext";
import "./DropTableColumnVariable.css";

interface DropTableHeaderVariableProps {
  id: string;
  index: number;
}

export const DropTableColumnVariable = ({ index }: DropTableHeaderVariableProps): JSX.Element => {
  const { state } = useContext(SummaryTableContext);

  return <th>{state.columns[index]}</th>;
};

DropTableColumnVariable.displayName = "DropTableColumnVariable";
