import { useContext } from 'react';
import { DraggableVariable } from './DraggableVariable';
import './VariableList.css';
import { SummaryTableContext } from '../../context/SummaryTableContext';

interface VariableListProps {
  id: string;
}

export const VariableList = ({ id }: VariableListProps) => {
  const { state, variableList } = useContext(SummaryTableContext);

  return (
    <div
      className='variable-list simpletable-main small-scrollbar'
      id={id}
    >
      <div className='simpletable-holder'>
        {variableList
          .filter(
            (v) =>
              !state.columns.map((c) => c.name).includes(v.name) &&
              !state.rows.map((r) => r.name).includes(v.name) &&
              state.target?.name !== v.name,
          )
          .map((variable, index) => (
            <DraggableVariable
              key={variable.OID ?? index}
              id={`${id}-${variable.name}`}
              item={variable}
            />
          ))}
      </div>
    </div>
  );
};
