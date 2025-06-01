import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { deleteSpot } from "../../store/spots";
import "./DeleteListing.css";

function DeleteListing({ spot, onDeleteSuccess }) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      await dispatch(deleteSpot(spot.id));
      closeModal();
      if (onDeleteSuccess) onDeleteSuccess(); // Optional callback after successful deletion
    } catch (error) {
      console.error("Failed to delete spot:", error);
      // You could add error state here to show to the user
    }
  };

  return (
    <div className="delete-listing-modal">
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to remove this spot? This action cannot be undone.</p>
      <div className="delete-modal-buttons">
        <button onClick={handleDelete} className="confirm-delete-btn">
          Yes
        </button>
        <button onClick={closeModal} className="cancel-delete-btn">
          No
        </button>
      </div>
    </div>
  );
}

export default DeleteListing;