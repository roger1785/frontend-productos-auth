import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div>
      <h2>404</h2>
      <p>La pagina no existe</p>
      <Link to="/">Volver al inicio</Link>
    </div>
  );
}

export default NotFound;
