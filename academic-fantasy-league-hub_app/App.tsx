import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DashboardPage from './components/DashboardPage';
import ProfilePage from './components/ProfilePage';
import TeamPage from './components/TeamPage';
import LeaguePage from './components/LeaguePage';
import TutorialsPage from './components/TutorialsPage';
import MarketplacePage from './components/MarketplacePage';
import ResearchAssistantPage from './components/ResearchAssistantPage';
import { UserProvider } from './contexts/UserContext'; 

const App: React.FC = () => {
  return (
    <UserProvider>
      <HashRouter>
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-gray-100">
          <Navbar />
          <main className="flex-grow container mx-auto px-2 sm:px-4 py-8">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/team" element={<TeamPage />} />
              <Route path="/league" element={<LeaguePage />} />
              <Route path="/tutorials" element={<TutorialsPage />} />
              <Route path="/marketplace" element={<MarketplacePage />} />
              <Route path="/assistant" element={<ResearchAssistantPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </HashRouter>
    </UserProvider>
  );
};

export default App;
