import PropTypes from "prop-types";

export default function CustomHeader({ label }) {
  return (
    <div className="py-2 flex items-center justify-center">
      <div className="font-medium">{label}</div>
    </div>
  );
}

CustomHeader.propTypes = {
  label: PropTypes.string.isRequired,
};
