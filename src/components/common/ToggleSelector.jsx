import PropTypes from "prop-types";

const ToggleSelectar = (props) => {
  const { value, className, onChange, label, type, name, id } = props;

  return (
    <div>
      <input
        type={type}
        value={value}
        className={className}
        onChange={onChange}
        name={name}
        id={id}
      />
      <label htmlFor={value}>{label}</label>
    </div>
  );
};
ToggleSelectar.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  checked: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  type: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
};
export default ToggleSelectar;
