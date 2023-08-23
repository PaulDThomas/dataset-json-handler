import { useContext } from 'react';
import { SummaryTableContext } from '../../context/SummaryTableContext';

interface GroupWindowProperties {
  groupId: string;
}

export const GroupWindow = ({ groupId }: GroupWindowProperties) => {
  const { state, dispatch } = useContext(SummaryTableContext);

  const groupIndex = state.groupList.findIndex((g) => g.id === groupId);
  const group = groupIndex > -1 ? state.groupList[groupIndex] : null;

  return !group ? (
    <div>Group ${groupId} not found</div>
  ) : (
    <table>
      <tbody>
        <tr>
          <td>Id</td>
          <td>{groupId}</td>
        </tr>
        <tr>
          <td>Label</td>
          <td>{group.label}</td>
        </tr>
        <tr>
          <td>Order by</td>
          <td>{group.orderItem?.label}</td>
        </tr>
        <tr>
          <td>Values from</td>
          <td>{group.valueItem?.label}</td>
        </tr>
        <tr>
          <td>Create subject count (big N)</td>
          <td>{group.bigN}</td>
        </tr>
        <tr>
          <td>Levels</td>
          <td>-- group levels node--</td>
        </tr>
      </tbody>
    </table>
  );
};
