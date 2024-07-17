import MaterialList from '@/entities/recipe/MaterialList';
import RecipeListItem from '@/entities/recipe/RecipeListItem';
import ShelfStatusText from '@/entities/recipe/ShelfStatusText';
import { summaryAtom } from '@/shared/atoms';
import { useOpenDialog } from '@/shared/hooks';
import KeyValueList from '@/shared/ui/KeyValueList';
import { Section, SectionHeader } from '@/shared/ui/section';
import { useAtomValue } from 'jotai';
import { selectAtom } from 'jotai/utils';
import { isEqual } from 'lodash-es';

const materialsSummary = selectAtom(summaryAtom, v => v.materials);
const stationsSummary = selectAtom(summaryAtom, v => v.stations, isEqual);

const StationSummaryItem = ({ entity, quality }: { entity: EntityId, quality: QualityLevel }) => {
  const recipe = { entity, quality: quality || 1 };
  const openDialog = useOpenDialog({ entity, quality: 1 }); // station is not upgradable, quality = number of extension

  return (
    <RecipeListItem
      key={entity}
      entity={entity}
      quality={quality}
      onViewRecipe={openDialog}
    >
      <ShelfStatusText recipe={recipe} allowAdd />
    </RecipeListItem>
  );
};

const StationSummary = () => {
  const stations = useAtomValue(stationsSummary);

  return (
    <Section>
      <SectionHeader>Required stations</SectionHeader>
      <KeyValueList
        className="text-sm space-y-4"
        list={stations}
        item={(entity, quality) => (
          <StationSummaryItem key={entity} entity={entity} quality={quality} />
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
      <h2 className="py-2 text-lg font-semibold">Summary</h2>
      <div className="flex flex-row gap-12 [&>*]:flex-1">
        <StationSummary />
        <MaterialSummary />
      </div>
    </div>
  );
};

export default Summary;
