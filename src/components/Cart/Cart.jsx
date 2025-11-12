import { useCartContext } from "../../context/CartContext";
import "./Cart.css";
import { Link } from "react-router-dom";

export const Cart = () => {
  const { cart, deleteItem, clearCart, totalValor, getTotalItems, checkOut } =
    useCartContext();

  return (
    <section className="item-list-container">
      <h2>Carrito de compras</h2>
      {cart.length ? (
        cart.map((prod) => (
          <Item key={prod.id} {...prod}>
            <span>Cantidad: {prod.quantity}</span>
            <button className="btn" onClick={() => deleteItem(prod.id)}>
              Eliminar
            </button>
          </Item>
        ))
      ) : (
        <p>Tu carrito está vacío</p>
      )}

      {cart.length ? (
        <div className="btn-container">
          <div className="total-pagar">
            <p>Total a pagar: ${totalValor()}</p>
          </div>
          <button className="btn" onClick={checkOut}>
            Finalizar compra
          </button>
          <button className="btn" onClick={clearCart}>
            Vaciar carrito
          </button>
        </div>
      ) : (
        <Link className="btn" to="/">
          Volver al inicio
        </Link>
      )}
    </section>
  );
};
