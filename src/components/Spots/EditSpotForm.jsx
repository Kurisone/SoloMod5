import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getSpotById, updateSpot } from '../../store/spots';
import './EditSpotForm.css';

function EditSpotForm() {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const spot = useSelector((state) => state.spots.singleSpot);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState({});

  // Form state
  const [formData, setFormData] = useState({
    country: "",
    address: "",
    city: "",
    state: "",
    description: "",
    name: "",
    price: "",
  });
  
  const [images, setImages] = useState(["", "", "", "", ""]);

  // Fetch spot data with 1-second delay
  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        await dispatch(getSpotById(spotId));
      } catch (err) {
        setErrors({ fetch: "Failed to load spot data" });
      } finally {
        setIsLoading(false);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [dispatch, spotId]);

  // Initialize form when spot loads
  useEffect(() => {
    if (spot) {
      setFormData({
        country: spot.country || "",
        address: spot.address || "",
        city: spot.city || "",
        state: spot.state || "",
        description: spot.description || "",
        name: spot.name || "",
        price: spot.price || "",
      });

      if (spot.SpotImages?.length > 0) {
        const urls = spot.SpotImages.map(img => img.url);
        const filledImages = [...urls, "", "", "", "", ""].slice(0, 5);
        setImages(filledImages);
      }
    }
  }, [spot]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (index, value) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.description || formData.description.length < 30) 
      newErrors.description = "Description needs 30 or more characters";
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.price) newErrors.price = "Price is required";
    if (!images[0]) newErrors.images = "At least one image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateForm()) return;

  const spotData = {
    address: formData.address,
    city: formData.city,
    state: formData.state,
    country: formData.country,
    lat: formData.lat || 0,
    lng: formData.lng || 0,
    name: formData.name,
    description: formData.description,
    price: parseFloat(formData.price),
    previewImage: images[0] || '',
    images: images.slice(1).filter(url => url.trim() !== "")
  };

  try {
    const result = await dispatch(updateSpot(spotId, spotData));
    
    if (result) {
      await dispatch(getSpotById(spotId));
      navigate(`/spots/${spotId}`);
    }
  } catch (err) {
    console.error('Update error:', err);
    setErrors({ 
      submit: err.message || "Failed to update spot. Please try again."
    });
  }
};

  if (isLoading) {
    return (
      <div className="edit-spot-loading">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <h2>Loading spot details...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-spot-form-container">
      <form onSubmit={handleSubmit} className="edit-spot-form">
        <h2>Edit Your Spot</h2>
        
        {errors.submit && <div className="error-message">{errors.submit}</div>}

        <div className="form-section">
          <h3>Where's your place located?</h3>
          <p>Guests will only get your exact address once they book a reservation.</p>
          
          <div className="input-group">
            <label>Country</label>
            <input
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Country"
            />
            {errors.country && <span className="error">{errors.country}</span>}
          </div>

          <div className="input-group">
            <label>Street Address</label>
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
            />
            {errors.address && <span className="error">{errors.address}</span>}
          </div>

          <div className="input-row">
            <div className="input-group">
              <label>City</label>
              <input
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
              />
              {errors.city && <span className="error">{errors.city}</span>}
            </div>

            <div className="input-group">
              <label>State</label>
              <input
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="State"
              />
              {errors.state && <span className="error">{errors.state}</span>}
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Describe your place to guests</h3>
          <p>Mention the best features of your space.</p>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Please write at least 30 characters"
          />
          {errors.description && <div className="error">{errors.description}</div>}
        </div>

        <div className="form-section">
          <h3>Create a title for your spot</h3>
          <p>Catch guests' attention with a spot title.</p>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name of your spot"
          />
          {errors.name && <div className="error">{errors.name}</div>}
        </div>

        <div className="form-section">
          <h3>Set a base price</h3>
          <p>Competitive pricing can help your listing stand out.</p>
          <div className="price-input">
            <span>$</span>
            <input
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price per night (USD)"
            />
          </div>
          {errors.price && <div className="error">{errors.price}</div>}
        </div>

        <div className="form-section">
          <h3>Liven up your spot with photos</h3>
          <p>Submit at least one photo to publish your spot.</p>
          {errors.images && <div className="error">{errors.images}</div>}
          <div className="image-inputs">
            {images.map((url, index) => (
              <input
                key={index}
                type="url"
                value={url}
                onChange={(e) => handleImageChange(index, e.target.value)}
                placeholder={index === 0 ? "Preview Image URL (required)" : "Image URL"}
              />
            ))}
          </div>
        </div>

        <button type="submit" className="submit-button">Save Changes</button>
      </form>
    </div>
  );
}

export default EditSpotForm;