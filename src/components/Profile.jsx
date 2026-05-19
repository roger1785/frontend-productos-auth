import { useEffect, useState } from "react";
import { getProfile } from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Profile() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getProfile();

        setUser(data);
      } catch (error) {
        if (error.status == 401) {
          logout();

          navigate("/login");

          return;
        }

        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  if (loading) {
    return <p className="message">Cargando perfil...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <section>
      <h2>Mi perfil</h2>
      <p>{user.email}</p>
    </section>
  );
}

export default Profile;
