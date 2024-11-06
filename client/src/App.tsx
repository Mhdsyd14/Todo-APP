import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.tsx';
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';
import PrivateRoot from './component/PrivateRoot.tsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={(
            <PrivateRoot>
              <Home />
            </PrivateRoot>
      )}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
