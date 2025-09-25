import {fieldMapping,nLineEncab} from '../config/macros.js';
import { useLocation } from 'react-router-dom';

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

    const jsonDataFormated = tsvToJson(textoTSV);
      
   

    /*transformo cadenas que son numeros a valores tipo flotantes*/
    let jsonDataFinal = jsonDataFormated;
    for (const [category, value] of Object.entries(jsonDataFormated['menu'])) {
      
      jsonDataFinal['menu'][category]['items'] = value['items'].map(item => {
        const newItem = {};
        for (const [k, v] of Object.entries(item)) {
          if (v === undefined || v === null || v === "") {
            newItem[k] = null;
          }
          else if (!isNaN(v.replace(',', '.'))) { 
            newItem[k] = parseFloat(v.replace(',', '.'));
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
  let resultado = {};
  resultado['params'] = {};
  resultado['menu'] = {};

  /*Recorro las lineas de la hoja de google, desde la linea nInfo hasta el final*/
  for (let i = nInfo; i < lineas.length; i++) {
    const valores = lineas[i].split('\t');
    // Si la línea está vacía, la salto
    if (valores.length === 0 || valores.every(valor => valor.trim() === "")) {
      continue;
    }
    const item = {}; // Objeto para almacenar cada plato del menú
    const config = {}; // Objeto para almacenar la configuración de la categoría
    const param = {}; // Objeto para almacenar los parámetros de modales
    const displays = {}; // Objeto para almacenar los displays commerciales

    let itemCategoria = "";
    let configCategoria = "";
    let paramModal = "";
    let dspComercial = "";


    for (let j = 0; j < encabezados.length; j++) {
      const clave = encabezados[j].trim();
      const valor = valores[j]?.trim() || "";

      // Utilizo translateToEspecificKey para traducir la clave al formato específico
      const fClave = translateToEspecificKey(clave);

      if (fClave === "category") {
        if(valor === "") {
          break; // Si la categoría está vacía, salto al siguiente item
        }
        itemCategoria = valor;
      } 
      else if (fClave === "nameCat") {
        if(valor === "") {
          break; // Si la categoría está vacía, salto al siguiente item
        }
        configCategoria = valor;
      }
      else if (fClave === "paramMod") {
        if(valor === "") {
          break; // Si el parametro del modal está vacío, salto al siguiente item
        }
        paramModal = valor;
      }
      /*Si la clave perteneca a un item del menu, lo guardo en el objeto item*/
      else if(!fClave.endsWith("Cat") && !fClave.endsWith("Mod") && fClave !== "") {
        item[fClave] = valor;
      }
      /*Si la clave termina en Cat, lo guardo en el objeto config de la categoria*/
      else if(fClave.endsWith("Cat") && fClave !== "") {
        config[fClave] = valor;
      }
      /*Si la clave termina en Mod, lo guardo en el objeto param  del parametro del modal*/
      else if(fClave.endsWith("Mod") && fClave !== "") {
        param[fClave] = valor;
      }

    }

    /*Si no existe el nodo de la categoria, con su arreglo de items y su nodo de config, lo creo*/
    if (!resultado['menu'][itemCategoria]) {
      resultado['menu'][itemCategoria] = {};
      resultado['menu'][itemCategoria]['config'] = {};
      resultado['menu'][itemCategoria]['items'] = [];
    }
    /*Si no existe el nodo de la categoria, con su arreglo de items y su nodo de config, lo creo*/
    if (!resultado['menu'][configCategoria]) {
      resultado['menu'][configCategoria] = {};
      resultado['menu'][configCategoria]['config'] = {};
      resultado['menu'][configCategoria]['items'] = [];
    }

    if (!resultado['params'][paramModal]) {
      resultado['params'][paramModal] = {};
    }
   
    if (Object.keys(config).length > 0)
      resultado['menu'][configCategoria]['config'] = config;

    if (Object.keys(item).length > 0)
      resultado['menu'][itemCategoria]['items'].push(item);

    if (Object.keys(param).length > 0)
      resultado['params'][paramModal] = param;
    

  }

  return resultado;
}

function  translateToEspecificKey(text) {
  return fieldMapping[text] || text;
}

// Function to get a specific query parameter value from the URL
export function getParamValue(paramName) {
  const location = useLocation(); // Get location object from React Router, or use window.location if not using Router
  const queryParams = new URLSearchParams(location.search); // Parse the query string

  const res = queryParams.get(paramName);

  return res ? res : null;
}