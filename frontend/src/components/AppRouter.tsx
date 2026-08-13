import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import AuthPage from '../pages/AuthPage';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />

        <Route path="/register" element={<AuthPage isLogin={false} />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;