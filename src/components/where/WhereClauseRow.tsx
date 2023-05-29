import { useContext } from 'react';
import { WhereClauseClass } from '../../classes/WhereClauseClass';
import { SummaryTableContext } from '../../context/SummaryTableContext';
import { OperationSelector, eOperation } from '../../enums/eOperation';
import { REMOVE_WHERE_CLAUSE, UPDATE_WHERE_CLAUSE } from '../../functions/reducer';
import { WhereClauseItem } from './WhereClauseItem';

interface WhereClauseProps {
  index: number;
  canEdit: boolean;
}

export const WhereClauseRow = ({ index, canEdit }: WhereClauseProps): JSX.Element => {
  const { state, dispatch } = useContext(SummaryTableContext);

  if (!state.whereClauses[index]) return <></>;
  return (
    <div
      className='whereclause-main'
      style={{
        display: 'flex',
        flexDirection: 'row',
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
              ? () =>
                  dispatch({ type: REMOVE_WHERE_CLAUSE, whereClause: state.whereClauses[index] })
              : undefined
          }
        >
          <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z' />
          <path d='M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z' />
        </svg>
      </div>
      <WhereClauseItem index={index} />
      <OperationSelector
        selected={(state.whereClauses[index]?.whereOperation ?? '') as string}
        setSelected={
          canEdit
            ? (ret) => {
                dispatch({
                  type: UPDATE_WHERE_CLAUSE,
                  whereClause: new WhereClauseClass({
                    WID: state.whereClauses[index]?.WID,
                    item: state.whereClauses[index]?.item,
                    whereOperation: (ret as eOperation) ?? null,
                    filteredItemValues: state.whereClauses[index]?.filteredItemValues,
                  }),
                });
              }
            : undefined
        }
      />
      <div className='whereclause-values'>
        {state.whereClauses[index]?.filteredItemValues?.map((v, i) => (
          <div key={i}>
            {v instanceof Date
              ? new Date(v.getTime() - v.getTimezoneOffset() * 60000)
                  .toISOString()
                  .replace(/T/, ' ')
                  .slice(0, 16)
              : v}
          </div>
        )) ?? 'No values set'}
      </div>
    </div>
  );
};
