export default function DisabledButton({ children, onClick }) {
return (
  <button onClick={onClick} className="disabled-button">
    {children}
  </button>
);
}