import '../ui.css'
export default function PrimaryButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="primary-button"
    >
      {children}
    </button>
  );
}