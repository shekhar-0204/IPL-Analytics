import { AlertCircle } from "lucide-react";

function ErrorMessage({ message }) {
  return (
    <div className="error-container">
      <AlertCircle size={24} />

      <div>
        <h3>Something went wrong</h3>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default ErrorMessage;