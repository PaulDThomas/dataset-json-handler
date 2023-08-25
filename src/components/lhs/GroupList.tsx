import { useContext } from "react";
import { SummaryTableContext } from "../../context/SummaryTableContext";
import { Accordion } from "./Accordion";
import { AddGroupButton } from "../group/AddGroupButton";
import { GroupTable } from "../group/GroupTable";

interface GroupListProps {
  id: string;
}

export const GroupList = ({ id }: GroupListProps) => {
  const { state } = useContext(SummaryTableContext);

  return (
    <Accordion
      title="Groups"
      id={id}
    >
      {state.groupList.map((g) => (
        <GroupTable
          key={g.id}
          groupId={g.id}
        />
      ))}
      <AddGroupButton />
    </Accordion>
  );
};
