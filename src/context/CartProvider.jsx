import { useState } from "react"
import { CartContext } from "./CartContext";

export const CartProvider = ({children}) => {
    const [cart, setCart] = useState([]);

    const exists = (id) => {
        return (cart.some((p) => p.id === id));
    }

    const addItemToCart = (item) => {
        if (!exists(item.id)){
            setCart([...cart, item]) //entonces toma lo que ya estaba en el carrito, y haciendo simplemente esta línea, agrega item a lo que ya estaba en cart.
            alert(`${item.name} agregado`);
        }else{
            alert(`${item.name} ya está en el carrito`);
        }
    };

    const clearCart = () => {
        setCart([]);
    }

    const getTotalItems = () => {
        if (cart.length){
            return (cart.length);
        }else{
            return (" vacío")
        }
    }

    const values = {cart, addItemToCart, clearCart, getTotalItems};
    return(
        <CartContext.Provider value={values}>
            {children}
        </CartContext.Provider>
    )
}