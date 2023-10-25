

const About = () => {
  return (
    <section className="bg-slate-100 py-20">
      <div className="max-container padding-x">
        <div className="flex flex-col gap-4 sm:gap-8 pt-2 max-w-full sm:max-w-[480px]">
          <h2 className="text-secondary font-bold font-poppins uppercase text-2xl">
            Our mission
          </h2>
          <p className="text-slate-500 text-sm sm:text-base font-roboto">
            {' '}
            Royal Estate is more than just a real estate agency; it is a symbol
            of trust and excellence. With a dedicated team of seasoned
            professionals, we go beyond the traditional role of real estate
            agents. We serve as trusted advisors, leveraging our deep
            understanding of the market to ensure our clients make the most
            informed decisions. Our dedication to exceptional service is evident
            in every interaction. From tailored guidance to personalized
            solutions, we strive to ensure a seamless and rewarding experience,
            whether you are buying, selling, or renting a property. At Royal
            Estate, your real estate aspirations become our shared mission.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About