import { useNavigate } from "react-router-dom";
import "./error.css";

function ErrorPage() {
  let nav = useNavigate();

  return (
    <section className="error-body">
      <h1>404 NOT FOUND</h1>
      <p>
        You might have been redirected here either because the URL doesn't
        exist, or because of the developer's incompetence in making a functional
        application
      </p>
      <p>¯\_(ツ)_/¯</p>
      <button className="green-button" onClick={() => nav("/")}>
        Back to dashboard
      </button>
    </section>
  );
}

export default ErrorPage;
