import { useNavigate } from 'react-router-dom';
import Header from '../component/Header.tsx';
import List from '../component/List.tsx';
import { useAuth } from '../hooks/useAuth.tsx';

function Home() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="p-4">
      <div className="w-2/5 mx-auto mt-2 h-full p-3 rounded-xl bg-slate-950">
        <Header />
        <List />
      </div>
      <div className="mt-5 mx-auto bg-red-500 rounded-md p-3 font-semibold w-28 text-center">
        <button type="button" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Home;
