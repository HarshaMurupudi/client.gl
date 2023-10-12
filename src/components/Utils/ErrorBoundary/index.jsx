import ErrorPage from "./ErrorPage";
import { ErrorBoundary } from "react-error-boundary";
import { useLocation } from "react-router-dom";

export default function ReactErrorBoundary(props) {
  const location = useLocation();
  return (
    <ErrorBoundary
      key={location.pathname}
      FallbackComponent={ErrorPage}
      onError={(error, errorInfo) => {
        console.log("Error caught!");
        console.error(error);
        console.error(errorInfo);
      }}
      onReset={() => {
        window.location.reload();
      }}
    >
      {props.children}
    </ErrorBoundary>
  );
}
