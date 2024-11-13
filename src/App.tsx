import Landing from "./pages/Landing";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyPlaylists from "./pages/MyPlaylists";
import { ThemeProvider } from "./components/ThemeProvider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen text-white">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/my-playlists" element={<MyPlaylists />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
