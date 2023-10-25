import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';
import { useState } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';

const Signin = () => {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector(state => state.user);
  const [, setErrors] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = event => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
    setErrors(null);
  };
  const handleSubmit = async event => {
    event.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        const errorData = await res.json();
        dispatch(signInFailure(errorData.message));
        return;
      }
      dispatch(signInSuccess(data));
      Notify.success('Welcome!');
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <section className="bg-slate-100 py-20">
      <div className="max-container padding-x max-w-lg mx-auto">
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
          <OAuth />
        </form>
        <div className="flex gap-2 items-baseline">
          <p className="text-secondary font-roboto">
            Do not have an account yet?
          </p>
          <Link to={'/signup'}>
            <span className="text-primary underline font-roboto">Sign up</span>
          </Link>
        </div>
        {error && Notify.failure(`${error}`)}
      </div>
    </section>
  );
};

export default Signin;
