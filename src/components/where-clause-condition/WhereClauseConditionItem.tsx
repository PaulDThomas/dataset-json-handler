import { useContext } from "react";
import { DatasetJsonItemClass } from "../../classes/DatasetJsonItemClass";
import { WhereClauseConditionClass } from "../../classes/WhereClauseConditionClass";
import { SummaryTableContext } from "../../context/SummaryTableContext";
import { UPDATE_WHERE_CLAUSE_CONDITION } from "../../context/stReducer";
import { DropTarget } from "../drop-targets/DropTarget";
import { DraggableItem } from "../lhs/DraggableItem";

interface WhereClauseConditionItemProps {
  index: number;
}

export const WhereClauseConditionItem = ({ index }: WhereClauseConditionItemProps): JSX.Element => {
  const { state, dispatch } = useContext(SummaryTableContext);

  return (
    <div
      className="itemholder-main"
      style={{
        position: "relative",
        width: "166px",
        height: "40px",
      }}
    >
      <DropTarget
        id={`whereclauseconditionitem-${index}-droptarget`}
        type="center"
        dropAction={(ret) => {
          if (ret.data instanceof DatasetJsonItemClass) {
            dispatch({
              operation: UPDATE_WHERE_CLAUSE_CONDITION,
              whereClauseCondition: new WhereClauseConditionClass({
                id: state.whereClauseConditions[index]?.id,
                item: ret.data,
                whereOperation: state.whereClauseConditions[index]?.whereOperation ?? null,
                filteredItemValues: state.whereClauseConditions[index]?.filteredItemValues,
              }),
            });
          }
        }}
      >
        {state.whereClauseConditions[index].item ? (
          <DraggableItem
            id={`whereclauseconditionitem-${index}`}
            oid={(state.whereClauseConditions[index].item as DatasetJsonItemClass).OID}
          />
        ) : (
          <div
            id={`whereclauseconditionitem-${index}`}
            className="item-holder"
          />
        )}
      </DropTarget>
    </div>
  );
};
