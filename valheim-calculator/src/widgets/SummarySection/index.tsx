import { Tab, TabList, TabPanel, Tabs, tabClasses } from '@mui/joy';
import SummaryPanel from './SummaryPanel';
import WishlistPanel from './WishlistPanel';

const SummarySection = () => {
  return (
    <Tabs defaultValue={0} sx={{ width: '100%', bgcolor: 'transparent' }}>
      <TabList
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
      <TabPanel value={0}>
        <WishlistPanel />
      </TabPanel>
      <TabPanel value={1}>
        <SummaryPanel />
      </TabPanel>
    </Tabs>
  )
};

export default SummarySection;
