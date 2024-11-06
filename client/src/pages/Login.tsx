import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.tsx';
import CustomAlert from '../component/Alert.tsx';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const {
    message, login, succesLogin,
  } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(formData.email, formData.password);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (succesLogin && message) {
      setShowAlert(true);
      navigate('/');
    } else if (!succesLogin && message) {
      setShowAlert(true);
    }
  }, [succesLogin, message, navigate]);

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <div className=" bg-slate-800 w-6/12 mx-auto mt-20 rounded-md p-4 h-auto ">
      {showAlert && <CustomAlert message={message} onClose={handleCloseAlert} />}
      <div>
        <h1 className="text-white text-2xl font-bold mb-4">Login</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-white mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 rounded-md"
              placeholder="Enter your email"
              required
              autoComplete="email"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-white mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 rounded-md"
              placeholder="Enter your password"
              autoComplete="current-password"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-slate-600 text-white font-bold py-2 px-4 rounded-md w-full"
          >
            Submit
          </button>
        </form>

        <div className="mt-4">
          <h1 className="text-white text-lg mb-2">Don&apos;t have an account?</h1>
          <Link to="/register" className="text-blue-400 underline">Register</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
