//Contenedor donde va a estar el formulario para ingreso de productos, y que va a manejar los estados que definimos como necesarios para el input de la información por parte del usuario.
/*Estados necesarios:
  product --> La info sobre el producto
  loading --> El estado de que se está cargando la info que ingresó le usuario.
  errors --> los errores que se generen en el ingreso de datos, por la validación del producto
  files --> La imagen que se carga para el producto.
*/
import { useState } from "react";
import { ProductFormUI } from "../ProductFormUI/ProductFormUI";
import { validateProduct } from "../../../utils/validateProducts";
import { uploadToImgbb } from "../../../services/uploadImage";
import { createProduct } from "../../../services/products";
import "../ProductFormContainer/ProductFormContainer.css";

export const ProductFormContainer = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
  });
  const [loading, setLoading] = useState();
  const [errors, setErrors] = useState("");
  const [file, setFile] = useState(null);

  //Cada vez que en el form el usuario cambie algo en un campo, voy a tener que se ejecute el onChange de ese input. Para cada uno de esos casos, quiero que se ejecute una misma función que me maneje(handle) ese cambio.
  //Como esta función está en el input, donde dice "onChange = {onChange}", si tiene un parámetro en su definición, como es la "e" en este caso, React interpreta que tiene que pasarle el evento que la disparó.
  const handleChange = (e) => {
    //El evento "e", como objeto, tiene un montón de propiedades, una de ella "target". En target está el elemento HTML que disparó el evento. En este caso, el input que modificó el usuario. A su vez ,ese elemento tiene sus propiedades, que nosotros definimos en ProductFormUI, como su name, su value, si era required, etc. Enonces lo que quiero hacer acá es desestructurar ese target, tomando su name (para saber qué cambió) y su value (para saber cuál es el nuevo valor).
    const { name, value } = e.target;

    //Entonces tomo mi producto(estado) actual product, lo desestructuro, y le reemplazo lo que tenga en su variable name, por el valor que tenga en value. Creo un nuevo objeto y ese nuevo objeto lo meto en setProduct, actualizando así mi estado.
    const newProduct = { ...product, [name]: value };
    setProduct(newProduct);
  };

  //Y acá la función para cuando el usuario le de submit al form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    //Con todo ya cargado, llamo a validateProduct y cargo los errores que me puedan disparar los distintos inputs del usuario. Y todos esos posibles errores se van a cargar en newErrors.
    const newErrors = validateProduct({ ...product, file });

    //Luego, me fijo si newErrors tiene elementos, que para eso es el Object.keys y el .length. En caso de tener elementos, actualizo el estado errors, con setErrors y esos nuevos elementos, y paso el loading a false
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    //Y ahora la función para que la imagen se cargue a ImgBB y que me devuelva el link a esa imagen. Ahora, por qué acá el price?? Ni idea. y el imageUrl lo mete derecho porque es el mismo nombre de la variable en product.
    try {
      const imageUrl = await uploadToImgbb(file);
      const productData = {
        ...product,
        price: Number(product.price),
        imageUrl,
      };

      //Y ahora que ya tengo toda la info del nuevo producto tengo que llamar a la API y almacenarlo:
      await createProduct(productData);
      alert("Producto cargado con éxito");

      //Y una vez que ya hice eso, vacío producto y archivo
      setProduct({ name: "", price: "", category: "", descriptcion: "" });
      setFile(null);
    } catch (error) {
      setErrors({ general: error.mssage });
    } finally {
      setLoading(false);
    }
  };
  return (
    <ProductFormUI
      product={product}
      errors={errors}
      onChange={handleChange}
      onFileChange={setFile}
      loading={loading}
      onSubmit={handleSubmit}
    />
  );
};
