import "./input.css";

const Input = ({
  id,
  type = "text",
  multiline = false,
  value,
  onChange,
  placeholder = "",
  rows = 4,
  label = "",
}) => {
  if (multiline) {
    return (
      <div className="input-wrapper">
        <label htmlFor={id} className="input-label">
          {label}
        </label>
        <textarea
          id={id}
          className="custom-input"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
        />
      </div>
    );
  }

  return (
    <div className="input-wrapper">
      <label htmlFor={id} className="input-label">
        {label}
      </label>

      <input
        id={id}
        className="custom-input"
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
