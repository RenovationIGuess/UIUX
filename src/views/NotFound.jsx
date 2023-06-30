import { useNavigate } from "react-router-dom";
import image from "../constant/image"

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="joined-team-container items-center">
      <div className="flex flex-col items-center">
        <img 
          src={image.notfound}
          alt="Not Found"
          className="mb-4"
        />
        <p className="page-404-text">It seems your on the moon huh... -_-</p>
        <button onClick={() => navigate(-1)} className="rounded-full mt-4 font-medium py-2 px-6 text-center bg-bright-green text-white hover:bg-less-bright-green">
          Go Back
        </button>
      </div>
    </div>
  )
}

export default NotFound