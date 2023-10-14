import { logo } from '../assets/icons';
import { FaSistrix, FaBars } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Header = () => {
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
              <li className="uppercase navlink">
                <NavLink to="royal-estate/">Home</NavLink>
              </li>
              <li className="uppercase navlink">
                <NavLink to="royal-estate/about">About</NavLink>
              </li>
              <li className="uppercase navlink">
                <NavLink to="royal-estate/signin">Sign In</NavLink>
              </li>
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
