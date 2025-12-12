import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Flashcards from "./pages/document/Flashcards";
import Quiz from "./pages/document/Quiz";
import Revision from "./pages/document/Revision";
import Summary from "./pages/document/Summary";
import Upload from "./pages/Upload";
import { DefaultLayout } from "./components/DefaultLayout";
import { DocumentProvider } from "./contexts/DocumentContext";
import { DocRedirection } from "./components/DocRedirection";
import { Toaster } from "./components/ui/toaster";
import { DocumentBoard } from "./pages/DocumentDashoard";

export default function App() {
  return (
    <>
    <Router>
      <DefaultLayout>
        <DocumentProvider>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/upload" element={<Upload />} />

            {/*Document features */}
            <Route path="/document" element={
              <DocRedirection>
                <DocumentBoard/>
              </DocRedirection>
            } />

            <Route path="/document/summary" element={
              <DocRedirection>
                <Summary/>
              </DocRedirection>
            } />

            <Route path="/document/revision" element={
              <DocRedirection>
                <Revision/>
              </DocRedirection>
            } />
            
            <Route path="/document/flashcards" element={
              <DocRedirection>
                <Flashcards/>
              </DocRedirection>
            } />

            <Route path="/document/quiz" element={
              <DocRedirection>
                <Quiz/>
              </DocRedirection>
            } />
          
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
        </DocumentProvider>
      </DefaultLayout>
    </Router>
    <Toaster/>
    </>
  );
}