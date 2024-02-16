import { Container, CssBaseline, CssVarsProvider } from '@mui/joy'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  return (
    <CssVarsProvider>
      <CssBaseline />
      <Container>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <h1>Vite + React</h1>
      </Container>
    </CssVarsProvider>
  )
}

export default App
