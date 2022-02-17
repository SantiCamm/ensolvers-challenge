import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom'
import Todos from './pages/Todos';
import Login from './pages/Login';
import NavBar from './components/Navbar';

function App() {
  const location = useLocation();
  return (
    <>
    {(location.pathname !== "/login") && <NavBar />}
    <Routes>
          <Route path="/todos" element={<Todos />} />
          <Route path="/login" element={<Login />} />
        </Routes>
    </>
  );
}

export default App;
