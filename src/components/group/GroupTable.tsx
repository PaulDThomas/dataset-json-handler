import { useContext } from 'react';
import { SummaryTableContext } from '../../context/SummaryTableContext';
import { AnalysisGroupClass } from '../../main';
import './GroupTable.css';
import { UPDATE_GROUP } from '../../context/stReducer';
import { DebouncedInput } from '../utility/DebouncedInput';

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
          <td>{group.valueItem?.label}</td>
        </tr>
        {group instanceof AnalysisGroupClass ? (
          <>
            <tr>
              <td>Order by</td>
              <td>{group.orderItem?.label}</td>
            </tr>
            <tr>
              <td>Create subject count (big N)</td>
              <td>{group.bigN}</td>
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
