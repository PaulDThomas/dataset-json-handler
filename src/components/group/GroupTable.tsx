import { useContext } from 'react';
import { SummaryTableContext } from '../../context/SummaryTableContext';
import { UPDATE_GROUP } from '../../context/stReducer';
import { AnalysisGroupClass, DatasetJsonItemClass } from '../../main';
import { DebouncedInput } from '../utility/DebouncedInput';
import './GroupTable.css';
import { InGroupItem } from './InGroupItem';

interface GroupWindowProperties {
  groupId: string;
}

export const GroupTable = ({ groupId }: GroupWindowProperties) => {
  const { state, dispatch } = useContext(SummaryTableContext);

  const groupIndex = state.groupList.findIndex((g) => g.id === groupId);
  const group = groupIndex > -1 ? state.groupList[groupIndex] : null;

  return !group ? (
    <div>Group ${groupId} not found</div>
  ) : (
    <table className='group-table'>
      <tbody>
        <tr>
          <td>Id</td>
          <td>
            <span className='id-holder'>{groupId}</span>
          </td>
        </tr>
        <tr>
          <td>Label</td>
          <td>
            <DebouncedInput
              value={group.label}
              setValue={(ret) => {
                group.label = ret;
                dispatch({ operation: UPDATE_GROUP, group });
              }}
            />
          </td>
        </tr>
        <tr>
          <td>Values from</td>
          <td>
            <InGroupItem
              id='valuesFrom'
              groupId={group.id}
              item={group.valueItem}
              dropAction={(ret: DatasetJsonItemClass) => {
                group.valueItem = ret;
                dispatch({ operation: UPDATE_GROUP, group });
              }}
            />
          </td>
        </tr>
        {group instanceof AnalysisGroupClass ? (
          <>
            <tr>
              <td>Order by</td>
              <td>
                {' '}
                <InGroupItem
                  id='orderBy'
                  groupId={group.id}
                  item={group.orderItem}
                  dropAction={(ret: DatasetJsonItemClass) => {
                    group.orderItem = ret;
                    dispatch({ operation: UPDATE_GROUP, group });
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>Big N?</td>
              <td>
                <input
                  type='checkbox'
                  checked={group.bigN}
                  onChange={(e) => {
                    e.stopPropagation();
                    group.bigN = !group.bigN;
                    dispatch({ operation: UPDATE_GROUP, group });
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>Levels</td>
              <td>-- group levels node--</td>
            </tr>
          </>
        ) : (
          <>
            <tr></tr>
          </>
        )}
      </tbody>
    </table>
  );
};
