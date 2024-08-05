import MaterialList from '@/entities/recipe/MaterialList';
import RecipeListItem from '@/entities/recipe/RecipeListItem';
import ShelfStatusText from '@/entities/recipe/ShelfStatusText';
import { summaryAtom } from '@/shared/atoms';
import { useOpenDialog } from '@/shared/hooks';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import KeyValueList from '@/shared/ui/KeyValueList';
import { Section, SectionHeader } from '@/shared/ui/section';
import { useAtomValue } from 'jotai';
import { selectAtom } from 'jotai/utils';
import { isEqual } from 'lodash-es';

const materialsSummary = selectAtom(summaryAtom, v => v.materials);
const stationsSummary = selectAtom(summaryAtom, v => v.stations, isEqual);

const StationSummaryItem = ({ entity, quality }: { entity: EntityId, quality: QualityLevel }) => {
  const openDialog = useOpenDialog({ entity, quality: 1 }); // station is not upgradable, quality = number of extension

  return (
    <RecipeListItem
      key={entity}
      entity={entity}
      quality={quality}
      onViewRecipe={openDialog}
    >
      <ShelfStatusText allowAdd />
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
    <Card id="Summary">
      <CardHeader>
        <CardTitle>Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-12 [&>*]:flex-1">
          <StationSummary />
          <MaterialSummary />
        </div>
      </CardContent>
    </Card>
  );
};

export default Summary;
