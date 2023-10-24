import { Link } from 'react-router-dom';
import {
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaBath,
  FaBed,
} from 'react-icons/fa';
import PropTypes from 'prop-types';

const ListingCard = ({ listing }) => {
  return (
    <div
      className="bg-white shadow-lg hover:shadow-2xl transition-shadow
     overflow-hidden rounded-lg w-full sm:w-[310px]"
    >
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imageUrls[0]}
          alt="listing image"
          className="h-[320px] sm:h-[220px] w-full 
          object-cover hover:scale-105  transition-scale duration-300"
        />
        <div className="p-3 flex flex-col gap-2 w-full mt-2">
          <h3
            className="text-lg text-primary font-semibold 
       font-roboto truncate"
          >
            {listing.name}
          </h3>
          <div className="flex gap-2 items-center">
            <FaMapMarkerAlt className="h-4 w-4 text-green-800" />
            <p className="font-roboto text-base text-secondary truncate">
              {listing.address}
            </p>
          </div>
          <p className="line-clamp-3 font-roboto text-sm text-secondary">
            {listing.description}
          </p>
          <p className="text-xl mt-2 text-secondary font-semibold font-roboto">
            $
            {listing.offer
              ? listing.discountPrice.toLocaleString('en-US')
              : listing.regularPrice.toLocaleString('en-US')}
            {listing.type === 'rent' && ' / month'}
          </p>
          <div className="flex items-center gap-6 mb-1 text-primary font-poppins font-semibold">
            <div className="flex items-center gap-2">
              {listing.bedrooms}
              <FaBed />
            </div>
            <div className="flex items-center gap-2">
              {listing.bathrooms}
              <FaBath />
            </div>
            <div>{listing.parking ? <FaParking /> : ''}</div>
            <div>{listing.furnished ? <FaChair /> : ''}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ListingCard;

ListingCard.propTypes = {
  listing: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
    address: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    offer: PropTypes.bool.isRequired,
    parking: PropTypes.bool.isRequired,
    furnished: PropTypes.bool.isRequired,
    discountPrice: PropTypes.number.isRequired,
    regularPrice: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    bedrooms: PropTypes.number.isRequired,
    bathrooms: PropTypes.number.isRequired,
  }).isRequired,
};
