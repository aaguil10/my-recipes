import React from 'react';
import logo from '../logo.svg';
import '../App.css';
import CenteredGrid from './FluidGrid';
import AppBar from './AppBar';
import FooterPage from './FooterPage';

function App() {
  return (
    <>
    	<AppBar />
    	<CenteredGrid />
    	<FooterPage />
    </>
  );
}

export default App;
