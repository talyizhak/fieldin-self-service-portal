import { Routes, Route } from 'react-router-dom';
import { AppProvider } from './components/AppContext';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { LandingPage } from './pages/LandingPage';
import { MachineDetailPage } from './pages/MachineDetailPage';
import { HardwarePage } from './pages/HardwarePage';
import { ConnectionDetailPage } from './pages/ConnectionDetailPage';

export default function App() {
  return (
    <AppProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/machinery" element={<HomePage />} />
          <Route path="/machine/:id" element={<MachineDetailPage />} />
          <Route path="/hardware" element={<HardwarePage />} />
          <Route path="/connect/:methodId" element={<ConnectionDetailPage />} />
        </Route>
      </Routes>
    </AppProvider>
  );
}
