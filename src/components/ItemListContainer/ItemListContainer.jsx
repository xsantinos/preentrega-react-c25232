//Componente ItemListContainer, que va a contener y presentar todos los productos. Su responsabilidad es la de conectar con "mi API", obtener la info, manejar el estado, pero hasta ahí. Una vez que obtengo los datos, se los paso a ItemList.
//En este componente utilizo el estado products, donde tengo la info de mis productos, y a su vez uso useEffect para hacer una petición a mi json donde está la info, al renderizar ItemListContainer.

import { useState, useEffect } from "react"
import { ItemList } from "../ItemList/ItemList";



export const ItemListContainer = () => {

    //Estado products. Se monta vacío.
    const [products, setProducts] = useState([]);

    //Uso useEffect pra llamar hacer una petición al .json donde están los productos.
    useEffect(() => {
        fetch("/data/products.json")
            .then((res) => {
                if(!res.ok){
                    throw new Error ("Hubo un problema al buscar los productos");
                }
                return res.json();            
            })
            .then( (data) => setProducts(data) )
            .catch( (err) => console.log(err) );
    }, [])

    return (
        <section>
            <h1>Bienvenidos!</h1>
            <ItemList listaItems={products}/>
        </section>
    )
}