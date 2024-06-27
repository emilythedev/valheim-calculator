import { summaryAtom } from '@/shared/atoms';
import { useAtomValue } from 'jotai';
import { selectAtom } from 'jotai/utils';
import { isEqual, sortBy, toPairs } from 'lodash-es';

const materialsSummary = selectAtom(summaryAtom, v => v.materials);
const stationsSummary = selectAtom(summaryAtom, v => v.stations, isEqual);

const StationSummary = () => {
  const stations = useAtomValue(stationsSummary);
  const list = sortBy(toPairs(stations), ['0']);

  return (
    <div>
      {list.map(([entity, quality]) => {
        return (
          <div
            key={entity}
            className="flex flex-row items-center gap-4"
          >
            <span>{entity}</span>
            <span>{quality}</span>
          </div>
        );
      })}
    </div>
  );
};

const MaterialSummary = () => {
  const materials = useAtomValue(materialsSummary);
  const list = sortBy(toPairs(materials), ['0']);

  return (
    <div>
      {list.map(([entity, amount]) => {
        return (
          <div
            key={entity}
            className="flex flex-row items-center gap-4"
          >
            <span>{entity}</span>
            <span>{amount}</span>
          </div>
        );
      })}
    </div>
  );
};

const Summary = () => {
  return (
    <div>
      <StationSummary />
      <MaterialSummary />
    </div>
  )
};

export default Summary;
