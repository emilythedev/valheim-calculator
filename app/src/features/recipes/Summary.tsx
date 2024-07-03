import MaterialList from '@/entities/recipe/MaterialList';
import RecipeListItem from '@/entities/recipe/RecipeListItem';
import ShelfStatusText from '@/entities/recipe/ShelfStatusText';
import { summaryAtom } from '@/shared/atoms';
import KeyValueList from '@/shared/ui/KeyValueList';
import { Section, SectionHeader } from '@/shared/ui/section';
import { useAtomValue } from 'jotai';
import { selectAtom } from 'jotai/utils';
import { isEqual } from 'lodash-es';

const materialsSummary = selectAtom(summaryAtom, v => v.materials);
const stationsSummary = selectAtom(summaryAtom, v => v.stations, isEqual);

const StationSummary = () => {
  const stations = useAtomValue(stationsSummary);

  return (
    <Section>
      <SectionHeader>Required stations</SectionHeader>
      <KeyValueList
        className="text-sm"
        list={stations}
        item={(entity, quality: number | null) => (
          <RecipeListItem
            key={entity}
            entity={entity}
            quality={quality}
            hideRecipeButton
          >
            <ShelfStatusText recipe={{entity, quality: quality || 1}} />
          </RecipeListItem>
        )}
      />
    </Section>
  );
};

const MaterialSummary = () => {
  const materials = useAtomValue(materialsSummary);

  return (
    <Section>
      <SectionHeader>Materials</SectionHeader>
      <MaterialList materials={materials} />
    </Section>
  );
};

const Summary = () => {
  return (
    <div className="space-y-4">
      <StationSummary />
      <MaterialSummary />
    </div>
  );
};

export default Summary;
