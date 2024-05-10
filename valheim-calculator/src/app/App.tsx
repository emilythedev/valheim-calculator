import Home from '@/pages/Home';
import { CssBaseline, CssVarsProvider, useTheme } from '@mui/joy';
import { Toaster } from 'react-hot-toast';

function App() {
  const theme = useTheme();

  return (
    <CssVarsProvider>
      <CssBaseline />
      <Home />
      <Toaster
        containerClassName="ToasterContainer"
        toastOptions={{
          style: {
            padding: theme.spacing(1, 2),
          },
          error: {
            style: {
              background: theme.palette.danger.softBg,
              color: theme.palette.danger.softColor,
            },
            iconTheme: {
              primary: theme.palette.danger.softColor,
              secondary: theme.palette.danger.softBg,
            },
          },
        }}
      />
    </CssVarsProvider>
  );
}

export default App;
