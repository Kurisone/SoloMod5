import { useModal } from '../../context/Modal';
import './OpenModalButton.css';

function OpenModalButton({
  modalComponent,
  buttonText,
  onButtonClick,
  onModalClose,
  buttonClass
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (typeof onButtonClick === "function") onButtonClick();
  };

  return (
    <button
      onClick={onClick}
      className={buttonClass || "modal-button-default"}
    >
      {buttonText}
    </button>
  );
}

export default OpenModalButton;