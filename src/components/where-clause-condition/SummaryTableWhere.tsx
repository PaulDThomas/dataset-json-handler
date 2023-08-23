import { useContext, useState } from 'react';
import { SummaryTableContext } from '../../context/SummaryTableContext';
import { UPDATE_WHERE_CLAUSE_CONDITION } from '../../context/stReducer';
import { ContextWindow } from '@asup/context-menu';
import { WhereClauseConditionRow } from './WhereClauseConditionRow';
import { WhereClauseConditionClass } from '../../classes/WhereClauseConditionClass';

interface SummaryTableWhereProps {
  editable?: boolean;
}

export const SummaryTableWhere = ({ editable = true }: SummaryTableWhereProps) => {
  const { state, dispatch } = useContext(SummaryTableContext);

  const [showWindow, setShowWindow] = useState<boolean>(false);

  return (
    <div
      className='stwhere-main'
      style={{
        height: '24px',
      }}
    >
      <div className=''>
        {state.whereClauseConditions.length} filter
        {state.whereClauseConditions.length === 1 ? '' : 's'} applied
        <span
          className='stwhere-edit-button'
          title='Edit filters'
          style={{
            cursor: 'pointer',
          }}
          onClick={() => setShowWindow(true)}
        >
          {'\u2026'}
        </span>
        <ContextWindow
          visible={showWindow}
          id={'stwhere-window'}
          title={'Where clauses'}
          onClose={() => setShowWindow(false)}
          style={{ width: '600px' }}
        >
          <div className='stwhere-main'>
            {state.whereClauseConditions.map((_, i) => (
              <WhereClauseConditionRow
                key={i}
                index={i}
                canEdit={true}
              />
            ))}
            {editable && !state.whereClauseConditions.some((w) => !w.isValid) && (
              <div
                className='stwhere-add-where-clause'
                onClick={() =>
                  dispatch({
                    operation: UPDATE_WHERE_CLAUSE_CONDITION,
                    whereClauseCondition: new WhereClauseConditionClass(),
                  })
                }
              >
                {'\u2295 '}
                Add where clause
              </div>
            )}
          </div>
        </ContextWindow>
      </div>
    </div>
  );
};
