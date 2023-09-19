import { useContext } from "react";
import { DSJContext } from "../../context/DSJContextProvider";
import { SummaryTableContext } from "../../context/SummaryTableContext";
import { getARS } from "../../functions/getARS";
import { JsonWindowButton } from "../utility/JsonWindowButton";
import { SaveSummaryTableButton } from "./SaveSummaryTableButton";

export const SummaryStateButton = () => {
  const summaryTableContext = useContext(SummaryTableContext);
  const { state: dsjState } = useContext(DSJContext);
  return (
    <>
      <SaveSummaryTableButton />
      <JsonWindowButton
        id="summary-state-button"
        title="Summary table context state"
        object={summaryTableContext.state}
      />
      <JsonWindowButton
        id="ars-button"
        buttonLabel="ARS"
        title="ARS output"
        object={getARS(summaryTableContext.state, dsjState.datasetJson?.name ?? "DATASET")}
        canSave
      />
    </>
  );
};
