import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ListingCard from '../components/ListingCard';
import Loader from '../components/Loader';
const Search = () => {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: '',
    type: 'all',
    parking: false,
    furnished: false,
    offer: false,
    sort: 'created_at',
    order: 'desc',
  });
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  const navigate = useNavigate();
  const handleChange = event => {
    if (
      event.target.id === 'all' ||
      event.target.id === 'rent' ||
      event.target.id === 'sale'
    ) {
      setSidebarData({ ...sidebarData, type: event.target.id });
    }
    if (event.target.id === 'searchTerm') {
      setSidebarData({ ...sidebarData, searchTerm: event.target.value });
    }
    if (
      event.target.id === 'parking' ||
      event.target.id === 'furnished' ||
      event.target.id === 'offer'
    ) {
      setSidebarData({
        ...sidebarData,
        [event.target.id]:
          event.target.checked || event.target.checked === 'true'
            ? true
            : false,
      });
    }
    if (event.target.id === 'sort_order') {
      const sort = event.target.value.split('_')[0] || 'created_at';
      const order = event.target.value.split('_')[1] || 'desc';
      setSidebarData({ ...sidebarData, sort, order });
    }
  };
  const handleSubmit = event => {
    event.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', sidebarData.searchTerm);
    urlParams.set('type', sidebarData.type);
    urlParams.set('parking', sidebarData.parking);
    urlParams.set('furnished', sidebarData.furnished);
    urlParams.set('offer', sidebarData.offer);
    urlParams.set('sort', sidebarData.sort);
    urlParams.set('order', sidebarData.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const typeFromUrl = urlParams.get('type');
    const parkingFromUrl = urlParams.get('parking');
    const furnishedFromUrl = urlParams.get('furnished');
    const offerFromUrl = urlParams.get('offer');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebarData({
        searchTerm: searchTermFromUrl || '',
        type: typeFromUrl || 'all',
        parking: parkingFromUrl === 'true' ? true : false,
        furnished: furnishedFromUrl === 'true' ? true : false,
        offer: offerFromUrl === 'true' ? true : false,
        sort: sortFromUrl || 'created_at',
        order: orderFromUrl || 'desc',
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      if (data.length > 5) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setListings(data);
      setLoading(false);
    };
    fetchListings();
  }, [location.search]);

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startListingsIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startListingsIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 6) {
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  };

  return (
    <section className="bg-slate-100">
      <div className="max-container padding-x py-8 flex flex-col md:flex-row">
        <div className="py-7 md:pr-7 max-md:border-b-2 md:border-r-2 md:min-h-screen md:min-w-[360px]">
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div className="flex items-center gap-2">
              <label className="whitespace-nowrap font-roboto text-primary text-lg font-semibold">
                Search Term:
              </label>
              <input
                type="text"
                placeholder="Search..."
                id="searchTerm"
                className="border rounded-md w-full p-3 outline-none"
                value={sidebarData.searchTerm}
                onChange={handleChange}
              />
            </div>
            <div className="flex gap-2 flex-wrap items-center">
              <label className="font-roboto text-primary text-lg font-semibold">
                Type:
              </label>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="all"
                  className="w-5"
                  checked={sidebarData.type === 'all'}
                  onChange={handleChange}
                />
                <span className="info-text">Sale & Rent</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="rent"
                  className="w-5"
                  checked={sidebarData.type === 'rent'}
                  onChange={handleChange}
                />
                <span className="info-text"> Rent</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="sale"
                  className="w-5"
                  checked={sidebarData.type === 'sale'}
                  onChange={handleChange}
                />
                <span className="info-text">Sale</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="offer"
                  className="w-5"
                  checked={sidebarData.offer}
                  onChange={handleChange}
                />
                <span className="info-text"> Offer</span>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap items-center">
              <label className="font-roboto text-primary text-lg font-semibold">
                Amenities:
              </label>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="parking"
                  className="w-5"
                  checked={sidebarData.parking}
                  onChange={handleChange}
                />
                <span className="info-text">Parking</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="furnished"
                  className="w-5"
                  checked={sidebarData.furnished}
                  onChange={handleChange}
                />
                <span className="info-text"> Furnished</span>
              </div>
            </div>
            <div className=" flex gap-2 items-center">
              <label className="font-roboto text-primary text-lg font-semibold">
                Sort:
              </label>
              <select
                onChange={handleChange}
                defaultValue={'created_at_desc'}
                id="sort_order"
                className="outline-none font-roboto text-secondary text-md p-3 rounded-md w-full"
              >
                <option value="regularPrice_desc">Price high to low</option>
                <option value="regularPrice_asc">Price low to high</option>
                <option value="createdAt_desc">Latest</option>
                <option value="createdAt_asc"> Oldest</option>
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
        <div className="p-7 w-full">
          <h2
            className="text-3xl text-secondary font-semibold 
        mb-4 font-roboto uppercase max-sm:text-center"
          >
            Listing results:
          </h2>
          <div className="flex flex-row flex-wrap gap-6 max-md:justify-center">
            {!loading && listings.length === 0 && (
              <p className="text-red-700 mt-5 font-roboto font-semibold text-lg">
                No listing found!
              </p>
            )}
            {loading && <Loader />}
            {!loading &&
              listings &&
              listings.map(listing => (
                <ListingCard key={listing._id} listing={listing} />
              ))}
            {showMore && (
              <button
                onClick={onShowMoreClick}
                className="bg-green-900 w-full max-w-[200px] m-auto hover:bg-green-700
                 text-white text-center p-1 rounded-md font-roboto"
              >
                {' '}
                Show more
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Search;
