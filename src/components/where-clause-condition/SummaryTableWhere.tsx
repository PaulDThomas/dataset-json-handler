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
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  fill='currentColor'
                  className='bi bi-plus-circle'
                  viewBox='0 0 16 16'
                >
                  <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z' />
                  <path d='M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z' />
                </svg>{' '}
                Add where clause
              </div>
            )}
          </div>
        </ContextWindow>
      </div>
    </div>
  );
};