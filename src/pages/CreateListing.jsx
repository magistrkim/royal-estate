const CreateListing = () => {
  return (
    <section className="bg-slate-100 h-screen">
      <div className="max-container padding-x py-8 max-w-4xl mx-auto">
        <h2
          className="text-3xl text-center text-secondary font-semibold 
        mb-4 font-roboto uppercase"
        >
          Create listing
        </h2>
        <form className="flex flex-col sm:flex-row gap-4">
          <div className="flex flex-col gap-4 flex-1">
            <input
              type="text"
              placeholder="name"
              className="border p-3 rounded-md outline-none info-text"
              id="name"
              minLength="10"
              maxLength="62"
              required
            />
            <textarea
              type="text"
              placeholder="description"
              className="border p-3 rounded-md outline-none info-text"
              id="description"
              required
            />
            <input
              type="text"
              placeholder="address"
              className="border p-3 rounded-md outline-none info-text"
              id="address"
              required
            />
            <div className="flex gap-6 flex-wrap">
              <div className="flex gap-3">
                <input type="checkbox" id="sale" className="w-5 outline-none" />
                <p className="uppercase navlink">Sell</p>
              </div>
              <div className="flex gap-3">
                <input type="checkbox" id="rent" className="w-5 outline-none" />
                <p className="uppercase navlink">Rent</p>
              </div>
              <div className="flex gap-3">
                <input
                  type="checkbox"
                  id="parking"
                  className="w-5 outline-none"
                />
                <p className="uppercase navlink">Parking</p>
              </div>
              <div className="flex gap-3">
                <input
                  type="checkbox"
                  id="furnished"
                  className="w-5 outline-none"
                />
                <p className="uppercase navlink">Furnished</p>
              </div>
              <div className="flex gap-3">
                <input
                  type="checkbox"
                  id="offer"
                  className="w-5 outline-none"
                />
                <p className="uppercase navlink">Offer</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-6">
              <div className="flex gap-3 items-center">
                <input
                  type="number"
                  id="bedrooms"
                  min="1"
                  max="10"
                  required
                  className="border p-3 rounded-md border-gray-300 outline-0"
                />
                <p className="uppercase navlink">Beds</p>
              </div>
              <div className="flex gap-3 items-center">
                <input
                  type="number"
                  id="bathrooms"
                  min="1"
                  max="10"
                  required
                  className="border p-3 rounded-md border-gray-300 outline-0"
                />
                <p className="uppercase navlink">Baths</p>
              </div>
              <div className="flex gap-3 items-center">
                <input
                  type="number"
                  id="regularPrice"
                  min="1"
                  max="10"
                  required
                  className="border p-3 rounded-md border-gray-300 outline-0"
                />
                <div className="flex flex-col items-center">
                  <p className="uppercase navlink">Regular price</p>
                  <span className="text-xs">($/month)</span>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <input
                  type="number"
                  id="discountPrice"
                  min="1"
                  max="10"
                  required
                  className="border p-3 rounded-md border-gray-300 outline-0"
                />
                <div className="flex flex-col items-center">
                  <p className="uppercase navlink">Discount price</p>
                  <span className="text-xs">($/month)</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-4">
            <p className="uppercase navlink">
              Images:{' '}
              <span className="text-sm lowercase font-normal text-secondary ml-2">
                The first image is a cover (max 6)
              </span>{' '}
            </p>
            <div className="flex gap-4 ">
              <input
                type="file"
                id="images"
                accept="image/*"
                multiple
                className="p-3 border border-gray-300 rounded w-full font-poppins"
              />
              <button
                className="bg-green-700 text-white text-center rounded-md uppercase 
          font-poppins p-3 hover:bg-green-900 disabled:opacity-60"
              >
                upload
              </button>
            </div>
            <button
              className="bg-slate-800 text-white rounded-md uppercase 
          font-poppins p-3 hover:bg-primary disabled:opacity-60"
            >
              create listing
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreateListing;
