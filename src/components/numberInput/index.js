import "./numberInput.css";

const NumberInput = ({value, min, max, name, placeholder, onChange}) => {
  return (
    <div className={`number-container${value > 0 ? " positive" : ""}`}>
      <input
        type="number"
        placeholder={placeholder}
        max={max}
        min={min}
        name={name}
        value={value}
        onChange={onChange}
      ></input>
    </div>
  );
};

export default NumberInput;