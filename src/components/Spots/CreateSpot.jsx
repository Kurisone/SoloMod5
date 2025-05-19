import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createSpot } from "../../store/spots";
import "./CreateSpot.css";

function CreateASpot() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (index, value) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validate required fields
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.description || formData.description.length < 30) 
         newErrors.description = "Description needs at least 30 characters";
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.price || isNaN(formData.price)) 
        newErrors.price = "Valid price is required";
    // if (formData.lat < -90 || formData.lat > 90) 
    //     newErrors.lat = "Latitude must be between -90 and 90";
    // if (formData.lng < -180 || formData.lng > 180) {
    //     newErrors.lng = "Longitude must be between -180 and 180";
//   }
    
    // Validate at least one image URL
    if (!images.some(img => img.trim() !== "")) {
      newErrors.images = "At least one image URL is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const newSpot = await dispatch(createSpot({
        ...formData,
        price: parseFloat(formData.price),
        images: images.filter(img => img.trim() !== "")
      }));

      if (newSpot) {
        navigate(`/spots/${newSpot.id}`);
      }
    } catch (error) {
      console.error("Error creating spot:", error);
      setErrors({ submit: "Failed to create spot. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="create-spot-form">
      <h2>Create a New Spot</h2>
      
      <div className="form-section">
        <h3>Location Information</h3>
        
        <div className="input-group">
          <label htmlFor="country">Country</label>
          <input
            id="country"
            name="country"
            type="text"
            value={formData.country}
            onChange={handleChange}
            placeholder="Country"
            required
          />
          {errors.country && <span className="error">{errors.country}</span>}
        </div>

        <div className="input-group">
          <label htmlFor="address">Street Address</label>
          <input
            id="address"
            name="address"
            type="text"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            required
          />
          {errors.address && <span className="error">{errors.address}</span>}
        </div>

        <div className="input-group">
          <label htmlFor="city">City</label>
          <input
            id="city"
            name="city"
            type="text"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
            required
          />
          {errors.city && <span className="error">{errors.city}</span>}
        </div>

        <div className="input-group">
          <label htmlFor="state">State</label>
          <input
            id="state"
            name="state"
            type="text"
            value={formData.state}
            onChange={handleChange}
            placeholder="State"
            required
          />
          {errors.state && <span className="error">{errors.state}</span>}
        </div>
      </div>

      <div className="form-section">
        <h3>Describe Your Place!</h3>
        <div className="input-group">
          <label htmlFor="description">
            Fill us in on your spot!
            <span className="hint">What makes your place stand out?</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description (minimum 30 characters)"
            required
            minLength={30}
          />
          {errors.description && <span className="error">{errors.description}</span>}
        </div>
      </div>

      <div className="form-section">
        <h3>Spot Information</h3>
        <div className="input-group">
          <label htmlFor="name">What is the name of your Spot?</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Spot name"
            required
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="input-group">
          <label htmlFor="price">What do you charge a night? (USD)</label>
          <input
            id="price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            min="1"
            required
          />
          {errors.price && <span className="error">{errors.price}</span>}
        </div>
      </div>

      <div className="form-section">
        <h3>Images</h3>
        <p>Add up to 5 images to showcase the beauty of your Spot!</p>
        {errors.images && <span className="error">{errors.images}</span>}
        
        {[0, 1, 2, 3, 4].map((index) => (
          <div className="input-group" key={index}>
            <label htmlFor={`image-${index}`}>Image URL {index + 1}</label>
            <input
              id={`image-${index}`}
              type="url"
              value={images[index]}
              onChange={(e) => handleImageChange(index, e.target.value)}
              placeholder="Image URL"
            />
          </div>
        ))}
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="submit-button"
      >
        {isSubmitting ? "Creating..." : "Create Spot"}
      </button>
      
      {errors.submit && <div className="error-message">{errors.submit}</div>}
    </form>
  );
}

export default CreateASpot;