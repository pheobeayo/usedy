import { PacmanLoader } from "react-spinners";

const LoadingSpinner = () => (
  <div className='text-center grid place-content-center'>
     <PacmanLoader color="#154A80" size={30} />
  </div>
);

export default LoadingSpinner;