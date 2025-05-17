export async function obtenerDatosDeHoja(urlPublicaCSV) {
// urlPublicaCSV = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ4x5g7k3z6Z8J9l0G1q5
  //Asegurate de que la URL sea pública y accesible
  try {
    const respuesta = await fetch(urlPublicaCSV);
    if (!respuesta.ok) {
      throw new Error(`Error al obtener los datos: ${respuesta.status}`);
    }
    const textoCSV = await respuesta.text();
    const jsonData = tsvToJson(textoCSV);

    let jsonDataTranslated ={}
    for (const [category, value] of Object.entries(jsonData)) {
      jsonDataTranslated[category] = value.map(item => {
                                            const newItem = {};
                                            for (const [k, v] of Object.entries(item)) {
                                              newItem[translateToEspecificKey(k)] = v;
                                            }
                                            return newItem;
                                });
    }

    let jsonDataFinal = {};
    for (const [category, value] of Object.entries(jsonDataTranslated)) {
      jsonDataFinal[category] = value.map(item => {
        const newItem = {};
        for (const [k, v] of Object.entries(item)) {
          if (v === undefined || v === null || v === "") {
            newItem[k] = null;
          }
          else if (!isNaN(v)) { 
            newItem[k] = parseFloat(v);
          }
          else{
            newItem[k] = v;
          }
        }
        return newItem;
      });
    }

    return jsonDataFinal;
  } catch (error) {
    console.error('Hubo un problema al obtener o procesar los datos:', error);
    return null;
  }
}

function tsvToJson(tsv) {
  const lineas = tsv.trim().split('\n');
  const encabezados = lineas[1].split('\t');
  const resultado = {};

  for (let i = 2; i < lineas.length; i++) {
    const valores = lineas[i].split('\t');
    const item = {};
    let categoria = "";

    for (let j = 0; j < encabezados.length; j++) {
      const clave = encabezados[j].trim();
      const valor = valores[j]?.trim() || "";
      if (clave === "Categoría") {
        categoria = valor;
      } else {
        item[clave] = valor;
      }

    }

    if (!resultado[categoria]) {
      resultado[categoria] = [];
    }

    resultado[categoria].push(item);
  }

  return resultado;
}

function  translateToEspecificKey(text) {
  const translations = {
    "Categoría": "category",
    "Título": "title",
    "Descripción": "description",
    "Precio": "price",
    "PrecioDescuento": "discountPrice",
    "MenuPrincipal": "menu-ppal",
    "Disponible": "available",
    "Imagen": "image",
    "TextoDestacado": "featuredText",
    "ColorTextoDestacado": "featuredTextColor",
  };

  return translations[text] || text;
}
