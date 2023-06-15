import "./BackgroundSection.scss";

const BackgroundSection = ({ image }) => {
  return (
    <div className="page-center-bg">
      <div className="page-center-bg__wrapper">
        <img src={image} alt="background-image" />
        <div className="page-center-bg-mask"></div>
      </div>
    </div>
  );
};

// BackgroundSection.propsType = {
//   image: PropTypes.string,
// }

export default BackgroundSection;
