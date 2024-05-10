import { Tab, TabList, TabPanel, Tabs, tabClasses } from '@mui/joy';
import SummaryPanel from './SummaryPanel';
import WishlistPanel from './WishlistPanel';

const SummarySection = () => {
  return (
    <Tabs defaultValue={0} sx={{ width: '100%', bgcolor: 'transparent' }}>
      <TabList
        data-testid="cy-summaryTabs"
        tabFlex={1}
        disableUnderline
        sx={{
          p: 0.5,
          gap: 0.5,
          borderRadius: 'xl',
          bgcolor: 'background.level1',
          [`& .${tabClasses.root}[aria-selected="true"]`]: {
            boxShadow: 'sm',
            bgcolor: 'background.surface',
          },
        }}
      >
        <Tab disableIndicator>Wishlist</Tab>
        <Tab disableIndicator>Summary</Tab>
      </TabList>
      <TabPanel value={0} sx={{ overflow: 'auto' }}>
        <WishlistPanel />
      </TabPanel>
      <TabPanel value={1} sx={{ overflow: 'auto' }}>
        <SummaryPanel />
      </TabPanel>
    </Tabs>
  );
};

export default SummarySection;
