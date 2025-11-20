import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Homepage';
import CreateResume from './CreateResume';
import UploadResume from './UploadResume';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* This tells React which page to show for each URL */}
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateResume />} />
        <Route path="/upload" element={<UploadResume />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;