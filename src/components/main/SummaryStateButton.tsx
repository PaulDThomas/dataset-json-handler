import { useContext } from "react";
import { SummaryTableContext } from "../../context/SummaryTableContext";
import { JsonWindowButton } from "../utility/JsonWindowButton";

export const SummaryStateButton = () => {
  const summaryTableContext = useContext(SummaryTableContext);
  return (
    <JsonWindowButton
      id="summary-state-button"
      title="Summary table context state"
      object={summaryTableContext.state}
    />
  );
};
