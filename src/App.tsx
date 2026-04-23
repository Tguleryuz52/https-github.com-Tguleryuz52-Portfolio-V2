/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SmoothScroll } from './lib/smooth-scroll';
import { Home } from './pages/Home';
import { ProjectsPage } from './pages/ProjectsPage';

export default function App() {
  return (
    <Router>
      <SmoothScroll>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectsPage />} />
        </Routes>
      </SmoothScroll>
    </Router>
  );
}

