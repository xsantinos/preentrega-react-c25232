//Componente presentacional de navegación. Contiene el link al Home, a la vista de los productos y al carrito

import { Link } from "react-router-dom";
import { useCartContext } from "../../context/CartContext";

export const Nav = () => {
  const { getTotalItems } = useCartContext();
  return (
    <ul>
      <li>
        <Link to={"/"}>Home</Link>
      </li>
      <li>
        <Link to={"/products"}>Productos </Link>
      </li>
      <li>
        <Link to={"category/dulce"}>Dulces</Link>
      </li>
      <li>
        <Link to={"category/salado"}>Salados</Link>
      </li>
      <li>
        <Link to={"/carrito"}>Carrito</Link>
        <span>{getTotalItems()}</span>
      </li>
    </ul>
  );
};
