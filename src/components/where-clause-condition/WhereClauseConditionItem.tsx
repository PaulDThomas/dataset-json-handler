import { useContext } from "react";
import { DatasetJsonItemClass } from "../../classes/DatasetJsonItemClass";
import { WhereClauseConditionClass } from "../../classes/WhereClauseConditionClass";
import { SummaryTableContext } from "../../context/SummaryTableContext";
import { UPDATE_WHERE_CLAUSE_CONDITION } from "../../context/stReducer";
import { DropTarget } from "../drop-targets/DropTarget";
import { DraggableItem } from "../lhs/DraggableItem";

interface WhereClauseConditionItemProps {
  id: string;
}

export const WhereClauseConditionItem = ({ id }: WhereClauseConditionItemProps): JSX.Element => {
  const { state, dispatch } = useContext(SummaryTableContext);
  const whereClauseCondition = state.whereClauseConditions.find((w) => w.id === id);

  return !whereClauseCondition ? (
    <></>
  ) : (
    <div
      className="itemholder-main"
      style={{
        position: "relative",
        width: "166px",
        height: "40px",
      }}
    >
      <DropTarget
        id={`whereclauseconditionitem-${id}-droptarget`}
        type="center"
        dropAction={(ret) => {
          if (ret.data instanceof DatasetJsonItemClass) {
            dispatch({
              operation: UPDATE_WHERE_CLAUSE_CONDITION,
              whereClauseCondition: new WhereClauseConditionClass({
                id: id,
                item: ret.data.data,
                whereOperation: whereClauseCondition.whereOperation ?? null,
                filteredItemValues: whereClauseCondition.filteredItemValues,
              }),
            });
          }
        }}
      >
        {whereClauseCondition.item ? (
          <DraggableItem
            id={`whereclauseconditionitem-${id}`}
            oid={whereClauseCondition.item.OID}
          />
        ) : (
          <div
            id={`whereclauseconditionitem-${id}`}
            className="item-holder"
          />
        )}
      </DropTarget>
    </div>
  );
};

WhereClauseConditionItem.displayName = "WhereClauseConditionItem";
