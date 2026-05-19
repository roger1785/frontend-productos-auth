import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import styles from "./Navbar.module.css";

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className={styles.navbar}>
      <Link className={styles.link} to="/">
        Inicio
      </Link>

      {user && (
        <Link className={styles.link} to="/products/new">
          Nuevo producto
        </Link>
      )}

      {!user ? (
        <>
          <Link className={styles.link} to="/register">
            Crear cuenta
          </Link>
          <Link className={styles.link} to="/login">
            Iniciar sección
          </Link>
        </>
      ) : (
        <>
          <Link className={styles.link} to="/profile">
            Mi perfil
          </Link>
          <button className={styles.link} type="button" onClick={handleLogout}>
            Cerrar session
          </button>
        </>
      )}
    </nav>
  );
}

export default Navbar;
