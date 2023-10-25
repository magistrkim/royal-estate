import { Link } from "react-router-dom";
const About = () => {
  return (
    <section className="bg-slate-100 py-20">
      <div className="max-container padding-x">
        <div className="flex flex-col gap-2 sm:gap-4 pt-2 mb-10 max-w-full sm:max-w-[480px]">
          <h2 className="text-secondary font-bold font-poppins uppercase text-2xl">
            Our mission
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-roboto">
            Royal Estate is more than just a real estate agency; it is a symbol
            of trust and excellence. With a dedicated team of seasoned
            professionals, we go beyond the traditional role of real estate
            agents. We serve as trusted advisors, leveraging our deep
            understanding of the market to ensure our clients make the most
            informed decisions.
          </p>
          <p className="text-slate-600 text-sm sm:text-base font-roboto">
            Our dedication to exceptional service is evident in every
            interaction. From tailored guidance to personalized solutions, we
            strive to ensure a seamless and rewarding experience, whether you
            are buying, selling, or renting a property. At Royal Estate, your
            real estate aspirations become our shared mission.
          </p>
        </div>
        <Link to={'/search'}>
          <button
            className="bg-red-800 text-white rounded-md uppercase 
          font-poppins p-2 sm:p-3 hover:bg-primary"
          >
            Catalogue
          </button>
        </Link>
      </div>
    </section>
  );
};

export default About;
