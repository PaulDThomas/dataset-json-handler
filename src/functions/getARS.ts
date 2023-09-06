import { SummaryTableSchema } from "../context/SummaryTableContext";
import { eStatistic } from "../enums/eStatistic";
import { ReportingEvent } from "../interfaces/Hackathon";
import { AnalysisGroupClass, WhereClauseClass, WhereClauseConditionClass } from "../main";

export const getARS = (state: SummaryTableSchema, dataset: string): ReportingEvent => {
  const ret: ReportingEvent = {
    id: "ARS",
    version: 0.1,
    name: "ARS, exploring holistic overview, local example",
    listOfPlannedAnalyses: {
      listItems: [
        {
          outputId: "TAB-1",
          name: "Local example table",
          level: 1,
          order: 1,
          sublist: {
            listItems: state.rows.map((item, i) => ({
              name: `Summary of ${item.name} by ${state.columnAnalysisGroup?.label}`,
              level: 2,
              order: i + 1,
              id: `${item.name}_${state.columnAnalysisGroup?.label.toUpperCase()}_CONT`,
            })),
          },
        },
      ],
    },
    listOfPlannedOutputs: {
      listItems: [
        {
          outputId: "TAB-1",
          name: "Local example table",
          level: 1,
          order: 1,
        },
      ],
    },
    analysisGroupings: (
      state.groupList.filter((g) => g.type === "AnalysisGroup") as AnalysisGroupClass[]
    ).map((analGroup) => ({
      id: analGroup.id,
      dataDriven: false,
      label: analGroup.label,
      groupingVariable: analGroup.valueItem?.name,
      groups: (
        analGroup.levels
          ?.map((l) => state.whereClauses.find((w) => w.id === l))
          .filter((w) => w) as WhereClauseClass[]
      ).map((w) => ({
        level: 1,
        order: w.order,
        id: w.id,
        label: w.label,
        condition: {
          dataset,
          variable: (
            state.whereClauseConditions.find(
              (wc) => wc.id === w.condition,
            ) as WhereClauseConditionClass
          ).item?.name,
          comparator: (
            state.whereClauseConditions.find(
              (wc) => wc.id === w.condition,
            ) as WhereClauseConditionClass
          ).whereOperation,
          value: (
            state.whereClauseConditions.find(
              (wc) => wc.id === w.condition,
            ) as WhereClauseConditionClass
          ).filteredItemValues.map((v) => v.toString()),
        },
      })),
    })),
    methods: [
      {
        name: "Summary of by group of a continuous variable",
        id: "M_GRP_SUM_CONTIN",
        label: "Summarise continuous variable",
        description: "AZSOL standard summary statistics for a continuous variable",
        documentRefs: [
          {
            referenceDocumentId: "AZSOL",
            pageRefs: [{ refType: "PhysicalRef", label: "Chapter 4", pageNumbers: [12] }],
          },
        ],
        operations: (Object.keys(eStatistic) as eStatistic[]).map((s, j) => ({
          id: `M_GRP_SUM_CONTIN_${s.toUpperCase()}`,
          label: `${Object.values(eStatistic)[j]}`,
          name: s,
          resultPattern: "3sf",
        })),
      },
    ],
    analyses: state.rows.map((item, i) => ({
      id: `${item.name}_${state.columnAnalysisGroup?.label.toUpperCase()}_CONT`,
      reason: {},
      purpose: {},
      analysisSetId: state.columnAnalysisGroup?.id,
      dataset,
      variable: item.name,
      methodId: "M_GRP_SUM_CONTIN",
      name: `Summary of ${item.name} by ${state.columnAnalysisGroup?.label}`,
      level: 2,
      order: i + 1,
    })),
  };
  return ret;
};
