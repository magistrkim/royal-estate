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
  return (
    <section className="bg-slate-100 h-screen">
      <div className="max-container padding-x py-8 max-w-lg mx-auto">
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
          <button
            className="bg-green-700 text-white rounded-md uppercase 
          font-poppins p-3 hover:bg-green-900 disabled:opacity-60"
          >
            Create Listening
            {/* {loading ? 'Loading...' : 'Sign Up'} */}
          </button>
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
        <p className="text-green-700 font-roboto text-center cursor-pointer">
          Show adverts
        </p>
        {error ? Notify.failure(`${error}`) : ''}
      </div>
    </section>
  );
};

export default Profile;
