import { ContextWindow } from "@asup/context-menu";
import { useState } from "react";
import ReactJson from "react-json-view";
import { jsonToFile } from "../../functions/jsonToFile";

interface JsonWindowButtonProps {
  id: string;
  buttonLabel?: string;
  title: string;
  object: object;
  canSave?: boolean;
}

export const JsonWindowButton = ({
  id,
  buttonLabel,
  title,
  object,
  canSave = false,
}: JsonWindowButtonProps) => {
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
          {buttonLabel ?? "ⓘ"}
        </button>
        <ContextWindow
          id={`${id}-window`}
          visible={showWindow}
          title={title}
          onClose={() => setShowWindow(false)}
          style={{ maxHeight: "75vh", maxWidth: "75vw", width: "400px", height: "300px" }}
        >
          <>
            {canSave && (
              <button
                style={{
                  position: "absolute",
                  top: "36px",
                  right: "24px",
                  opacity: 1,
                  zIndex: 100,
                }}
                onClick={() => jsonToFile("ARS.json", object)}
              >
                Save
              </button>
            )}
            <ReactJson src={object} />
          </>
        </ContextWindow>
      </div>
    </>
  );
};
