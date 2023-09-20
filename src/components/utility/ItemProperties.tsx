import { useContext, useMemo } from "react";
import { SummaryTableContext } from "../../context/SummaryTableContext";

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
        {[
          { name: "name", label: "Name" },
          { name: "label", label: "Label" },
          { name: "type", label: "Type" },
          { name: "length", label: "Length" },
        ].map((p, i) => (
          <tr key={i}>
            <td>{p.name}</td>
            <td>
              <input
                aria-label={p.label}
                value={item.data[p.name]?.toString() ?? ""}
                disabled
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
