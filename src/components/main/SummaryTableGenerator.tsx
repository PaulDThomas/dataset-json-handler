import { ContextWindowStack } from "@asup/context-menu";
import { useContext } from "react";
import { DSJContext } from "../../context/DSJContextProvider";
import { SummaryTableContextProvider } from "../../context/SummaryTableContext";
import { DropTable } from "../drop-table/DropTable";
import { ItemList } from "../lhs/ItemList";
import { SummaryTableWhere } from "../where-clause-condition/SummaryTableWhere";
import { SummaryStateButton } from "./SummaryStateButton";
import { GroupList } from "../lhs/GroupList";

export const SummaryTableGenerator = (): JSX.Element => {
  const { state } = useContext(DSJContext);
  return (
    <>
      {!state.datasetJson ? (
        <></>
      ) : (
        <ContextWindowStack>
          <SummaryTableContextProvider dataset={state.datasetJson}>
            <div className="summarytablegenerator">
              <div className="simpletable-title-holder">
                <h5 className="simpletable-title">Summary table for: {state.datasetJson.name}</h5>
                <SummaryStateButton />
              </div>
              <div
                className="summarytable-main-holder"
                style={{ display: "flex", flexDirection: "row", height: "calc(100% - 46px)" }}
              >
                <div
                  className="small-scrollbar-holder"
                  style={{
                    minWidth: "190px",
                    width: "190px",
                    paddingRight: "6px",
                    height: "calc(100% - 8px)",
                  }}
                >
                  <div className="summarytable-lhs small-scrollbar">
                    <ItemList id={"summarytable-item-list"} />
                  </div>
                </div>
                <div
                  className="small-scrollbar-holder"
                  style={{
                    minWidth: "260px",
                    width: "260px",
                    paddingRight: "4px",
                    height: "calc(100% - 8px)",
                  }}
                >
                  <div className="summarytable-table-groups small-scrollbar">
                    <GroupList id="summarytable-group-list" />
                  </div>
                </div>
                <div
                  className="small-scrollbar-holder"
                  style={{
                    minWidth: "500px",
                    width: "calc(100%)",
                    height: "calc(100% - 8px)",
                  }}
                >
                  <div
                    className="summarytable-rhs small-scrollbar"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <SummaryTableWhere />
                    <DropTable id={"summarytable"} />
                  </div>
                </div>
              </div>
            </div>
          </SummaryTableContextProvider>
        </ContextWindowStack>
      )}
    </>
  );
};
