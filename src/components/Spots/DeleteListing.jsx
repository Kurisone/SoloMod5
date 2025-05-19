import { useModal } from "../../context/Modal";
import "./DeleteListing.css";

function deleteListing({ part, spot }) {
    const { closeModal } = useModal();
  return (
    <div className="delete-listing-modal">
      <h2>This is irreversible!</h2>
      <p>Are you sure you want to delete this listing?</p>
      <button
        onClick={() => {
          part(spot);
          closeModal()
         
        }}
      >
        Confirm
      </button>
      <button
        onClick={() => {
          closeModal()
        }}
      >
        Nevermind
      </button>
    </div>
  );
}

export default deleteListing;