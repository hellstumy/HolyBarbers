export default function Radio ({ selected, onChange, label, value }) {
    return (
        <label className="radio-container">
            <input
                type="radio"
                checked={selected === value}
                onChange={() => onChange(value)}
                className="radio-input"
            />
            <span className="radio-label">{label}</span>
        </label>
    );
}