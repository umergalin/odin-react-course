import { useId } from "react";

function Field({
  labelText,
  placeholder,
  value,
  setValue,
  isEditing,
  className,
}) {
  const id = useId();

  function handleChange(e) {
    setValue(e.target.value);
  }

  const strValue = String(value);

  if (isEditing) {
    return (
      <div className={`${className ?? ""} field-group max-width`.trim()}>
        <label htmlFor={id}>{labelText}</label>
        <input
          id={id}
          value={strValue}
          onChange={handleChange}
          placeholder={placeholder}
        />
      </div>
    );
  }

  return <p className={className}>{strValue === "" ? "N/A" : strValue}</p>;
}

export { Field };
