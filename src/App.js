import './App.css';

import React, {useState} from 'react'

import { ThemeProvider, createTheme } from '@mui/material/styles';

import Header from './components/utility/Header';
import SuperheroGrid from './components/SuperheroGrid';
import CharacterPage from './components/CharacterPage';

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
  const [characterId, setCharacterId] = useState("")

  const updateCharacterId = (id) => {
    console.log(id)
    setCharacterId(id)
  }

  return ( 
    <div className="App">
      <ThemeProvider theme={theme}>
        <Header />
        {characterId === "" && (
          <SuperheroGrid updateCharacterId={updateCharacterId}/>
        )}
        {characterId !== "" && (
          <CharacterPage characterId={characterId}/>
        )}
      </ThemeProvider>
    </div>
  );
}

export default App;
