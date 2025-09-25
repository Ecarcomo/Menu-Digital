// Importing components
import { useEffect,useState } from 'react'

// Importing context objects
import {MenuContext} from '../functions/context.jsx';
import { useContext } from 'react';

// Importing functions and data
import {obtenerDatosDeHoja} from '../functions/functions.js'
import {urlGS,optionsDisplayCommercial} from '../config/macros.js';

import {displayComercialStyles} from '../config/customStyles.js';


export default function DisplayComercial ({nro_dc}) {

    const   menuContext = useContext(MenuContext);
    const   {_getMenuGS,_setDataGS,setBgImage,bgImage} = menuContext;

    const [loading, setLoading] = useState(true);


   useEffect(() => {
      // Desactivar el scroll del body
      document.body.style.overflow = 'hidden';
      // Imagen de fondo personalizable (ejemplo fijo, puedes adaptarlo a un input)
      setBgImage(optionsDisplayCommercial[('dc-'+nro_dc)].bgImage);
      obtenerinfo();
    }, []);

    const obtenerinfo = async () => {
        const urlSinCache = `${urlGS}${urlGS.includes('?') ? '&' : '?'}_=${Date.now()}`;
        obtenerDatosDeHoja(urlSinCache)
        .then((data) => {
            _setDataGS(data);
            console.log('menuGS:',data);
            setLoading(false);
        });
    }
  

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-500">
        <span className="loader"></span>
      </div>
    );
  }

    return (
        <div className="min-h-screen  bg-cover bg-center bg-no-repeat bg-fixed"
              style={{ backgroundImage: `url(/${bgImage})`}}>
            <div className='h-[100vh] pt-10 place-content-start'>
                <section key="menu-dia" className={"m-auto w-[95%]  p-4 "+(displayComercialStyles[('dc-'+nro_dc)].container)}>
                  <h2 className={"mb-4 text-center "+(displayComercialStyles[('dc-'+nro_dc)].title)} data-text={optionsDisplayCommercial[('dc-'+nro_dc)].sectionTitle}>{optionsDisplayCommercial[('dc-'+nro_dc)].sectionTitle}</h2>

                  <ul className={"grid gap-6 p-4  "+displayComercialStyles[('dc-'+nro_dc)].gapItems}> 
                  {  Object.entries(_getMenuGS()).map(([category, items]) => 
                      items['items'].map((item, index) => (
                        (item[('dc-'+nro_dc)] === "si" && item['available']== "si" &&
                        <li 
                          key={index} 
                          className={"flex flex-row items-start justify-between gap-4 px-5 w-full h-full py-5 place-self-center  "+(displayComercialStyles[('dc-'+nro_dc)].itemContainer)+" "+displayComercialStyles[('dc-'+nro_dc)].itemsText }
                          >
                          {(item['featuredText'] && 
                            <div className='featuredText' style={{color:item['featuredTextColor']||'#0f0'}}>{item['featuredText']}</div>
                          )}
                          {optionsDisplayCommercial[('dc-'+nro_dc)].itemsImages && item.image && (
                          <img src={"./assets/menu-fotos/"+item.image} alt={item.title} className="w-60 h-60 object-cover rounded-md place-self-center" />
                          )}
                          <div className="flex-1">
                          
                            <div className="flex flex-row justify-end">  
                            
                              {(item['glutenFree'] === 'si' && 
                                <span className={"bg-yellow-300 p-1  rounded-md float-right  mx-1 "+displayComercialStyles[('dc-'+nro_dc)].tagsTextColor}>Sin TACC</span>
                              )}
                              {(item['veggie'] === 'si' && 
                                  <span className={"bg-green-600 p-1 rounded-md float-right font-bold  mx-1 "+displayComercialStyles[('dc-'+nro_dc)].tagsTextColor}>Veggie</span>
                              )}
                            </div>
                            <div className={displayComercialStyles[('dc-'+nro_dc)].itemsTitle}>{item.title}</div>
                            <div className={displayComercialStyles[('dc-'+nro_dc)].itemsDescription}>{
                            (
                              item.description
                            ) 
                            }</div>
                            <div className={"flex flex-row "+displayComercialStyles[('dc-'+nro_dc)].itemsPrice}>
                              

                                  {item.discountPrice ? (
                                    <>
                                      <div className="ml-auto line-through text-gray-500 mr-2">
                                        ${item.price.toFixed(2)}
                                      </div>
                                      <div className="text-green-600 font-semibold">
                                        ${item.discountPrice.toFixed(2)}
                                      </div>
                                    </>
                                  ) : (
                                    <div className="ml-auto font-semibold">
                                      ${item.price.toFixed(2)}
                                    </div>
                                  )}
                            </div>
                          </div>
                        </li>)
                        ))
                  )}
                  </ul>
                </section>
            </div>
        </div>
    );
}