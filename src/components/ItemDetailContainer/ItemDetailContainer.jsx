//Similar a ItemListContainer, pero me va a mostrar sólo un producto y su detalle. Entonces también tengo que hacer una petición. Por esto voy a usar: useEffect, y también useState, para guardar como estado el producto que me traiga, de acuerdo al parámetro 

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import { ItemDetail } from "../ItemDetail/ItemDetail";

export const ItemDetailContainer = () => {
    const [detail, setDetail] = useState([]);
    const {id} = useParams();

    useEffect ( () => {
        fetch("/data/products.json")
        .then((res) => {
            if(!res.ok){
                throw new Error("Error encontrando el producto");
            }
            return res.json()
        })
        .then((data) => {
            const found = data.find((prod)=> id === prod.id);
            if(found){
                setDetail(found);
            }else{
                throw new Error("Error encontrando el producto");
            }
        } )
        .catch((err) => console.log(err));
    }, [id] );

    return <main>
        {
        Object.keys(detail).length ? (
            <ItemDetail detail={detail}/>
        ) : (<p>Cargando...</p>)
        }
    </main>
}