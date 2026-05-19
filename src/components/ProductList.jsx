import ProductCard from "./ProductCard";

function ProductList({ products, handleDelete }) {
  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
}

export default ProductList;
