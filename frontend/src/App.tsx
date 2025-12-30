import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PageLayout from './components/layout/PageLayout/PageLayout';
import Home from './pages/Home/Home';
import Journey from './pages/Journey/Journey';
import Projects from './pages/Projects/Projects';
import Skills from './pages/Skills/Skills';
import Hackathons from './pages/Hackathons/Hackathons';
import Contact from './pages/Contact/Contact';
import NotFound from './pages/NotFound/NotFound';
import './styles/global.css';

function App() {
  return (
    <BrowserRouter>
      <PageLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/journey" element={<Journey />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/hackathons" element={<Hackathons />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PageLayout>
    </BrowserRouter>
  );
}

export default App;
