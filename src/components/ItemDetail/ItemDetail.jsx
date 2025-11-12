//Contenedor de detalles de un artículo

import { useCartContext } from "../../context/CartContext";
import { Count } from "../Count/Count";
import { Item } from "../Item/Item";

export const ItemDetail = ({ detail }) => {
  const { addItemToCart } = useCartContext();

  //Hacemos esta función para agregar al carrito pero aparte, en una cantidad específica (no un +1), según lo que haya indicado el usuario. Esta es la función que después voy a pasar en el onConfirm. Es la función que le voy a pasar al contador.
  const handleAdd = (quantity) => {
    addItemToCart({ ...detail, quantity });
  };

  return (
    <Item {...detail}>
      <Count btnText={"Agregar al carrito"} onConfirm={handleAdd} />
    </Item>
  );
};
