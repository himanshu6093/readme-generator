import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Index";
import Content from "./pages/content";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/content" element={<Content />} />
        {/* Optional: add 404 route */}
        <Route path="*" element={<h2 className="text-center mt-20">Page Not Found</h2>} />
      </Routes>
    </Router>
  );
}
