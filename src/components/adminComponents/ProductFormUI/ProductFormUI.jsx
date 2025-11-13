//No va a tener estados, ni funciones de handle, nada de eso. Si no están acá, esas herramintas que se usan para tomar los inputs que ingrese el usuario, entonces esas tienen que estar en el Container (ProductFormContainer). Los Containers son los que tienen los estados, la lógica de comunicación a APIs y todo eso. Este es un componente presentacional!

//Habiendo dicho esto, entonces, cómo va a hacer ProductFormUI para recibir esa info de los inputs?? Va a recibirla por props. Props que van a mandarse desde ProductFormContainer, cuando monte ProductFormUI. Todas props que vienen del padre y que son un montón:
/*
  product --> El producto que se cargó
  errors --> Los errores que puedan surgir al evaluarse 
  loading --> Función que indica si se está cargando la info que ingresó el usuario.
  onChange --> Handle de los inputs que no son la foto: nombre ,precio, descripción, categoría.
  onFileChange --> El estado para manejar la foto. Si la foto está o no.
  onSubmit --> Acá va a estar la función que hace handleSubmit.
*/

export const ProductFormUI = ({
  product,
  errors,
  loading,
  onChange,
  onFileChange,
  onSubmit,
}) => {
  return (
    <section>
      <form className="product-form" onSubmit={onSubmit}>
        <h2>Agregar producto</h2>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={onChange}
            required
          />
          {/*el name="name"/"price"... o el que sea, es súper importante, porque es el atributo que usa la función de handle para armar el objeto product */}
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div>
          <label>Precio:</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={onChange}
            required
          />
          {errors.price && <p className="error">{errors.price}</p>}
        </div>
        <div>
          <label>Categoría:</label>
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={onChange}
            required
          />
          {errors.category && <p className="error">{errors.category}</p>}
        </div>
        <div>
          <label>Descripción:</label>
          <textarea
            name="description"
            value={product.description}
            onChange={onChange}
            required
          />
          {errors.description && <p className="error">{errors.description}</p>}
        </div>
        <div>
          <label>Imagen:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => onFileChange(e.target.files?.[0] ?? null)}
          />
          {errors.file && <p className="error">{errors.file}</p>}
        </div>
        <button className="btn" type="submit" disabled={loading}>
          {loading ? "Guardando..." : "Guardar"}
        </button>
      </form>
    </section>
  );
};
