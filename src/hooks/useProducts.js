import { useEffect, useState } from "react";
import { deleteProduct, getProducts } from "../services/ProductService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";

export const useProducts = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const loadProducts = async () => {
    try {
      setLoading(true);

      const data = await getProducts();

      setProducts(data);

      setSuccess("Productos cargados correctamente");
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = confirm(
      "¿Esta seguro que quiere borrar el producto?",
    );

    if (!confirmDelete) return;

    try {
      await deleteProduct(id);

      // await loadProducts();
      setProducts(products.filter((p) => p._id != id));

      setSuccess("Producto eliminado correctamente");
    } catch (error) {
      if (error.status == 401) {
        logout();

        navigate("/login");

        return;
      }

      setError(error.message);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(null);
      }, 2000);
    }
  }, [success]);

  return {
    products,
    setError,
    success,
    loading,
    error,
    loadProducts,
    handleDelete,
  };
};
