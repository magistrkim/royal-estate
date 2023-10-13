import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Signup = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = event => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  };
  const handleSubmit = async event => {
    event.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/royal-estate/signin');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <section className="bg-slate-100 h-screen">
      <div className="max-container padding-x py-8 max-w-lg mx-auto">
        <h2
          className="text-3xl text-center text-secondary font-semibold 
        mb-4 font-roboto uppercase"
        >
          Sign up
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-4">
          <input
            type="text"
            placeholder="username"
            className="border p-3 rounded-md outline-none info-text"
            id="username"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="email"
            className="border p-3 rounded-md outline-none info-text"
            id="email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="password"
            className="border p-3 rounded-md outline-none info-text"
            id="password"
            onChange={handleChange}
          />
          <button
            disabled={loading}
            className="bg-slate-800 text-white rounded-md uppercase 
          font-poppins p-3 hover:bg-primary disabled:opacity-60"
          >
            {loading ? 'Loading...' : 'Sign Up'}
          </button>
          <button
            disabled={loading}
            className="bg-red-700 text-white rounded-md uppercase 
          font-poppins p-3 hover:bg-red-800 disabled:opacity-60"
          >
            {loading ? 'Loading...' : ' Continue with Google'}
          </button>
        </form>
        <div className="flex gap-2 items-baseline">
          <p className="text-secondary font-roboto">Have an account?</p>
          <Link to={'/royal-estate/signin'}>
            <span className="text-primary underline font-roboto">Sign in</span>
          </Link>
        </div>
        {error && <p className="text-red-700 mt-5">{error}</p>}
      </div>
    </section>
  );
};

export default Signup;
