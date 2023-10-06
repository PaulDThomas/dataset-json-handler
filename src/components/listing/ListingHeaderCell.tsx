import { ContextMenuHandler, ContextWindow } from "@asup/context-menu";
import { iSimpleTableField } from "@asup/simple-table";
import { useContext, useState } from "react";
import { DatasetJsonItemClass } from "../../main";
import { DropTarget } from "../drop-targets/DropTarget";
import { ListingContext } from "./ListingContext";
import { ADD_COLUMN, REMOVE_COLUMN, UPDATE_COLUMN } from "./functions/lsReducer";

interface ListingHeaderCellProps {
  columnNumber: number;
  field: iSimpleTableField;
}

export const ListingHeaderCell = ({ columnNumber, field }: ListingHeaderCellProps) => {
  const { state, dispatch } = useContext(ListingContext);
  const [showProperties, setShowProperties] = useState<boolean>(false);
  // Capture variable to ensure refreshes
  const col = state.listingHeaders[columnNumber];

  return (
    <>
      <ContextMenuHandler
        menuItems={[
          {
            label: "Remove",
            action: () => {
              dispatch({ operation: REMOVE_COLUMN, columnPosition: columnNumber });
            },
          },
          { label: "Properties", action: () => setShowProperties(true) },
        ]}
      >
        <div style={{ marginTop: "16px" }}>
          <DropTarget
            id="lastId"
            allowableTypes={["datasetjsonitem"]}
            style={{
              position: "absolute",
              color: "forestgreen",
              backgroundColor: "greenyellow",
              left: columnNumber === 0 ? "-4px" : "-16px",
              top: 0,
              paddingLeft: "4px",
              paddingRight: "4px",
              paddingBottom: "4px",
              fontSize: "12px",
              opacity: "0.7",
            }}
            dropAction={(ret) =>
              ret.data instanceof DatasetJsonItemClass &&
              dispatch({ operation: ADD_COLUMN, newColumn: ret.data, columnPosition: columnNumber })
            }
          >
            &#8853;
          </DropTarget>
          {columnNumber + 1 === state.listingHeaders.length && (
            <DropTarget
              id="lastId"
              allowableTypes={["datasetjsonitem"]}
              style={{
                position: "absolute",
                color: "forestgreen",
                backgroundColor: "greenyellow",
                right: "-4px",
                top: 0,
                paddingLeft: "4px",
                paddingRight: "4px",
                paddingBottom: "4px",
                fontSize: "12px",
                opacity: "0.7",
              }}
              dropAction={(ret) =>
                ret.data instanceof DatasetJsonItemClass &&
                dispatch({
                  operation: ADD_COLUMN,
                  newColumn: ret.data,
                  columnPosition: columnNumber + 1,
                })
              }
            >
              &#8853;
            </DropTarget>
          )}

          <span>{col.label}</span>
        </div>
      </ContextMenuHandler>
      <ContextWindow
        id={`listing-properties-colno-${columnNumber}`}
        title={`Properties for column ${columnNumber + 1}`}
        visible={showProperties}
        onClose={() => setShowProperties(false)}
      >
        <table>
          <tbody>
            <tr>
              <td>Item</td>
              <td>{field.name}</td>
            </tr>
            <tr>
              <td>Label</td>
              <td>
                <input
                  value={col.label}
                  onChange={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    dispatch({
                      operation: UPDATE_COLUMN,
                      columnUpdate: { ...col, label: e.currentTarget.value },
                    });
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>Markdown</td>
              <td>
                <input
                  value={col.md}
                  onChange={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    dispatch({
                      operation: UPDATE_COLUMN,
                      columnUpdate: { ...col, md: e.currentTarget.value },
                    });
                  }}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </ContextWindow>
    </>
  );
};
