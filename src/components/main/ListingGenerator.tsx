import { ContextWindowStack } from "@asup/context-menu";
import { ListingContextProvider } from "../../context/ListingContext";
import { useContext } from "react";
import { DSJContext } from "../../context/DSJContextProvider";
import { ListingStateButton } from "./ListingStateButton";
import { ItemList } from "../lhs/ItemList";
import { ListingPreview } from "../listing/ListingPreview";
import { ListingHeaderEditor } from "../listing/ListingHeaderEditor";

export const ListingGenerator = (): JSX.Element => {
  const { state } = useContext(DSJContext);
  return (
    <>
      {!state.datasetJson ? (
        <></>
      ) : (
        <ContextWindowStack>
          <ListingContextProvider dataset={state.datasetJson}>
            <div className="listing-generator">
              <div className="simpletable-title-holder">
                <h5 className="simpletable-title">Listing for: {state.datasetJson.name}</h5>
                <ListingStateButton />
              </div>
              <div
                className="listing-main-holder"
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
                  <div className="listing-lhs small-scrollbar">
                    <ItemList id={"listing-item-list"} />
                  </div>
                </div>
                <div
                  className="small-scrollbar-holder"
                  style={{
                    height: "calc(100% - 8px)",
                    width: "700px",
                    borderLeft: "2px dotted grey",
                    borderRight: "2px dotted grey",
                    paddingLeft: "2px",
                    paddingRight: "2px",
                  }}
                >
                  <div
                    className="summarytable-rhs small-scrollbar"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <ListingHeaderEditor />
                  </div>
                </div>
                <div
                  className="small-scrollbar-holder"
                  style={{
                    height: "calc(100% - 8px)",
                    width: "calc(100% - 890px)",
                  }}
                >
                  <div
                    className="summarytable-rhs small-scrollbar"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      paddingLeft: "2px",
                    }}
                  >
                    <ListingPreview />
                  </div>
                </div>
              </div>
            </div>
          </ListingContextProvider>
        </ContextWindowStack>
      )}
    </>
  );
};

ListingGenerator.displayName = "ListingGenerator";
