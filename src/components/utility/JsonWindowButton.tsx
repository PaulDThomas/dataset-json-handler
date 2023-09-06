import { ContextWindow } from "@asup/context-menu";
import { useState } from "react";
import ReactJson from "react-json-view";

interface JsonWindowButtonProps {
  id: string;
  title: string;
  object: object;
}

export const JsonWindowButton = ({ id, title, object }: JsonWindowButtonProps) => {
  const [showWindow, setShowWindow] = useState<boolean>(false);
  return (
    <>
      <div>
        <button
          id={id}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setShowWindow(!showWindow);
          }}
          className="json-window-button"
          style={{ width: "40px" }}
        >
          ⓘ
        </button>
        <ContextWindow
          id={`${id}-window`}
          visible={showWindow}
          title={title}
          onClose={() => setShowWindow(false)}
          style={{ maxHeight: "75vh", maxWidth: "75vw", width: "400px", height: "300px" }}
        >
          <ReactJson src={object} />
        </ContextWindow>
      </div>
    </>
  );
};
