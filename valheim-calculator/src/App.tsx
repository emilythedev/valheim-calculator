import { CssBaseline, CssVarsProvider } from '@mui/joy';
import Layout from './Layout';

function App() {
  return (
    <CssVarsProvider>
      <CssBaseline />
      <Layout />
    </CssVarsProvider>
  );
}

export default App;
