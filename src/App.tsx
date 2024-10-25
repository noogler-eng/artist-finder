import Landing from "./pages/Landing";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyPlaylists from "./pages/MyPlaylists";

function App() {
  return (
    <div className="bg-black min-h-screen text-white">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/my-playlists" element={<MyPlaylists />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
