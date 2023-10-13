import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const Signin = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = event => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
    setError(null);
  };
  const handleSubmit = async event => {
    event.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      Notify.success('Welcome!');
      navigate('/royal-estate/');
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
          Sign in
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-4">
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
            {loading ? 'Loading...' : 'Sign In'}
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
          <p className="text-secondary font-roboto">
            Do not have an account yet?
          </p>
          <Link to={'/royal-estate/signup'}>
            <span className="text-primary underline font-roboto">Sign up</span>
          </Link>
        </div>
        {error && Notify.failure(`${error}`)}
      </div>
    </section>
  );
};

export default Signin;
