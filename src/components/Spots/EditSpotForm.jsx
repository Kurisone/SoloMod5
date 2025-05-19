import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getSpotById, updateSpot } from '../../store/spots';

function EditSpotForm() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const spot = useSelector((state) => state.spots.singleSpot);

  // State for form fields
  const [formData, setFormData] = useState({
    country: "",
    address: "",
    city: "",
    state: "",
    description: "",
    name: "",
    price: "",
  });
  
  // State for images (separate from other form data)
  const [images, setImages] = useState(["", "", "", "", ""]);

  // Fetch spot data when component mounts
  useEffect(() => {
    dispatch(getSpotById(id));
  }, [dispatch, id]);

  // Initialize form data when spot is loaded
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

      // Handle images
      if (spot.images && spot.images.length > 0) {
        const urls = spot.images.map(img => img.url);
        const filledImages = [...urls, "", "", "", "", ""].slice(0, 5); 
        setImages(filledImages);
      }
    }
  }, [spot]);

  // Handle changes for regular form fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle changes for image inputs
  const handleImageChange = (index, value) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedSpot = {
      ...formData,
      id,
      price: parseFloat(formData.price),
      images
    };

    try {
      const result = await dispatch(updateSpot(id, updatedSpot));
      
      if (result && result.id) {
        navigate(`/spots/${result.id}`);
      } else {
        console.error("Failed to update spot");
      }
    } catch (err) {
      console.error("Error updating spot:", err);
    }
  };

  if (!spot) return <h2>Loading spot...</h2>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Spot</h2>
      
      {/* Country */}
      <div className="input-label-div">
        <label htmlFor="country">Country</label>
        <input
          id="country"
          name="country"
          type="text"
          value={formData.country}
          onChange={handleChange}
          required
        />
      </div>

      {/* Address */}
      <div className="input-label-div">
        <label htmlFor="address">Street Address:</label>
        <input
          id="address"
          name="address"
          type="text"
          value={formData.address}
          onChange={handleChange}
          required
        />
      </div>

      {/* City */}
      <div className="input-label-div">
        <label htmlFor="city">City</label>
        <input
          id="city"
          name="city"
          type="text"
          value={formData.city}
          onChange={handleChange}
          required
        />
      </div>

      {/* State */}
      <div className="input-label-div">
        <label htmlFor="state">State</label>
        <input
          id="state"
          name="state"
          type="text"
          value={formData.state}
          onChange={handleChange}
          required
        />
      </div>

      {/* Description */}
      <div className="input-label-div">
        <label htmlFor="description">Describe your place to your guests</label>
        <p>
          Mention the best features of your space and any special ammenities
          like fast wifi or parking.{" "}
        </p>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      {/* Name */}
      <div className="input-label-div">
        <label htmlFor="name">Name of Your Spot</label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      {/* Price */}
      <div className="input-label-div">
        <label htmlFor="price">Price per Night (USD):</label>
        <input
          id="price"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </div>

      {/* Image URLs */}
      {[0, 1, 2, 3, 4].map((index) => (
        <div className="input-label-div" key={index}>
          <label htmlFor={`image-${index}`}>Image URL {index + 1}:</label>
          <input
            id={`image-${index}`}
            type="url"
            value={images[index]}
            onChange={(e) => handleImageChange(index, e.target.value)}
            placeholder="Image URL"
          />
        </div>
      ))}

      <button type="submit">Save Changes</button>
    </form>
  );
}

export default EditSpotForm;