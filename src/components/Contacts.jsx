import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Contacts = ({ listing }) => {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState('');

  const onChange = event => {
    setMessage(event.target.value);
  };
  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);

  return (
    <>
      {landlord && (
        <div className="flex flex-col gap-2">
          <p className="font-poppins text-slate-600 max-w-lg">
            Contact{' '}
            <span className="font-semibold text-primary">
              {landlord.username}
            </span>{' '}
            for{' '}
            <span className="font-semibold text-primary">
              {listing.name.toLowerCase()}
            </span>
          </p>
          <textarea
            name="message"
            id="message"
            rows="4"
            value={message}
            onChange={onChange}
            placeholder="Enter your message here..."
            className="w-full border border-gray-300 
            rounded-md mt-2 mb-4 p-2 outline-none font-roboto text-lg"
          ></textarea>
          <Link
            to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
            className="bg-slate-800 text-white rounded-md uppercase 
          font-poppins p-3 hover:bg-primary disabled:opacity-60 text-center"
          >
            Send message
          </Link>
        </div>
      )}
    </>
  );
};

Contacts.propTypes = {
  listing: PropTypes.shape({
    userRef: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default Contacts;
