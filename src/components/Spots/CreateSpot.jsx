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
    
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.description || formData.description.length < 30) 
      newErrors.description = "Description needs at least 30 characters";
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.price || isNaN(formData.price)) 
      newErrors.price = "Valid price is required";
    
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
      <h1>Create a New Spot</h1>
      
      {/* Section 1: Location */}
      <div className="form-section">
        <h2>Where's your place located?</h2>
        <p className="section-caption">Guests will only get your exact address once they booked a reservation.</p>
        
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
            placeholder="Street Address"
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

      {/* Section 2: Description */}
      <div className="form-section">
        <h2>Describe your place to guests</h2>
        <p className="section-caption">
          Mention the best features of your space, any special amenities like 
          fast wifi or parking, and what you love about the neighborhood.
        </p>
        <div className="input-group">
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Please write at least 30 characters"
            required
            minLength={30}
          />
          {errors.description && <span className="error">{errors.description}</span>}
        </div>
      </div>

      {/* Section 3: Title */}
      <div className="form-section">
        <h2>Create a title for your spot</h2>
        <p className="section-caption">
          Catch guests' attention with a spot title that highlights what makes your place special.
        </p>
        <div className="input-group">
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name of your spot"
            required
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
      </div>

      {/* Section 4: Price */}
      <div className="form-section">
        <h2>Set a base price for your spot</h2>
        <p className="section-caption">
          Competitive pricing can help your listing stand out and rank higher in search results.
        </p>
        <div className="input-group price-input">
          <span className="dollar-sign">$</span>
          <input
            id="price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price per night (USD)"
            min="1"
            required
          />
          {errors.price && <span className="error">{errors.price}</span>}
        </div>
      </div>

      {/* Section 5: Photos */}
      <div className="form-section">
        <h2>Liven up your spot with photos</h2>
        <p className="section-caption">Submit a link to at least one photo to publish your spot.</p>
        {errors.images && <span className="error">{errors.images}</span>}
        
        {[0, 1, 2, 3, 4].map((index) => (
          <div className="input-group" key={index}>
            <input
              id={`image-${index}`}
              type="url"
              value={images[index]}
              onChange={(e) => handleImageChange(index, e.target.value)}
              placeholder={index === 0 ? "Preview Image URL" : "Image URL"}
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