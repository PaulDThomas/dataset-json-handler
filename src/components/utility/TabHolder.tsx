import { useContext } from "react";
import { DSJContext } from "../../context/DSJContextProvider";

interface TabHolderProps {
  id?: string;
  tabList: {
    value: string;
    label: string;
    element: () => JSX.Element;
  }[];
}

export const TabHolder = ({ id = "tab", tabList }: TabHolderProps) => {
  const { state } = useContext(DSJContext);
  return (
    <div
      id={`${id}-tab-holder`}
      className="tab-holder"
      style={{
        background: "white",
        height: "calc(95vh - 140px - 1rem)",
      }}
    >
      {tabList
        // .filter((tab) => tab.value === state.pane)
        .map((tab, i) => (
          <div
            key={i}
            id={`${id}-${tab.value}`}
            className="tab fader"
            style={{
              opacity: state.pane === tab.value ? 1 : 0,
              zIndex: state.pane === tab.value ? 1 : 0,
            }}
          >
            {tab.element()}
          </div>
        ))}
    </div>
  );
};

TabHolder.displayName = "TabHolder";
