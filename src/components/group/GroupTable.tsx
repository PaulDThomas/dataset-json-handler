import { useContext, useState } from "react";
import { SummaryTableContext } from "../../context/SummaryTableContext";
import { UPDATE_GROUP } from "../../context/stReducer";
import { AnalysisGroupClass, DatasetJsonItemClass } from "../../main";
import { DebouncedInput } from "../utility/DebouncedInput";
import "./GroupTable.css";
import { InGroupItem } from "./InGroupItem";
import { DraggableGroupId } from "./DraggableGroupId";
import { DeleteGroupButton } from "./DeleteGroupButton";
import { ContextWindow } from "@asup/context-menu";
import { AnalGroupLevels } from "./AnalysisGroupLevels";

interface GroupWindowProperties {
  groupId: string;
}

export const GroupTable = ({ groupId }: GroupWindowProperties) => {
  const { state, dispatch } = useContext(SummaryTableContext);

  const groupIndex = state.groupList.findIndex((g) => g.id === groupId);
  const group = groupIndex > -1 ? state.groupList[groupIndex] : null;
  const [showLevelsWindow, setShowLevelsWindow] = useState<boolean>(false);

  return !group ? (
    <div>Group ${groupId} not found</div>
  ) : (
    <table className="group-table">
      <tbody>
        <tr>
          <td>Id</td>
          <td style={{ lineHeight: "0", verticalAlign: "top" }}>
            <DraggableGroupId id={groupId} />
            <DeleteGroupButton id={groupId} />
          </td>
        </tr>
        <tr>
          <td>Label</td>
          <td>
            <DebouncedInput
              style={{ width: "157px" }}
              value={group.label}
              setValue={(ret) => {
                group.label = ret;
                dispatch({ operation: UPDATE_GROUP, group });
              }}
            />
          </td>
        </tr>
        <tr>
          <td>Values from</td>
          <td>
            <InGroupItem
              id="valuesFrom"
              groupId={group.id}
              item={group.valueItem}
              dropAction={(ret: DatasetJsonItemClass) => {
                group.valueItem = ret;
                dispatch({ operation: UPDATE_GROUP, group });
              }}
            />
          </td>
        </tr>
        {group instanceof AnalysisGroupClass ? (
          <>
            <tr>
              <td>Order by</td>
              <td>
                {" "}
                {/* TODO: need to ensure this is a numeric variable */}
                <InGroupItem
                  id="orderBy"
                  groupId={group.id}
                  item={group.orderItem}
                  dropAction={(ret: DatasetJsonItemClass) => {
                    group.orderItem = ret;
                    dispatch({ operation: UPDATE_GROUP, group });
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>Big N?</td>
              <td>
                <input
                  type="checkbox"
                  checked={group.bigN}
                  onChange={(e) => {
                    e.stopPropagation();
                    group.bigN = !group.bigN;
                    dispatch({ operation: UPDATE_GROUP, group });
                  }}
                />
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowLevelsWindow(true);
                  }}
                >
                  Show levels
                </button>
                <ContextWindow
                  id={""}
                  visible={showLevelsWindow}
                  title={`${group.label} levels`}
                  onClose={() => setShowLevelsWindow(false)}
                >
                  <AnalGroupLevels id={group.id} />
                </ContextWindow>
              </td>
            </tr>
          </>
        ) : (
          <>
            <tr></tr>
          </>
        )}
      </tbody>
    </table>
  );
};

GroupTable.displayName = "GroupTable";
