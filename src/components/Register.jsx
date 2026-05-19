import { useEffect, useState } from "react";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import { registerUser } from "../services/AuthService";
import SuccessMessage from "./ui/SuccessMessage";

const initialState = {
  email: "",
  password: "",
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Register() {
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm({ ...form, [name]: value });
  };

  const validateForm = () => {
    if (!form.email.trim()) {
      return "El correo electrónico es obligatorio";
    }

    if (!emailRegex.test(form.email)) {
      return "El correo electrónico no es válido";
    }

    if (!form.password.trim()) {
      return "La contraseña es obligatoria";
    }

    if (form.password.trim().length < 6) {
      return "La contraseña debe tener al menos 6 caracteres";
    }

    return null;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    setSaving(true);

    const user = {
      email: form.email.trim(),
      password: form.password,
    };

    try {
      await registerUser(user);

      setError(null);
      setSuccess("Cuenta creada correctamente");
      setForm(initialState);
    } catch (error) {
      setError(error.message);
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(null);
      }, 2000);
    }
  }, [success]);

  const isDisabled = !form.email || !form.password || saving;

  return (
    <section className="auth-section">
      <h2 className="auth-title">
        <UserPlusIcon className="icon" />
        Crear cuenta
      </h2>
      <p>Regístrate para poder acceder a la aplicación.</p>

      {success && <SuccessMessage message={success} />}

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Correo: </label>
          <input
            type="email"
            name="email"
            id="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña: </label>
          <input
            type="password"
            name="password"
            id="password"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        {error && <p className="error">{error}</p>}

        <button type="submit" disabled={isDisabled}>
          Crear cuenta
        </button>
      </form>
    </section>
  );
}

export default Register;
