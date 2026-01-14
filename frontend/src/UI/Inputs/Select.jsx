export default function Select({ value, onChange, children }) {
  return (
    <select value={value} onChange={onChange} className="select-input">
      {children}
    </select>
  );
}
