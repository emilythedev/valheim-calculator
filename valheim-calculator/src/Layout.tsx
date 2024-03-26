import { Box, Container, Stack } from '@mui/joy';
import SearchSection from './SearchSection';
import SummarySection from './SummarySection';


const Layout = () => {
  return (
    <Container sx={{
      height: '100vh',
      display: 'flex',
    }}>
      <Stack
        flexGrow={1}
        alignItems="stretch"
        spacing={4}
        my={4}
        direction="row"
      >
        <Box display="flex" flex="0 0 50%">
          <SearchSection />
        </Box>
        <Box display="flex" flex="0 0 50%">
          <SummarySection />
        </Box>
      </Stack>
    </Container>
  );
};

export default Layout;
