import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser } = useSelector(state => state.user);
  return (
    <section className="bg-slate-100 h-screen">
      <div className="max-container padding-x py-8 max-w-lg mx-auto">
        <h2
          className="text-3xl text-center text-secondary font-semibold 
        mb-4 font-roboto uppercase"
        >
          Profile
        </h2>
        <form onSubmit={() => {}} className="flex flex-col gap-4 mb-4">
          <img
            src={currentUser.avatar}
            alt="profile image"
            className="rounded-full object-cover w-24 h-24 mb-4 self-center cursor-pointer"
          />
          <input
            type="text"
            placeholder="username"
            className="border p-3 rounded-md outline-none info-text"
            id="username"
            onChange={() => {}}
          />
          <input
            type="email"
            placeholder="email"
            className="border p-3 rounded-md outline-none info-text"
            id="email"
            onChange={() => {}}
          />
          <input
            type="password"
            placeholder="password"
            className="border p-3 rounded-md outline-none info-text"
            id="password"
            onChange={() => {}}
          />
          <button
            className="bg-slate-800 text-white rounded-md uppercase 
          font-poppins p-3 hover:bg-primary disabled:opacity-60"
          >
            Update
            {/* {loading ? 'Loading...' : 'Sign Up'} */}
          </button>
          <button
            className="bg-green-700 text-white rounded-md uppercase 
          font-poppins p-3 hover:bg-green-900 disabled:opacity-60"
          >
            Create Advert
            {/* {loading ? 'Loading...' : 'Sign Up'} */}
          </button>
        </form>
        <div className="flex justify-between items-baseline mb-4">
          <p className="text-red-600 font-roboto cursor-pointer">
            Delete account
          </p>
          <p className="text-red-600 font-roboto cursor-pointer">Sign out</p>
        </div>
        <p className="text-green-700 font-roboto text-center cursor-pointer">
          Show adverts
        </p>

        {/* {error && Notify.failure(`${error}`)} */}
      </div>
    </section>
  );
}

export default Profile