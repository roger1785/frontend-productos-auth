const URL_API = `${import.meta.env.VITE_API_URL}/products`;

const getToken = () => {
  return localStorage.getItem("token");
};

export const getProducts = async () => {
  const response = await fetch(URL_API);

  if (!response.ok) {
    throw new Error("Error al obtener los productos");
  }

  const data = await response.json();

  return data;
};

export const getProductById = async (id) => {
  const response = await fetch(`${URL_API}/${id}`);

  if (response.status == 404) {
    return null;
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Error al obtener el producto");
  }

  return data;
};

export const deleteProduct = async (id) => {
  const token = getToken();

  const response = await fetch(`${URL_API}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = new Error("Error al borrar el producto");
    error.status = response.status;
    throw error;
  }

  return true;
};

export const createProduct = async (product) => {
  const token = getToken();

  const response = await fetch(URL_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(product),
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.error || `Error al crear el producto`);
    error.status = response.status;
    throw error;
  }

  return data;
};

export const updateProduct = async (product, id) => {
  const token = getToken();

  //                           `${URL_API}/${id}`
  const response = await fetch(URL_API + "/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(product),
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.error || `Error al editar el producto`);
    error.status = response.status;
    throw error;
  }

  return data;
};
