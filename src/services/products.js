//Este es el archivo que se conecta con la API. Reemplaza los fetch que usaba para peticionar al archivo .json
//Empezamos generando en una constante la URL raiz que vamos a usar en cada ruta hacia la API:

const BASE_URL = "https://6914469bf34a2ff1170f233f.mockapi.io/product";

//Hago el POST
export const createProduct = async (product) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(product),
  });

  if (!res.ok) {
    throw new Error("No se pudo crear el producto");
  }
  const result = await res.json();
  return result;
};
