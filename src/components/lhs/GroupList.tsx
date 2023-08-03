import { useContext } from 'react';
import { SummaryTableContext } from '../../context/SummaryTableContext';
import { Accordion } from './Accordion';

interface GroupListProps {
  id: string;
}

export const GroupList = ({ id }: GroupListProps) => {
  const { state } = useContext(SummaryTableContext);

  return (
    <Accordion
      title='Groups'
      id={id}
    >
      {state.groupList.map((g) => (
        <>{g.id}</>
      ))}
    </Accordion>
  );
};
