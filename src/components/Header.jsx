import { logo, menu, close } from '../assets/icons';
import { useState, useEffect } from 'react';
import { FaSistrix } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { navLinks } from '../constants';

const Header = () => {
  const { currentUser } = useSelector(state => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const [toggle, setToggle] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const navigate = useNavigate();

  const handleSubmit = event => {
    event.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);
  const handleLinkClick = label => {
    setActiveLink(label);
  };
  return (
    <section className="bg-slate-300  shadow-md">
      <header className="max-container py-1 padding-x mx-auto">
        <div className="flex justify-between gap-4 items-center">
          <a href="/">
            <img src={logo} alt="royal estate logo" width={100} height={60} />
          </a>
          <form
            onSubmit={handleSubmit}
            className="bg-slate-100 p-2 rounded-md flex items-center"
          >
            <input
              value={searchTerm}
              onChange={event => setSearchTerm(event.target.value)}
              type="text"
              placeholder="Search..."
              className="bg-transparent info-text focus:outline-none w-full md:min-w-[320px]"
            />
            <button>
              <FaSistrix className="text-primary w-[20px] h-[20px] cursor-pointer" />
            </button>
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
              <img
                src={toggle ? close : menu}
                alt="menu icon"
                width={25}
                height={25}
                className=" hover:text-accent cursor-pointer"
                onClick={() => setToggle(!toggle)}
              />
              <div
                className={`${
                  !toggle ? 'hidden' : 'flex'
                } violet-gradient absolute top-20 right-0 mx-4 justify-center 
          my-2 rounded-xl min-w-[320px] min-h-[400px] p-10 z-20
          `}
              >
                <ul className="flex items-center flex-col gap-8">
                  {navLinks.map(item => (
                    <li key={item.label}>
                      <Link
                        to={item.href}
                        className={`font-montserrat leading-normal text-xl
                     text-white font-semibold hover:text-accent uppercase cursor-pointer ${
                       activeLink === item.label
                         ? 'text-black '
                         : 'text-slate-gray'
                     }`}
                        onClick={() => {
                          setToggle(!toggle);
                          handleLinkClick(item.label);
                        }}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </section>
  );
};

export default Header;
