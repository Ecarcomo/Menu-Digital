import {fieldMapping,nLineEncab} from '../data/dataConfig.js';


export async function obtenerDatosDeHoja(urlPublicaTSV) {
// urlPublicaCSV = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ4x5g7k3z6Z8J9l0G1q5
  //Asegurate de que la URL sea pública y accesible
  try {
    // request a la hoja de google con headers para evitar cache
    const respuesta = await fetch(urlPublicaTSV, {
      cache: "no-store",
      headers: {
        "Cache-Control": "no-cache",
        "Pragma": "no-cache"
      }
    });

    if (!respuesta.ok) {
      throw new Error(`Error al obtener los datos: ${respuesta.status}`);
    }
    const textoTSV = await respuesta.text();
    console.log(textoTSV);
    const jsonData = tsvToJson(textoTSV);

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
    /*transformo cadenas que son numeros a valores tipo flotantes*/
    let jsonDataFinal = {};
    for (const [category, value] of Object.entries(jsonDataTranslated)) {
      jsonDataFinal[category] = value.map(item => {
        const newItem = {};
        for (const [k, v] of Object.entries(item)) {
          if (v === undefined || v === null || v === "") {
            newItem[k] = null;
          }
          else if (!isNaN(v.replace(',', '.'))) { 
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

  const nEncab = nLineEncab;
  const nInfo = nLineEncab+1;
  const lineas = tsv.trim().split('\n');
  const encabezados = lineas[nEncab].split('\t');
  const resultado = {};

  for (let i = nInfo; i < lineas.length; i++) {
    const valores = lineas[i].split('\t');
    const item = {};
    let categoria = "";

    for (let j = 0; j < encabezados.length; j++) {
      const clave = encabezados[j].trim();
      const valor = valores[j]?.trim() || "";
      if (translateToEspecificKey(clave) === "category") {
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
  return fieldMapping[text] || text;
}
