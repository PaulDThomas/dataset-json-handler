import { useContext } from 'react';
import { DraggableVariable } from './DraggableVariable';
import './VariableList.css';
import { SummaryTableContext } from '../../context/SummaryTableContext';

interface VariableListProps {
  id: string;
}

export const VariableList = ({ id }: VariableListProps) => {
  const summaryTableContext = useContext(SummaryTableContext);

  return (
    <div
      className='variable-list simpletable-main small-scrollbar'
      id={id}
    >
      <div className='simpletable-holder'>
        {summaryTableContext.variableList
          .filter(
            (v) =>
              !summaryTableContext.columns.map((c) => c.name).includes(v.name) &&
              !summaryTableContext.rows.map((r) => r.name).includes(v.name) &&
              summaryTableContext.target?.name !== v.name,
          )
          .map((variable, index) => (
            <DraggableVariable
              key={variable.OID ?? index}
              id={`${id}-${variable.name}`}
              variable={variable}
            />
          ))}
      </div>
    </div>
  );
};
