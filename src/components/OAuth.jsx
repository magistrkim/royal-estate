import { useState } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { GoogleAuthProvider, getAuth, signInWithPopup } from '@firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

const OAuth = () => {
  const [loading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      dispatch(signInSuccess(data));
      Notify.success('Welcome!');
      navigate('/');
    } catch (error) {
      Notify.failure('could not sign in with Google');
      console.log('could not sign in with Google', error);
    }
  };
  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      disabled={loading}
      className="bg-red-700 text-white rounded-md uppercase 
          font-poppins p-3 hover:bg-red-800 disabled:opacity-60"
    >
      {loading ? 'Loading...' : ' Continue with Google'}
    </button>
  );
};

export default OAuth;
