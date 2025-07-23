import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginRegister from './pages/LoginRegister';
import OwnerDashboard from './pages/OwnerDashboard';
import BuilderDashboard from './pages/BuilderDashboard';
import SupplierDashboard from './pages/SupplierDashboard';
import AuthCallback from './pages/AuthCallback'; // <-- Add this import

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/auth/callback" element={<AuthCallback />} /> {/* <-- Add this line */}
        <Route path="/owner-dashboard/*" element={<OwnerDashboard />} />
        <Route path="/builder-dashboard/*" element={<BuilderDashboard />} />
        <Route path="/supplier-dashboard/*" element={<SupplierDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;