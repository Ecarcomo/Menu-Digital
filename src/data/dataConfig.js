
/* se encarga de mappear los nopmbres de los encabezados que escribimos en la hoja de google sheets con los campos reconocidos en el código */
export const fieldMapping = {
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

/*Variables de rutas de imagenes */
export const srcImgBackground = "./assets/background.png";
export const srcImgLogo = "./assets/logo.png";

/*Variables de fuente de datos */
export const urlGS= 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRz9tuezMxV4YtWxMi8oEg2N2sTuH8fK9mhpNaWsTK_51zQdKPSuRDITWLeQYr3Mi36AzGJ9Kl4RLZL/pub?gid=0&single=true&output=tsv';
export const nLineEncab = 1; // Número de línea donde están los encabezados
