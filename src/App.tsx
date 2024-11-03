import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { MovieDetails } from './pages/MovieDetails';
import { GenrePage } from './pages/GenrePage';
import { SearchPage } from './pages/SearchPage';
import { LegalPage } from './pages/LegalPage';
import { AboutPage } from './pages/AboutPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
      <Route path="/genre/:id" element={<GenrePage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/privacy" element={<LegalPage type="privacy" />} />
      <Route path="/terms" element={<LegalPage type="terms" />} />
      <Route path="/dmca" element={<LegalPage type="dmca" />} />
      <Route path="/about" element={<AboutPage type="about" />} />
      <Route path="/contact" element={<AboutPage type="contact" />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default App;