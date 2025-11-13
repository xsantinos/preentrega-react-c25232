//Como lo dice el nombre, este archivo me sirve para asentar las reglas de validación de mis productos en el carrito. Lo que no se cumpla en cada campo, se guarda como error y finalmente, validateProduct, me devuelve el error.

//fileRequired=true significa que si no paso segundo parámetro, la función toma ese argumento como true. Si esta función, cuando la uso la llamo poniendo "false" como segundo parámetro, estoy indicando que para mí no es un requisito a cumplir, el tener que enviar imagen para validar el producto. Con false, puedo cargar un producto nuevo sin imagen. Si no pongo nada, tomo por defecto que sí o sí tengo que cargar imagen.
export const validateProduct = (product, fileRequired = true) => {
  const errors = {};

  if (!product.name.trim()) {
    errors.name = "Nombre obligatorio";
  }

  if (!product.price || product.price <= 0) {
    errors.price = "Falta precio o valor inválido";
  }

  if (!product.description.trim()) {
    errors.description = "La descripción es obligatoria";
  }

  if (!product.category.trim()) {
    errors.category = "La categoria es obligatoria";
  }

  //Si la imagen es obligatoria, y no carga imagen, entonces tira error.
  if (fileRequired && !product.file) {
    errors.file = "Debes seleccionar una imagen";
  }

  return errors;
};
