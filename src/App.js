import './App.css';

import { ThemeProvider, createTheme } from "@mui/material/styles";
import styled from 'styled-components';

import Header from './components/utility/Header';
import List from './components/utility/List';

function App() {
  return ( 
    <div className="App">
        <Header />
        <List />
    </div>
  );
}

export default App;
