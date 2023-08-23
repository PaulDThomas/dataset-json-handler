import { useContext } from 'react';
import { DSJContext, DSJContextProps } from '../../context/DSJContextProvider';
import { HeaderTableUrl } from './HeaderTableUrl';
import { PaneSwitch } from './PaneSwitch';

export const HeaderTable = () => {
  const { state } = useContext<DSJContextProps>(DSJContext);

  return (
    <div style={{ height: '140px' }}>
      <table
        id='header-table'
        style={{ borderCollapse: 'collapse', border: '1px dotted black', width: '100%' }}
      >
        <tbody>
          <HeaderTableUrl />
          <tr>
            <td width={'200px'}>studyOID</td>
            <td width={'350px'}>{state.datasetJson?.studyOID}</td>
            <td rowSpan={4}></td>
            <td rowSpan={4}>
              <PaneSwitch />
            </td>
          </tr>
          <tr>
            <td>metaDataVersionOID</td>
            <td>{state.datasetJson?.metaDataVersionOID}</td>
          </tr>
          <tr>
            <td>name</td>
            <td>{state.datasetJson?.name}</td>
          </tr>
          <tr>
            <td>label</td>
            <td>{state.datasetJson?.label}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
