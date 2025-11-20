import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Homepage';
import CreateResume from './CreateResume';
import UploadResume from './UploadResume';
import DownloadResume from './DownloadResume'; // <--- Import the new page

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateResume />} />
        <Route path="/upload" element={<UploadResume />} />
        <Route path="/download" element={<DownloadResume />} /> {/* <--- Add the route */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;