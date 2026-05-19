import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  createProduct,
  updateProduct,
  getProductById,
} from "../services/ProductService";
import { useAuth } from "../hooks/useAuth";
import Loading from "./ui/Loading";

const initialState = {
  name: "",
  price: "",
  stock: "",
};

function ProductForm() {
  const { logout } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const isEdit = Boolean(id);

  const [form, setForm] = useState(initialState);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isEdit) {
      return;
    }

    const loadProduct = async () => {
      try {
        setLoading(true);

        const data = await getProductById(id);

        setForm({
          name: data.name,
          price: data.price,
          stock: data.stock,
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id, isEdit]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm({ ...form, [name]: value });
  };

  const validateForm = () => {
    if (!form.name) {
      return "El nombre es obligatorio";
    }

    if (form.name.trim().length < 3) {
      return "El nombre debe tener al menos 3 caracteres";
    }

    if (!form.price) {
      return "El precio es obligatorio";
    }

    if (isNaN(Number(form.price))) {
      return "El precio debe ser un numero";
    }

    if (Number(form.price) <= 0) {
      return "El precio debe ser mayor a 0";
    }

    if (!form.stock) {
      return "El stock es obligatorio";
    }

    if (isNaN(Number(form.stock))) {
      return "El stock debe ser un numero";
    }

    if (Number(form.stock) <= 0) {
      return "El stock debe ser mayor a 0";
    }

    return "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setSaving(true);

    const productData = {
      name: form.name.trim(),
      price: Number(form.price),
      stock: Number(form.stock),
    };

    try {
      if (isEdit) {
        await updateProduct(productData, id);
      } else {
        await createProduct(productData);
      }

      // await loadProducts();
      setForm(initialState);
      navigate("/");
    } catch (error) {
      if (error.status == 401) {
        logout();

        navigate("/login");

        return;
      }

      setError(error.message);
    } finally {
      setSaving(false);
    }
  };

  const isDisabled = !form.name || !form.price || !form.stock || saving;

  if (loading) {
    return <Loading text="Cargando el producto..." />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <section>
      <h2>{isEdit ? "Editar" : "Crear"} Producto</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre: </label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Precio: </label>
          <input
            type="number"
            step="any"
            id="price"
            name="price"
            value={form.price}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="stock">Stock: </label>
          <input
            type="number"
            step="any"
            id="stock"
            name="stock"
            value={form.stock}
            onChange={handleChange}
          ></input>
        </div>

        {error && <p className="error">{error}</p>}

        <div className="form-actions">
          <button type="submit" disabled={isDisabled}>
            {saving && (isEdit ? "Editando" : "Creando")}
            {!saving && (isEdit ? "Editar" : "Crear")} producto
          </button>

          {isEdit && (
            <button type="button" onClick={() => navigate("/")}>
              Cancelar
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

export default ProductForm;
