/* eslint-disable react/prop-types */
// LoadingSkeleton.jsx
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingSkeleton = ({ type }) => {
  switch (type) {
    case "card":
      return (
        <div className="my-4">
          <Skeleton height={200} />
          <Skeleton height={20} width={`80%`} style={{ marginTop: "10px" }} />
          <Skeleton height={20} width={`60%`} style={{ marginTop: "10px" }} />
          <Skeleton height={20} width={`40%`} style={{ marginTop: "10px" }} />
        </div>
      );
    case "text":
      return (
        <div>
          <Skeleton height={30} width={`80%`} />
        </div>
      );
    case "circle":
      return <Skeleton circle={true} height={100} width={100} />;
    default:
      return <Skeleton height={30} width={`100%`} />;
  }
};

export default LoadingSkeleton;
