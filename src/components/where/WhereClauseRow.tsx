import { useContext } from 'react';
import { WhereClauseClass, Operation } from '../../classes/WhereClauseClass';
import { SummaryTableContext } from '../../context/SummaryTableContext';
import { OperationSelector } from './OperationSelector';
import { REMOVE_WHERE_CLAUSE, UPDATE_WHERE_CLAUSE } from '../../context/stReducer';
import { WhereClauseItem } from './WhereClauseItem';
import { WhereSingleValue } from './WhereSingleValue';
import { WhereMultiValues } from './WhereMultiValues';

export interface WhereClauseProps {
  index: number;
  canEdit: boolean;
}

export const WhereClauseRow = ({ index, canEdit }: WhereClauseProps): JSX.Element => {
  const { state, dispatch } = useContext(SummaryTableContext);
  const whereClause = state.whereClauses.length > index ? state.whereClauses[index] : null;

  if (!whereClause) return <></>;
  return (
    <div
      className='whereclause-main'
      style={{
        display: 'flex',
        flexDirection: 'row',
        minWidth: '530px',
      }}
    >
      <div
        className='whereclause-remove-holder'
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='16'
          height='16'
          fill='currentColor'
          className='bi bi-dash-circle'
          viewBox='0 0 16 16'
          color='red'
          onClick={
            canEdit
              ? () => dispatch({ operation: REMOVE_WHERE_CLAUSE, whereClause: whereClause })
              : undefined
          }
        >
          <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z' />
          <path d='M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z' />
        </svg>
      </div>
      <WhereClauseItem index={index} />
      {whereClause.item && (
        <>
          <OperationSelector
            selected={whereClause.whereOperation}
            setSelected={
              canEdit
                ? (ret) => {
                    const newWhere = new WhereClauseClass(state.whereClauses[index]);
                    newWhere.whereOperation = ret as Operation;
                    dispatch({
                      operation: UPDATE_WHERE_CLAUSE,
                      whereClause: newWhere,
                    });
                  }
                : undefined
            }
          />
          <div
            className='whereclause-values'
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              marginLeft: '2px',
            }}
          >
            {whereClause.whereOperation ? (
              {
                eq: (
                  <WhereSingleValue
                    index={index}
                    canEdit={canEdit}
                  />
                ),
                lt: (
                  <WhereSingleValue
                    index={index}
                    canEdit={canEdit}
                  />
                ),
                le: (
                  <WhereSingleValue
                    index={index}
                    canEdit={canEdit}
                  />
                ),
                gt: (
                  <WhereSingleValue
                    index={index}
                    canEdit={canEdit}
                  />
                ),
                ge: (
                  <WhereSingleValue
                    index={index}
                    canEdit={canEdit}
                  />
                ),
                in: (
                  <WhereMultiValues
                    index={index}
                    canEdit={canEdit}
                  />
                ),
                not_in: (
                  <WhereMultiValues
                    index={index}
                    canEdit={canEdit}
                  />
                ),
                default: <></>,
              }[whereClause.whereOperation.valueOf()]
            ) : (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  width: '100%',
                  padding: '0.5rem',
                }}
              >
                No defined values
              </div>
            )}
          </div>
          {!whereClause.isValid && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                paddingLeft: '4px',
              }}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                fill='currentColor'
                color='red'
                viewBox='0 0 16 16'
              >
                <path d='M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z' />
              </svg>
            </div>
          )}
        </>
      )}
    </div>
  );
};
WhereClauseRow.displayName = 'WhereClauseRow';
