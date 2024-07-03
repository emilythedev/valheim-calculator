import { toPairs } from 'lodash-es';
import { FC, ReactNode } from 'react';

interface KeyValueListProps<V> extends React.HTMLAttributes<HTMLDivElement> {
  list: { [key in string]: V },
  className?: string,
  item: (key: string, value: V) => ReactNode,
}

const KeyValueList: FC<KeyValueListProps<any>> = ({ list, item, className, ...props }) => {
  const pairs = toPairs(list);

  return (
    <div className={className} {...props}>
      {pairs.map(([key, value]) => item(key, value))}
    </div>
  );
};

export default KeyValueList;
