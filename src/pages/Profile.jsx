import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase.js';

// firebase storage
//       allow read;
//       allow write: if
//       request.resource.size < 2 * 1024 * 1024 &&
//       request.resource.contentType.matches("image/.*")

const Profile = () => {
  const fileRef = useRef(null);
  const { currentUser } = useSelector(state => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

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
  return (
    <section className="bg-slate-100 h-screen">
      <div className="max-container padding-x py-8 max-w-lg mx-auto">
        <h2
          className="text-3xl text-center text-secondary font-semibold 
        mb-4 font-roboto uppercase"
        >
          Profile
        </h2>
        <form onSubmit={() => {}} className="flex flex-col gap-4 mb-4">
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
            className="border p-3 rounded-md outline-none info-text"
            id="username"
            onChange={() => {}}
          />
          <input
            type="email"
            placeholder="email"
            className="border p-3 rounded-md outline-none info-text"
            id="email"
            onChange={() => {}}
          />
          <input
            type="password"
            placeholder="password"
            className="border p-3 rounded-md outline-none info-text"
            id="password"
            onChange={() => {}}
          />
          <button
            className="bg-slate-800 text-white rounded-md uppercase 
          font-poppins p-3 hover:bg-primary disabled:opacity-60"
          >
            Update
            {/* {loading ? 'Loading...' : 'Sign Up'} */}
          </button>
          <button
            className="bg-green-700 text-white rounded-md uppercase 
          font-poppins p-3 hover:bg-green-900 disabled:opacity-60"
          >
            Create Advert
            {/* {loading ? 'Loading...' : 'Sign Up'} */}
          </button>
        </form>
        <div className="flex justify-between items-baseline mb-4">
          <p className="text-red-600 font-roboto cursor-pointer">
            Delete account
          </p>
          <p className="text-red-600 font-roboto cursor-pointer">Sign out</p>
        </div>
        <p className="text-green-700 font-roboto text-center cursor-pointer">
          Show adverts
        </p>

        {/* {error && Notify.failure(`${error}`)} */}
      </div>
    </section>
  );
};

export default Profile;
