export default function TextArea({ value, onChange, placeholder, rows = 4 }) {
    return (
        <textarea
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={rows}
            className="text-area"
        />
    );
}