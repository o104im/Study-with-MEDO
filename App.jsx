import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import UploadPage from './pages/UploadPage';
import SummaryResultPage from './pages/SummaryResultPage';
import QuestionsResultPage from './pages/QuestionsResultPage';
import MindMapResultPage from './pages/MindMapResultPage';
import FeaturesPage from './pages/FeaturesPage';
import HowToUsePage from './pages/HowToUsePage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="upload" element={<UploadPage />} />
          <Route path="summary-result" element={<SummaryResultPage />} />
          <Route path="questions-result" element={<QuestionsResultPage />} />
          <Route path="mindmap-result" element={<MindMapResultPage />} />
          <Route path="features" element={<FeaturesPage />} />
          <Route path="how-to-use" element={<HowToUsePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

