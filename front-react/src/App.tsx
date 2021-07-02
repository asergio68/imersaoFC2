//import * as React from 'react';
//import logo from './logo.svg';
import './App.css';
import { Container, CssBaseline, MuiThemeProvider } from '@material-ui/core';
import theme from './theme';
import { Title } from './components/Title';
import { Mapping } from './components/Mapping';


function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline/>
      <Container>
        <Title>Code Delivery</Title>
        <Mapping/>
      </Container>
    </MuiThemeProvider>
  );
}

export default App;
