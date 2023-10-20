import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase.js';

const CreateListing = () => {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: '',
    description: '',
    address: '',
    type: 'rent',
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector(state => state.user);
  const navigate = useNavigate();

  const handleImageSubmit = event => {
    event.preventDefault();
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then(urls => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch(error => {
          setImageUploadError('Image upload is failed (2mb per image)');
          setUploading(false);
          console.log(error);
        });
    } else {
      setImageUploadError('Yoy can upload only 6 images per listing');
      setUploading(false);
    }
  };
  const storeImage = async file => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        snapshot => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        error => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
            resolve(downloadURL);
          });
        }
      );
    });
  };
  const handleDeleteImage = index => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };
  const handleChange = event => {
    if (event.target.id === 'sale' || event.target.id === 'rent') {
      setFormData({
        ...formData,
        type: event.target.id,
      });
    }
    if (
      event.target.id === 'parking' ||
      event.target.id === 'furnished' ||
      event.target.id === 'offer'
    ) {
      setFormData({
        ...formData,
        [event.target.id]: event.target.checked,
      });
    }
    if (
      event.target.type === 'number' ||
      event.target.type === 'text' ||
      event.target.type === 'textarea'
    ) {
      setFormData({
        ...formData,
        [event.target.id]: event.target.value,
      });
    }
  };
  const handleSubmit = async event => {
    event.preventDefault();
    if (formData.imageUrls.length < 1)
      return setError('You must upload at least 1 image');
    if (+formData.regularPrice < +formData.discountPrice)
      return setError('Discount price has to be lower than regular price');
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/listing/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });

      const data = await res.json();
      setLoading(false);
      if (!res.ok) {
        setError(data.message);
      }
      navigate(`/listing/${data._id}`);
      console.log(data)
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <section className="bg-slate-100 ">
      <div className="max-container padding-x pt-8 pb-12 max-w-4xl mx-auto">
        <h2
          className="text-3xl text-center text-secondary font-semibold 
        mb-4 font-roboto uppercase"
        >
          Create listing
        </h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4"
        >
          <div className="flex flex-col gap-4 flex-1">
            <input
              type="text"
              placeholder="name"
              className="border p-3 rounded-md outline-none info-text"
              id="name"
              minLength="10"
              maxLength="62"
              required
              onChange={handleChange}
              value={formData.name}
            />
            <textarea
              type="text"
              placeholder="description"
              className="border p-3 rounded-md outline-none info-text"
              id="description"
              required
              onChange={handleChange}
              value={formData.description}
            />
            <input
              type="text"
              placeholder="address"
              className="border p-3 rounded-md outline-none info-text"
              id="address"
              required
              onChange={handleChange}
              value={formData.address}
            />
            <div className="flex gap-6 flex-wrap">
              <div className="flex gap-3">
                <input
                  type="checkbox"
                  id="sale"
                  className="w-5 outline-none"
                  onChange={handleChange}
                  checked={formData.type === 'sale'}
                />
                <p className="uppercase navlink">Sell</p>
              </div>
              <div className="flex gap-3">
                <input
                  type="checkbox"
                  id="rent"
                  className="w-5 outline-none"
                  onChange={handleChange}
                  checked={formData.type === 'rent'}
                />
                <p className="uppercase navlink">Rent</p>
              </div>
              <div className="flex gap-3">
                <input
                  type="checkbox"
                  id="parking"
                  className="w-5 outline-none"
                  onChange={handleChange}
                  checked={formData.parking}
                />
                <p className="uppercase navlink">Parking</p>
              </div>
              <div className="flex gap-3">
                <input
                  type="checkbox"
                  id="furnished"
                  className="w-5 outline-none"
                  onChange={handleChange}
                  checked={formData.furnished}
                />
                <p className="uppercase navlink">Furnished</p>
              </div>
              <div className="flex gap-3">
                <input
                  type="checkbox"
                  id="offer"
                  className="w-5 outline-none"
                  onChange={handleChange}
                  checked={formData.offer}
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
                  onChange={handleChange}
                  value={formData.bedrooms}
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
                  onChange={handleChange}
                  value={formData.bathrooms}
                />
                <p className="uppercase navlink">Baths</p>
              </div>
              <div className="flex gap-3 items-center">
                <input
                  type="number"
                  id="regularPrice"
                  min="50"
                  max="100000000"
                  required
                  className="border p-3 rounded-md border-gray-300 outline-0"
                  onChange={handleChange}
                  value={formData.regularPrice}
                />
                <div className="flex flex-col items-center">
                  <p className="uppercase navlink">Regular price</p>
                  <span className="text-xs">($/month)</span>
                </div>
              </div>
              {formData.offer && (
                <div className="flex gap-3 items-center">
                  <input
                    type="number"
                    id="discountPrice"
                    min="0"
                    max="10000000"
                    required
                    className="border p-3 rounded-md border-gray-300 outline-0"
                    onChange={handleChange}
                    value={formData.discountPrice}
                  />
                  <div className="flex flex-col items-center">
                    <p className="uppercase navlink">Discount price</p>
                    <span className="text-xs">($/month)</span>
                  </div>
                </div>
              )}
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
                onChange={event => setFiles(event.target.files)}
                type="file"
                id="images"
                accept="image/*"
                multiple
                className="p-3 border border-gray-300 rounded w-full font-poppins"
              />
              <button
                type="button"
                disabled={uploading}
                onClick={handleImageSubmit}
                className="bg-green-700 text-white text-center rounded-md uppercase 
          font-poppins p-3 hover:bg-green-900 disabled:opacity-60"
              >
                {uploading ? 'Loading' : 'upload'}
              </button>
            </div>
            <p className="text-red-700">
              {imageUploadError && imageUploadError}
            </p>
            {formData.imageUrls.length > 0 &&
              formData.imageUrls.map((url, index) => (
                <div
                  className="flex justify-between p-3 border border-gray-300 items-center rounded-md"
                  key={url}
                >
                  <img
                    src={url}
                    alt="listing image"
                    className="w-40 h-24 object-cover rounded-md"
                  />
                  <button
                    onClick={() => handleDeleteImage(index)}
                    type="button"
                    className="bg-red-600 text-white rounded-md text-sm uppercase 
          font-poppins p-2 hover:bg-red-800"
                  >
                    Delete
                  </button>
                </div>
              ))}
            <button
              disabled={loading || uploading}
              className="bg-slate-800 text-white rounded-md uppercase 
          font-poppins p-3 hover:bg-primary disabled:opacity-60"
            >
              {loading ? 'Creating' : 'Create listing'}
            </button>
            {error && <p className="text-sm text-red-700">{error}</p>}
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreateListing;
