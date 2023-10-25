import { useSelector } from 'react-redux';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { useRef, useState, useEffect } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase.js';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutStart,
  signOutSuccess,
  signOutFailure,
} from '../redux/user/userSlice.js';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
// firebase storage
//       allow read;
//       allow write: if
//       request.resource.size < 2 * 1024 * 1024 &&
//       request.resource.contentType.matches("image/.*")

const Profile = () => {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector(state => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = file => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      snapshot => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      error => {
        setFileUploadError(true);
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };
  const handleChange = event => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };
  const handleSubmit = async event => {
    event.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      Notify.success('User is updated successfully!');
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };
  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
      Notify.success('User is deleted successfully!');
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  const handleSignOut = async () => {
    try {
      dispatch(signOutStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (!res.ok) {
        dispatch(signOutFailure(data.message));
        return;
      }
      dispatch(signOutSuccess(data));
    } catch (error) {
      dispatch(signOutFailure(error.message));
    }
  };
  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (!res.ok) {
        setShowListingsError(true);
        return;
      }
      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };
  const handleDeleteListing = async listingId => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
        return;
      }
      setUserListings(prev =>
        prev.filter(listing => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="bg-slate-100 py-20">
      <div className="max-container padding-x max-w-lg mx-auto">
        <h2
          className="text-3xl text-center text-secondary font-semibold 
        mb-4 font-roboto uppercase"
        >
          Profile
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-4">
          <input
            onChange={event => setFile(event.target.files[0])}
            type="file"
            ref={fileRef}
            accept="image/*"
            hidden
          />
          <img
            onClick={() => fileRef.current.click()}
            src={formData.avatar || currentUser.avatar}
            alt="profile image"
            className="rounded-full object-cover w-24 h-24 mb-4 self-center cursor-pointer"
          />
          <p className="text-sm self-center">
            {fileUploadError ? (
              <span className="text-red-700 font-poppins">
                Error Image upload (image must be less than 2 mb)
              </span>
            ) : filePerc > 0 && filePerc < 100 ? (
              <span className="text-slate-700 font-poppins">{`Uploading ${filePerc}%`}</span>
            ) : filePerc === 100 ? (
              <span className="text-green-700 font-poppins">
                Image successfully uploaded!
              </span>
            ) : (
              ''
            )}
          </p>
          <input
            type="text"
            placeholder="username"
            defaultValue={currentUser.username}
            className="border p-3 rounded-md outline-none info-text"
            id="username"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="email"
            defaultValue={currentUser.email}
            className="border p-3 rounded-md outline-none info-text"
            id="email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="password"
            className="border p-3 rounded-md outline-none info-text"
            id="password"
            onChange={handleChange}
          />
          <button
            disabled={loading}
            className="bg-slate-800 text-white rounded-md uppercase 
          font-poppins p-3 hover:bg-primary disabled:opacity-60"
          >
            {loading ? 'Loading...' : ' Update'}
          </button>
          <Link
            to={'/create-listing'}
            className="bg-green-700 text-white text-center rounded-md uppercase 
          font-poppins p-3 hover:bg-green-900 disabled:opacity-60"
          >
            {loading ? 'Loading...' : 'Create Listening'}
          </Link>
        </form>
        <div className="flex justify-between items-baseline mb-4">
          <p
            className="text-red-600 font-roboto cursor-pointer"
            onClick={handleDeleteUser}
          >
            Delete account
          </p>
          <p
            className="text-red-600 font-roboto cursor-pointer"
            onClick={handleSignOut}
          >
            Sign out
          </p>
        </div>
        <button
          onClick={handleShowListings}
          className="text-green-700 font-roboto w-full"
        >
          Show adverts
        </button>
        <p className="text-red-700 mt-5">
          {showListingsError ? 'Showing listings error' : ''}
        </p>
        {error ? Notify.failure(`${error}`) : ''}
        {userListings && userListings.length > 0 && (
          <div className="flex flex-col gap-4">
            {userListings.map(listing => (
              <div
                key={listing._id}
                className="flex justify-between p-3 border border-gray-300 items-center
              gap-4 rounded-md"
              >
                <Link to={`/listing/${listing._id}`}>
                  <img
                    src={listing.imageUrls[0]}
                    alt="listing cover"
                    className="w-24 h-16 object-contain"
                  />
                </Link>
                <Link className="flex-1" to={`/listing/${listing._id}`}>
                  <p className="font-poppins text-primary font-semibold hover:text-green-700">
                    {listing.name}
                  </p>
                </Link>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleDeleteListing(listing._id)}
                    className="text-red-700  uppercase 
          font-poppins p-1  hover:opacity-40"
                  >
                    Delete
                  </button>
                  <Link to={`/update-listing/${listing._id}`}>
                    <button
                      className="text-primary uppercase 
          font-poppins p-1 hover:opacity-40"
                    >
                      Edit
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Profile;
