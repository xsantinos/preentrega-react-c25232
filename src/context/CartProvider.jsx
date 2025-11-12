import { useState } from "react";
import { CartContext } from "./CartContext";

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  //Saber si cierto item ya se encuentra en el carrito
  const exists = (id) => {
    return cart.some((p) => p.id === id);
  };

  //Agregar items al carrito -> Tomando en cuenta cantidades.
  const addItemToCart = (item, quantity) => {
    if (exists(item.id)) {
      const updatedCart = cart.map((prod) => {
        if (prod.id === item.id) {
          return { ...prod, quantity: prod.quantity + item.quantity };
        } else {
          return prod;
        }
      });
      setCart(updatedCart);
      alert(`${item.name} agregado`);
    } else {
      setCart([...cart, item]); //entonces toma lo que ya estaba en el carrito, y haciendo simplemente esta línea, agrega item a lo que ya estaba en cart.
      alert(`${item.name} agregado`);
    }
  };

  //Vaciar el carrito
  const clearCart = () => {
    setCart([]);
  };

  //Eliminar un artículo del carrito
  const deleteItem = (id) => {
    const filtered = cart.filter((prod) => prod.id !== id);
    setCart(filtered);
    alert("Producto eliminado");
  };

  //Obtener la cantidad total de items que tengo en el carrito
  const getTotalItems = () => {
    const totalItems = cart.reduce((acc, prod) => acc + prod.quantity, 0);
    return totalItems;
  };

  //Calcular total -> Precio!
  const totalValor = () => {
    const total = cart.reduce(
      (acc, prod) => acc + prod.price * prod.quantity,
      0
    );
    return Math.round(total * 100) / 100;
  };

  //Y para la compra y finalización, checkout:
  const checkOut = () => {
    const ok = confirm("¿Seguro que quiere finalizar la compra?");
    if (ok) {
      alert("Compra realizada");
      clearCart();
    }
  };

  const values = {
    cart,
    addItemToCart,
    clearCart,
    getTotalItems,
    deleteItem,
    totalValor,
    checkOut,
  };
  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};
