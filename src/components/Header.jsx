import { logo } from '../assets/icons';
import { FaSistrix, FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const { currentUser } = useSelector(state => state.user);
  return (
    <section className="bg-slate-300  shadow-md">
      <header className="max-container py-1 padding-x mx-auto">
        <div className="flex justify-between items-center">
          <a href="/">
            <img src={logo} alt="royal estate logo" width={100} height={60} />
          </a>
          <form className="bg-slate-100 p-2 rounded-md flex items-center">
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent info-text focus:outline-none w-full md:min-w-[320px]"
            />
            <FaSistrix className="text-primary w-[20px] h-[20px] cursor-pointer" />
          </form>
          <nav>
            <ul className="flex items-center gap-6 max-md:hidden">
              <Link to="/">
                <li className="uppercase navlink">Home</li>
              </Link>
              <Link to="/about">
                <li className="uppercase navlink">About</li>
              </Link>
              <Link to="/profile">
                {currentUser ? (
                  <img
                    src={currentUser.avatar}
                    alt="profile image"
                    className="rounded-full object-cover w-10 h-10 "
                  />
                ) : (
                  <li className="uppercase navlink" to="/signin">
                    Sign In
                  </li>
                )}
              </Link>
            </ul>
            <div className="hidden max-md:block ml-4 ">
              <FaBars className="text-primary w-[24px] h-[24px] hover:text-accent cursor-pointer" />
            </div>
          </nav>
        </div>
      </header>
    </section>
  );
};

export default Header;
