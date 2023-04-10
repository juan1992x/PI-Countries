import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SearchBar from './componentes/SearchBar';
import HomePage from './componentes/Home';
import LandingPage from './componentes/LandingPage';

function App() {
  return (
    <div className="App">
      <h1>Henry Countries</h1>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
      <SearchBar />
    </div>
  );
}

export default App;
