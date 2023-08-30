import { simpleTableSortFn } from "@asup/simple-table";
import _ from "lodash";
import { useContext } from "react";
import { AnalysisGroupClass } from "../../classes/AnalysisGroup";
import { DatasetJsonItemClass } from "../../classes/DatasetJsonItemClass";
import { DSJContext } from "../../context/DSJContextProvider";
import { SummaryTableContext } from "../../context/SummaryTableContext";
import { ADD_ANAL_GROUP_LEVELS } from "../../context/stReducer";
import { WhereClauseClass, WhereClauseConditionClass } from "../../main";

interface AddDataLevelsButtonProps {
  id: string;
}

function itemLevelsToWhere(
  analysisGroup: AnalysisGroupClass,
  existingWhereConditions: WhereClauseClass[],
  itemLevels?: { order: number | string; value: string | number | Date }[],
): {
  newWhereClauses: WhereClauseClass[];
  newWhereClauseConditions: WhereClauseConditionClass[];
} {
  const ret: {
    newWhereClauses: WhereClauseClass[];
    newWhereClauseConditions: WhereClauseConditionClass[];
  } = { newWhereClauses: [], newWhereClauseConditions: [] };

  if (analysisGroup.valueItem && analysisGroup.orderItem) {
    itemLevels?.forEach((item) => {
      if (!existingWhereConditions.map((ew) => ew.order).includes(parseInt(`${item.order}`))) {
        const wcValue = new WhereClauseConditionClass({
          id: crypto.randomUUID(),
          item: (analysisGroup.valueItem as DatasetJsonItemClass).data,
          whereOperation: "eq",
          filteredItemValues: [item.value],
        });
        ret.newWhereClauseConditions.push(wcValue);
        // const wcOrder = new WhereClauseConditionClass({
        //   id: crypto.randomUUID(),
        //   item: orderItem,
        //   whereOperation: "eq",
        //   filteredItemValues: [item.order],
        // });
        const w = new WhereClauseClass({
          id: crypto.randomUUID(),
          label: item.value.toString(),
          order: parseInt(`${item.order}`),
          // TODO: This needs to be the compound id
          condition: wcValue.id,
        });
        ret.newWhereClauses.push(w);
      }
    });
  }
  return ret;
}

export const AddDataLevelsButton = ({ id }: AddDataLevelsButtonProps) => {
  const { state: dsjState } = useContext(DSJContext);
  const { state, dispatch } = useContext(SummaryTableContext);

  const analysisGroup = state.groupList.find((g) => g.id === id && g.type === "AnalysisGroup") as
    | AnalysisGroupClass
    | undefined;
  const itemLevels =
    analysisGroup && dsjState.datasetJson && analysisGroup.orderItem && analysisGroup.valueItem
      ? _.uniqWith(
          dsjState.datasetJson.dataRows.map((r) => ({
            order: r[(analysisGroup.orderItem as DatasetJsonItemClass).name] as number,
            value: r[(analysisGroup.valueItem as DatasetJsonItemClass).name] as
              | string
              | number
              | Date,
          })),
          (a, b) => _.isEqual(a, b),
        ).sort((a, b) => simpleTableSortFn(a, b, { name: "order", asc: true }))
      : [];
  const { newWhereClauses, newWhereClauseConditions } = analysisGroup
    ? itemLevelsToWhere(
        analysisGroup,
        (analysisGroup.levels
          ?.map((l) => state.whereClauses.find((w) => w.id === l))
          .filter((w) => w !== undefined) as WhereClauseClass[]) ?? [],
        itemLevels,
      )
    : { newWhereClauses: [], newWhereClauseConditions: [] };

  return !analysisGroup && itemLevels ? (
    <></>
  ) : (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          dispatch({
            operation: ADD_ANAL_GROUP_LEVELS,
            id,
            whereClauses: newWhereClauses,
            whereClauseConditions: newWhereClauseConditions,
          });
        }}
        title="Add groups from data"
        className="add-data-levels-button"
      >
        Add data levels
      </button>
    </>
  );
};

AddDataLevelsButton.displayName = "AddDataLevelsButton";
