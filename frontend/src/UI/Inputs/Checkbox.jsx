export default function Checkbox({ checked, onChange, label }) {
    return (
        <label className="checkbox-container">
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className="checkbox-input"
            />
            <span className="checkbox-label">{label}</span>
        </label>
    );
}