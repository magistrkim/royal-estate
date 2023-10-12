import { Link } from 'react-router-dom';

const Signin = () => {
  return (
    <section className="bg-slate-100 h-screen">
      <div className="max-container padding-x py-8 max-w-lg mx-auto">
        <h2
          className="text-3xl text-center text-secondary font-semibold 
        mb-4 font-roboto uppercase"
        >
          Sign in
        </h2>
        <form className="flex flex-col gap-4 mb-4">
          <input
            type="email"
            placeholder="email"
            className="border p-3 rounded-md outline-none info-text"
            id="email"
          />
          <input
            type="password"
            placeholder="password"
            className="border p-3 rounded-md outline-none info-text"
            id="password"
          />
          <button
            className="bg-slate-800 text-white rounded-md uppercase 
          font-poppins p-3 hover:bg-primary disabled:opacity-60"
          >
            Sign In
          </button>
          <button
            className="bg-red-700 text-white rounded-md uppercase 
          font-poppins p-3 hover:bg-red-800 disabled:opacity-60"
          >
            Continue with Google
          </button>
        </form>
        <div className="flex gap-2 items-baseline">
          <p className="text-secondary font-roboto">Do not have an account yet?</p>
          <Link to={'/royal-estate/signup'}>
            <span className="text-primary underline font-roboto">Sign up</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Signin;
