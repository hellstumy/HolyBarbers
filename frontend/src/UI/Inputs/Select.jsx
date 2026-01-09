export default function Select({ value, onChange, options = [] }) {
    return (
        <select value={value} onChange={onChange} className="select-input">
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}