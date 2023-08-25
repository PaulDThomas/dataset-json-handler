import { ReactNode, useState } from "react";

interface AccordionProps {
  id: string;
  title: string;
  children: ReactNode;
}

export const Accordion = ({ id, title, children }: AccordionProps): ReactNode => {
  const [expanded, setExpanded] = useState<boolean>(true);

  return (
    <div
      className="accordion"
      id={id}
    >
      <div
        className="accordion-title"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setExpanded(!expanded);
        }}
      >
        <div className={`accordion-pre ${expanded ? "expanded" : "closed"}`}>{"\u2BC5"}</div>
        <span>{title}</span>
      </div>
      <div className={`accordion-holder ${expanded ? "expanded" : "closed"}`}>{children}</div>
    </div>
  );
};
