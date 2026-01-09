export default function SecondaryButton({ children, onClick }) {
    return (
        <button
            onClick={onClick}
            className="secondary-button"
        >
            {children}
        </button>
    );
}