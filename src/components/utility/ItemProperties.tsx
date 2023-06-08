import { useContext, useMemo } from 'react';
import { SummaryTableContext } from '../../context/SummaryTableContext';

interface ItemPropertiesProps {
  oid: string;
}

export const ItemProperties = ({ oid }: ItemPropertiesProps): JSX.Element => {
  const { state } = useContext(SummaryTableContext);
  const item = useMemo(() => state.itemList.find((i) => i.OID === oid), [oid, state]);

  if (!item) return <></>;
  return (
    <table>
      <tbody>
        <tr>
          <td>OID</td>
          <td>{oid}</td>
        </tr>
        <tr>
          <td>Name</td>
          <td>
            <input
              aria-label='Name'
              value={item.name}
              disabled
            />
          </td>
        </tr>
        <tr>
          <td>Label</td>
          <td>
            <input
              aria-label='Label'
              value={item.label}
              disabled
            />
          </td>
        </tr>
        <tr>
          <td>Type</td>
          <td>
            <input
              aria-label='Type'
              value={item.type}
              disabled
            />
          </td>
        </tr>
        <tr>
          <td>Length</td>
          <td>
            <input
              aria-label='Length'
              value={item.length}
              disabled
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
};
