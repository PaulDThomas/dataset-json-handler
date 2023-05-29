import { DataSetJsonItemClass } from '../../classes/DatasetJsonItemClass';

interface ItemPropertiesProps {
  item: DataSetJsonItemClass;
  setItem?: (ret: DataSetJsonItemClass) => void;
}

export const ItemProperties = ({ item, setItem }: ItemPropertiesProps): JSX.Element => {
  return (
    <div>
      <div>{item.OID}</div>
      <div>{item.name}</div>
      <div>{item.label}</div>
      <div>{item.type}</div>
      <div>{item.length}</div>
    </div>
  );
};
