//Contenedor de detalles de un artículo

import { useCartContext } from "../../context/CartContext"
import { Item } from "../Item/Item"


export const ItemDetail = ({detail}) => {
    const {addItemToCart} = useCartContext();

    return (
        <Item {...detail}>
            <button onClick={() => addItemToCart(detail)}>Enviar al carrito</button>
        </Item>
    )
}