import { Container, Stack } from '@mui/joy';
import SearchSection from './SearchSection';


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
      >
        <SearchSection />
      </Stack>
    </Container>
  );
};

export default Layout;
