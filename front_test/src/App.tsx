import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Flashcards from "./pages/document/Flashcards";
import Quiz from "./pages/document/Quiz";
import Revision from "./pages/document/Revision";
import Summary from "./pages/document/Summary";
import Upload from "./pages/Upload";
import { DefaultLayout } from "./components/DefaultLayout";
import Document from "./pages/Document";

export default function App() {
  return (
    <Router>
      <DefaultLayout>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/upload" element={<Upload />} />

          <Route path="/document" element={<Document />} />
          <Route path="/document/summary" element={<Summary />} />
          <Route path="/document/revision" element={<Revision />} />
          <Route path="/document/flashcards" element={<Flashcards />} />
          <Route path="/document/quiz" element={<Quiz />} />
          
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </DefaultLayout>
    </Router>
  );
}