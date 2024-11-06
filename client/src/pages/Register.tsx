import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.tsx';
import CustomAlert from '../component/Alert.tsx';

function Register() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const {
    message, register, succesRegister,
  } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  useEffect(() => {
    if (succesRegister && message) {
      setShowAlert(true);
      navigate('/login');
    } else if (!succesRegister && message) {
      setShowAlert(true);
    }
  }, [succesRegister, message, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await register(formData.username, formData.email, formData.password);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <div className=" bg-slate-800 w-6/12 mx-auto mt-20 rounded-md p-4 h-auto">
      {showAlert && <CustomAlert message={message} onClose={handleCloseAlert} /> }
      <div>
        <h1 className="text-white text-2xl font-bold mb-4">Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-white mb-2">
              username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 rounded-md"
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-white mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 rounded-md"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-white mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              name="password"
              onChange={handleChange}
              className="w-full p-2 rounded-md"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className=" bg-slate-600 text-white font-bold py-2 px-4 rounded-md w-full"
          >
            submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
