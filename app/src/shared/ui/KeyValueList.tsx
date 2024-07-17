import { toPairs } from 'lodash-es';
import { ReactNode } from 'react';

interface KeyValueListProps<V> extends React.HTMLAttributes<HTMLDivElement> {
  list: { [key in string]: V },
  className?: string,
  item: (key: string, value: V) => ReactNode,
  sort?: (pairs: [string, V][]) => [string, V][],
}

const KeyValueList = <T = number>({ list, item, className, sort, ...props }: KeyValueListProps<T>) => {
  const pairs = sort ? sort(toPairs(list)) : toPairs(list);

  return (
    <div className={className} {...props}>
      {pairs.map(([key, value]) => item(key, value))}
    </div>
  );
};

export default KeyValueList;
