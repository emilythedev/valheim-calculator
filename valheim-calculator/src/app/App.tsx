import Home from '@/pages/Home';
import { CssBaseline, CssVarsProvider } from '@mui/joy';

function App() {
  return (
    <CssVarsProvider>
      <CssBaseline />
      <Home />
    </CssVarsProvider>
  );
}

export default App;
