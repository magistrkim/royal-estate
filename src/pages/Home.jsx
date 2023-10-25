import { Link } from 'react-router-dom';
import ListingCard from '../components/ListingCard';
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';

const Home = () => {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchOfferLstings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferLstings();
  }, []);

  return (
    <section className="bg-slate-100">
      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map(listing => (
            <SwiperSlide key={listing._id}>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
                className="h-[320px] sm:h-[480px] z-10"
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>
      <div className="max-container padding-x py-20">
        <div className="flex flex-col gap-4 sm:gap-8 pt-2 max-w-full sm:max-w-[480px]">
          <h1 className="text-secondary font-bold font-poppins uppercase text-2xl md:text-4xl">
            Find your <span className="text-primary">royal </span>
            <br />
            <span className="text-primary">place</span> with ease
          </h1>
          <p className="text-slate-500 text-sm sm:text-base font-roboto">
            Unlock the door to your dream home effortlessly with Royal Estate,
            where convenience meets excellence. Lean on our dedicated team of
            experts, standing by to ensure your search is not just easy, but
            extraordinary.
          </p>
          <Link to={'/search'}>
            <button
              className="bg-red-800 text-white rounded-md uppercase 
          font-poppins p-2 sm:p-3 hover:bg-primary"
            >
              try & enjoy
            </button>
          </Link>
        </div>
        <div className="pt-16 flex flex-col gap-8">
          {offerListings && offerListings.length > 0 && (
            <div className="mb-8">
              <div className="mb-4">
                <h2
                  className="text-2xl text-secondary font-semibold 
        mb-1 font-roboto uppercase"
                >
                  Recent offers
                </h2>
                <Link
                  className="text-lg text-green-700 font-semibold 
       font-roboto hover:underline"
                  to={'/search?offer=true'}
                >
                  Show more
                </Link>
              </div>
              <div className="flex flex-wrap gap-6 justify-center">
                {offerListings.map(listing => (
                  <ListingCard key={listing._id} listing={listing} />
                ))}
              </div>
            </div>
          )}
          {rentListings && rentListings.length > 0 && (
            <div className="mb-8">
              <div className="mb-4">
                <h2
                  className="text-2xl text-secondary font-semibold 
        mb-1 font-roboto uppercase"
                >
                  Recent estate for rent
                </h2>
                <Link
                  className="text-lg text-green-700 font-semibold 
       font-roboto hover:underline"
                  to={'/search?type=rent'}
                >
                  Show more
                </Link>
              </div>
              <div className="flex flex-wrap gap-6 justify-center">
                {rentListings.map(listing => (
                  <ListingCard key={listing._id} listing={listing} />
                ))}
              </div>
            </div>
          )}
          {saleListings && saleListings.length > 0 && (
            <div>
              <div className="mb-4">
                <h2
                  className="text-2xl text-secondary font-semibold 
        mb-1 font-roboto uppercase"
                >
                  Recent estate for sale
                </h2>
                <Link
                  className="text-lg text-green-700 font-semibold 
       font-roboto hover:underline"
                  to={'/search?type=sale'}
                >
                  Show more
                </Link>
              </div>
              <div className="flex flex-wrap gap-6 justify-center">
                {saleListings.map(listing => (
                  <ListingCard key={listing._id} listing={listing} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Home;
