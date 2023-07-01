import { useContext } from 'react';
import { WhereClauseClass, eOperation } from '../../classes/WhereClauseClass';
import { SummaryTableContext } from '../../context/SummaryTableContext';
import { OperationSelector } from '../../enums/eOperation';
import { REMOVE_WHERE_CLAUSE, UPDATE_WHERE_CLAUSE } from '../../functions/reducer';
import { WhereClauseItem } from './WhereClauseItem';
import { eItemType } from '../../classes/DatasetJsonItemClass';

interface WhereClauseProps {
  index: number;
  canEdit: boolean;
}

export const WhereSingleValue = ({ index, canEdit }: WhereClauseProps) => {
  const { state, dispatch } = useContext(SummaryTableContext);
  const whereClause = state.whereClauses.length > index ? state.whereClauses[index] : null;
  if (!whereClause || !whereClause.item) return <></>;
  return (
    <input
      style={{ borderRadius: '4px', borderWidth: '1px' }}
      value={
        whereClause.filteredItemValues && whereClause.filteredItemValues.length > 0
          ? whereClause.filteredItemValues[0].toString()
          : ''
      }
      type={
        [eItemType.date, eItemType.datetime, eItemType.time].includes(whereClause.item.type)
          ? whereClause.item.type
          : undefined
      }
      onChange={
        canEdit
          ? (e) => {
              whereClause.filteredItemValues = [e.currentTarget.value];
              dispatch({
                operation: UPDATE_WHERE_CLAUSE,
                whereClause: whereClause,
              });
            }
          : undefined
      }
    />
  );
};

// export const WhereMultiValues = ({ index, canEdit }: WhereClauseProps) => {
//   const { state, dispatch } = useContext(SummaryTableContext);
//   const whereClause = state.whereClauses.length > index ? state.whereClauses[index] : null;
//   if (!whereClause || !whereClause.item) return <></>;
//   return (
//     <input
//       value={
//         whereClause.filteredItemValues && whereClause.filteredItemValues.length > 0
//           ? whereClause.filteredItemValues[0].toString()
//           : ''
//       }
//       onChange={
//         canEdit
//           ? (e) => {
//               whereClause.filteredItemValues = [e.currentTarget.value];
//               dispatch({
//                 operation: UPDATE_WHERE_CLAUSE,
//                 whereClause: whereClause,
//               });
//             }
//           : undefined
//       }
//     />
//   );
// };

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
            selected={(whereClause.whereOperation ?? '') as string}
            setSelected={
              canEdit
                ? (ret) => {
                    dispatch({
                      operation: UPDATE_WHERE_CLAUSE,
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
                // in: (
                //   <WhereMultiValues
                //     index={index}
                //     canEdit={canEdit}
                //   />
                // ),
                // not_in: (
                //   <WhereMultiValues
                //     index={index}
                //     canEdit={canEdit}
                //   />
                // ),
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
        </>
      )}
    </div>
  );
};
WhereClauseRow.displayName = 'WhereClauseRow';
