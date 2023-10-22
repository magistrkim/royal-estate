import { FaInstagramSquare, FaLinkedin, FaGithubSquare } from 'react-icons/fa';
import { logoFooter,copyRight } from '../assets/icons';
const Footer = () => {
  return (
    <section className="bg-[#062C4F]">
      <footer className="max-container padding-x py-8">
        <div
          className="flex justify-between items-start flex-wrap gap-4
      max-lg:flex-col"
        >
          <div className="flex flex-col items-start ">
            <a href="/">
              <img src={logoFooter} alt="logo" width={100} height={60} />
            </a>
            <p className="mt-6 text-base leading-7 text-white-400 font-poppins sm:max-w-sm">
              Find Your perfect House with Royal Estate. Follow us!
            </p>
            <div className="flex items-center gap-5 mt-8">
              <div className="flex justify-center items-center gap-4">
                <a href="https://github.com/magistrkim">
                  <FaInstagramSquare className="w-12 h-12 text-white hover:text-slate-300" />
                </a>
                <a href="https://github.com/magistrkim">
                  <FaLinkedin className="w-12 h-12 text-white hover:text-slate-300" />
                </a>
                <a href="https://github.com/magistrkim">
                  <FaGithubSquare className="w-12 h-12 text-white hover:text-slate-300" />
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-1 flex-wrap lg:gap-10 gap-20 justify-between">
            <div>
              <h4 className="text-white font-poppins text-2xl leading-normal font-medium mb-6"></h4>
              <ul>
                <li
                  className="text-white-400 font-poppins text-base 
                    leading-normal mt-3 hover:text-slate-gray cursor-pointer"
                >
                  <a href="#products"></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-24 text-white-400 max-sm:flex-col max-sm:items-center">
          <div className="flex flex-1 justify-start items-center gap-2 font-roboto cursor-pointer">
            <img
              src={copyRight}
              alt="copyright sign"
              width={18}
              height={18}
              className="rounded-full m-0"
            />
            <p className="font-poppins text-sm">
              Copyright. All rights reserved.
            </p>
          </div>
          <p className="font-poppins text-sm cursor-pointer">
            Terms & Conditions
          </p>
        </div>
      </footer>
    </section>
  );
};

export default Footer;
