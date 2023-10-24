const Search = () => {
  return (
    <section className="bg-slate-100">
      <div className="max-container padding-x py-8 flex flex-col md:flex-row">
        <div className="p-7 max-md:border-b-2 md:border-r-2 md:min-h-screen">
          <form className="flex flex-col gap-8">
            <div className="flex items-center gap-2">
              <label className="whitespace-nowrap font-roboto text-primary text-lg font-semibold">
                Search Term:
              </label>
              <input
                type="text"
                placeholder="Search..."
                id="searchTerm"
                className="border rounded-md w-full p-3 outline-none"
              />
            </div>
            <div className="flex gap-2 flex-wrap items-center">
              <label className="font-roboto text-primary text-lg font-semibold">
                Type:
              </label>
              <div className="flex gap-2">
                <input type="checkbox" id="all" className="w-5" />
                <span className="info-text">Sale & Rent</span>
              </div>
              <div className="flex gap-2">
                <input type="checkbox" id="rent" className="w-5" />
                <span className="info-text"> Rent</span>
              </div>
              <div className="flex gap-2">
                <input type="checkbox" id="sale" className="w-5" />
                <span className="info-text">Sale</span>
              </div>
              <div className="flex gap-2">
                <input type="checkbox" id="offer" className="w-5" />
                <span className="info-text"> Offer</span>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap items-center">
              <label className="font-roboto text-primary text-lg font-semibold">
                Amenities:
              </label>
              <div className="flex gap-2">
                <input type="checkbox" id="parking" className="w-5" />
                <span className="info-text">Parking</span>
              </div>
              <div className="flex gap-2">
                <input type="checkbox" id="furnished" className="w-5" />
                <span className="info-text"> Furnished</span>
              </div>
            </div>
            <div className=" flex gap-2 items-center">
              <label className="font-roboto text-primary text-lg font-semibold">
                Sort:
              </label>
              <select
                id="sort_order"
                className="outline-none font-roboto text-secondary text-md p-3 rounded-md w-full"
              >
                <option>Price high to low</option>
                <option>Price low to high</option>
                <option>Latest</option>
                <option>Oldest</option>
              </select>
            </div>
            <button
              className="bg-slate-800 text-white rounded-md uppercase 
          font-poppins p-3 hover:bg-primary disabled:opacity-60"
            >
              Search
            </button>
          </form>
        </div>
        <div className="p-7">
          <h2
            className="text-3xl text-secondary font-semibold 
        mb-4 font-roboto uppercase"
          >
            Listing results:
          </h2>
        </div>
      </div>
    </section>
  );
};

export default Search;
