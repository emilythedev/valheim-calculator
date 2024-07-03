import { useFilterList } from '@/entities/item/hooks/filter';
import { Table as JoyTable, Typography } from '@mui/joy';
import { useEffect, useRef } from 'react';
import { TableVirtuoso, TableVirtuosoHandle } from 'react-virtuoso';
import TableRow from './TableRow';

const FilteredList = () => {
  const scrollableRef = useRef<TableVirtuosoHandle>(null);
  const [filteredList, filterOptions] = useFilterList();

  useEffect(() => {
    scrollableRef.current?.scrollToIndex(0);
  }, [filterOptions]);

  return (
    <TableVirtuoso
      ref={scrollableRef}
      data={filteredList}
      totalCount={filteredList.length}
      components={{
        Table: (props) => (<JoyTable
          data-testid="cy-table-recipes"
          variant="plain"
          stickyHeader
          hoverRow={filteredList.length > 0}
          {...props}
        />),
        EmptyPlaceholder: () => (
          <tbody><tr>
            <td colSpan={3}>
              <Typography textAlign="center">No data found.</Typography>
            </td>
          </tr></tbody>
        ),
      }}
      fixedHeaderContent={() => (
        <tr>
          <th colSpan={3}>Item [Quality Lv.]</th>
        </tr>
      )}
      itemContent={(i, item) => (<TableRow key={`${item.id}`} item={item} />)}
    />
  );
};

export default FilteredList;
