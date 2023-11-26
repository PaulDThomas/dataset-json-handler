import { act, fireEvent, render, screen } from "@testing-library/react";
import { WhereClauseConditionClass } from "../../classes/WhereClauseConditionClass";
import { SummaryTableContext, initialSummaryTableSchema } from "../../context/SummaryTableContext";
import { WhereClauseConditionMultiValues } from "./WhereClauseConditionMultiValues";
import { userEvent } from "@testing-library/user-event";

describe("WhereClauseConditionMultiValues", () => {
  test("No context render", async () => {
    await act(async () =>
      render(
        <WhereClauseConditionMultiValues
          id="1"
          canEdit={true}
        />,
      ),
    );
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  });

  test("Initial render and update", async () => {
    const mockDispatch = jest.fn();
    const user = userEvent.setup({ delay: null });
    jest.useFakeTimers();
    await act(async () =>
      render(
        <SummaryTableContext.Provider
          value={{
            state: {
              ...initialSummaryTableSchema,
              whereClauseConditions: [
                new WhereClauseConditionClass({
                  id: "1",
                  whereOperation: "in",
                  filteredItemValues: ["value1", "value2"],
                }),
              ],
            },
            dispatch: mockDispatch,
          }}
        >
          <WhereClauseConditionMultiValues
            id="1"
            canEdit={true}
          />
        </SummaryTableContext.Provider>,
      ),
    );
    const textarea = screen.getByRole("textbox");
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveValue("value1\nvalue2");
    await user.clear(textarea);
    await user.type(textarea, "new value");
    await act(async () => {
      jest.runAllTimers();
    });
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    const calledParams = mockDispatch.mock.calls[0];
    expect(calledParams[0].operation).toEqual("UPDATE_WHERE_CLAUSE_CONDITION");
    expect(calledParams[0].whereClauseConditions.length).toEqual(1);
    expect(calledParams[0].whereClauseConditions[0]).toBeInstanceOf(WhereClauseConditionClass);
    expect(calledParams[0].whereClauseConditions[0].data).toEqual({
      id: "1",
      filteredItemValues: ["new value"],
      whereOperation: "in",
      item: undefined,
    });
    jest.useRealTimers();
  });

  test("Update on blur", async () => {
    const mockDispatch = jest.fn();
    const user = userEvent.setup({ delay: null });
    jest.useFakeTimers();
    await act(async () =>
      render(
        <SummaryTableContext.Provider
          value={{
            state: {
              ...initialSummaryTableSchema,
              whereClauseConditions: [
                new WhereClauseConditionClass({
                  id: "1",
                  whereOperation: "in",
                  filteredItemValues: ["initial"],
                }),
              ],
            },
            dispatch: mockDispatch,
          }}
        >
          <WhereClauseConditionMultiValues
            id="1"
            canEdit={true}
          />
        </SummaryTableContext.Provider>,
      ),
    );
    const textarea = screen.getByRole("textbox");
    await user.clear(textarea);
    await user.type(textarea, "initial");
    await act(async () => fireEvent.blur(textarea));
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    const calledParams = mockDispatch.mock.calls[0];
    expect(calledParams[0].operation).toEqual("UPDATE_WHERE_CLAUSE_CONDITION");
    expect(calledParams[0].whereClauseConditions.length).toEqual(1);
    expect(calledParams[0].whereClauseConditions[0]).toBeInstanceOf(WhereClauseConditionClass);
    expect(calledParams[0].whereClauseConditions[0].data).toEqual({
      id: "1",
      filteredItemValues: ["initial"],
      whereOperation: "in",
      item: undefined,
    });
    jest.useRealTimers();
  });
});
