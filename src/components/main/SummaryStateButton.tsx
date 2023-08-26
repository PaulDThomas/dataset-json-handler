import { useContext } from "react";
import { SummaryTableContext } from "../../context/SummaryTableContext";
import { JsonWindowButton } from "../utility/JsonWindowButton";
import { SaveSummaryTableButton } from "./SaveSummaryTableButton";

export const SummaryStateButton = () => {
  const summaryTableContext = useContext(SummaryTableContext);
  return (
    <>
      <SaveSummaryTableButton />
      <JsonWindowButton
        id="summary-state-button"
        title="Summary table context state"
        object={summaryTableContext.state}
      />
    </>
  );
};
