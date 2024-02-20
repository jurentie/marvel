import './App.css';

import { ThemeProvider, createTheme } from '@mui/material/styles';

import Header from './components/utility/Header';
import SuperheroGrid from './components/utility/SuperheroGrid';

const theme = createTheme({
  palette: {
    primary: {
      main: "#FFFFFF"
    },
    secondary: {
      main: "#ED191F"
    }
  },
});

function App() {
  return ( 
    <div className="App">
      <ThemeProvider theme={theme}>
        <Header />
        <SuperheroGrid />
      </ThemeProvider>
    </div>
  );
}

export default App;
