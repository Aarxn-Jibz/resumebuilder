import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Homepage';
import CreateResume from './CreateResume';
import UploadResume from './UploadResume';
import DownloadResume from './DownloadResume'; 
import AIScore from './AIScore';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateResume />} />
        <Route path="/upload" element={<UploadResume />} />
        <Route path="/download" element={<DownloadResume />} /> 
        <Route path="/aiscore" element={<AIScore />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;