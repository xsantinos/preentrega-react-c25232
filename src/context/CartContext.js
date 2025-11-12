//Creo el contexto y el custom hook para después consumirlo, en un único archivo. Sólo separo el Provider, que va a estar en el .jsx de esta misma carpeta.
import { createContext, useContext } from "react";

// No lo exporto, porque sólo lo consumo acá cuando hago le custom hook. OJO, SÍ LO TENGO QUE EXPORTAR PORQUE LO USO EN CART PROVIDER!!!!!!!!!!!!!!
export const CartContext = createContext();

// Custom hook para consumirlo
export function useCartContext() {
  return useContext(CartContext);
}

//Entonces, lo único que consumo, generado en este archivo va a ser el useCartContext, que es mi hook custom para no tener que andar importando useContext y y CartContext.
