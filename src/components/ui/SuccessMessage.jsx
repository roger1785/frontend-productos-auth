function SuccessMessage({ message = "Operación realizada correctamente" }) {
  return <p className="status-message success-message">{message}</p>;
}

export default SuccessMessage;
