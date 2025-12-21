import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
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
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          {/*Login route */}
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          
          {/*Private Dashboard */}
          <Route element={
            <DefaultLayout>
              <DocumentProvider>
                <Outlet/>
              </DocumentProvider>
            </DefaultLayout>
          }
          >
            
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
            
            </Route>
            
            {/*Route not found */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
      <Toaster/>
    </>
  );
}