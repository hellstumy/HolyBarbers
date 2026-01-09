import useStore from "../store/store.js";
import '../UI/ui.css'
export default function MyModal({children, Tittle}) {
    const { modalSate, closeModal } = useStore();
    if (!modalSate.isOpen) return null;

    return (
      <div className="modal-backdrop" onClick={closeModal}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-tittle-container">
            <h2>{Tittle}</h2>
            <button className="modal-close" onClick={closeModal}>
              &times;
            </button>
          </div>
          <span className="modal-line"></span>
          <div className="modal-body">{children}</div>
        </div>
      </div>
    );
}