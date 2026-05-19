function ErrorMessage({ error = "Ocurrió un error" }) {
  return <p className="status-message error-message">{error}</p>;
}

export default ErrorMessage;
