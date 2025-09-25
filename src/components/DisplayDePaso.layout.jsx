// Importing components
import {FooterQR} from './FooterQR.layout.jsx';
import { useEffect,useState } from 'react'

// Importing context objects
import {MenuContext} from '../functions/context.jsx';
import { useContext } from 'react';

// Importing React Router
import {
  Outlet
} from 'react-router-dom';

// Importing functions and data
import {obtenerDatosDeHoja} from '../functions/functions.js'
import {urlGS,optionsDisplayDePaso} from '../config/macros.js';

import {displayDePasoStyles} from '../config/customStyles.js';


import { ItemModal } from './modal.component.jsx';

export default function DisplayDePaso () {

    const   menuContext = useContext(MenuContext);
    const   {_getMenuGS,_setDataGS,setBgImage,bgImage} = menuContext;

    const [loading, setLoading] = useState(true);

    // Estado para el modal
    const [modalData, setModalData] = useState(null);

   useEffect(() => {
      // Desactivar el scroll del body
      document.body.style.overflow = 'hidden';
      // Imagen de fondo personalizable (ejemplo fijo, puedes adaptarlo a un input)
      setBgImage(optionsDisplayDePaso.bgImage);
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
            <div className='h-[80vh] place-content-center'>
                <section key="menu-dia" className={"m-auto w-[95%]  p-4 "+(displayDePasoStyles.container)}>
                  <h2 className={"mb-4 text-center "+(displayDePasoStyles.title)}>{optionsDisplayDePaso.sectionTitle}</h2>

                  {  Object.entries(_getMenuGS()).map(([category, items]) => 
                      category === 'Display De Paso' &&
                      <div key={category} className={" mx-10  "+ displayDePasoStyles.descriptionBorder}>
                        {items['config']['descriptionCat'] && <center><p className={displayDePasoStyles.descriptionText}>{items['config']['descriptionCat']}</p></center>}
                        {items['config']['item1Cat'] && <li className={displayDePasoStyles.itemsCatText}>{items['config']['item1Cat']}</li>}
                        {items['config']['item2Cat'] && <li className={displayDePasoStyles.itemsCatText}>{items['config']['item2Cat']}</li>}
                        {items['config']['item3Cat'] && <li className={displayDePasoStyles.itemsCatText}>{items['config']['item3Cat']}</li>}
                        {items['config']['item4Cat'] && <li className={displayDePasoStyles.itemsCatText}>{items['config']['item4Cat']}</li>}
                        {items['config']['item5Cat'] && <li className={displayDePasoStyles.itemsCatText}>{items['config']['item5Cat']}</li>}
                        {items['config']['item6Cat'] && <li className={displayDePasoStyles.itemsCatText}>{items['config']['item6Cat']}</li>}
                        {items['config']['item7Cat'] && <li className={displayDePasoStyles.itemsCatText}>{items['config']['item7Cat']}</li>}
                        {items['config']['item8Cat'] && <li className={displayDePasoStyles.itemsCatText}>{items['config']['item8Cat']}</li>}
                        {items['config']['item9Cat'] && <li className={displayDePasoStyles.itemsCatText}>{items['config']['item9Cat']}</li>}
                        {items['config']['item10Cat'] && <li className={displayDePasoStyles.itemsCatText}>{items['config']['item10Cat']}</li>}
                      </div> 
                        
                  )}
                      

                  <ul className={"grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 "+displayDePasoStyles.itemsText}> 
                  {  Object.entries(_getMenuGS()).map(([category, items]) => 
                      items['items'].map((item, index) => (
                        (item['display-de-paso'] === "si" && item['available']== "si" &&
                        <li 
                          key={index} 
                          className={"flex flex-row items-start justify-between gap-4 px-3 w-full h-full py-2 place-self-center  "+(displayDePasoStyles.itemContainer) +" " + (optionsDisplayDePaso.enableItemModals && " " && displayDePasoStyles.itemHover)}
                          onClick={ optionsDisplayDePaso.enableItemModals &&  
                                    item.image && 
                                    (() => {
                                              setModalData({
                                                          image: "/assets/menu-fotos/" + item.image,
                                                          category: category,
                                                          title: item.title,
                                                          description: item.description,
                                                          price: item.price,
                                                          discountPrice: item.discountPrice,
                                                          featuredText: item.featuredText,
                                                          featuredTextColor: item.featuredTextColor,
                                                          glutenFree: item.glutenFree,
                                                          veggie: item.veggie
                                                      });
                                              setTimeout(() => setModalData(null), optionsDisplayDePaso.delayCloseModal); // Cierra el modal después de 20 segundos
                                            }
                                    )
                          }
                          >
                          {(item['featuredText'] && 
                            <div className='featuredText' style={{color:item['featuredTextColor']||'#0f0'}}>{item['featuredText']}</div>
                          )}
                          {item.image && (
                          <img src={"./assets/menu-fotos/"+item.image} alt={item.title} className="w-20 h-30 object-cover rounded-md place-self-center" />
                          )}
                          <div className="flex-1">
                          
                            <div className="flex flex-row justify-end">  
                            
                              {(item['glutenFree'] === 'si' && 
                                <span className={"bg-yellow-300 p-1  rounded-md float-right font-bold text-xs uppercase mx-1 "+displayDePasoStyles.tagsTextColor}>Sin TACC</span>
                              )}
                              {(item['veggie'] === 'si' && 
                                  <span className={"bg-green-600 p-1 rounded-md float-right font-bold text-xs text-amber-50 uppercase mx-1 "+displayDePasoStyles.tagsTextColor}>Veggie</span>
                              )}
                              <span className={"bg-white p-1 rounded-md float-right font-bold text-xs uppercase "+displayDePasoStyles.tagsTextColor}>{category}</span>
                            </div>
                            <div className="font-bold italic text-lg">{item.title}</div>
                            <div className="text-sm text-gray-500">{
                            (optionsDisplayDePaso.enableItemModals ?
                              (item.description.length > 100 ?item.description.substr(0,100)+'...' : item.description)
                              : 
                              item.description
                            ) 
                            }</div>
                            <div className="flex flex-row ">
                              

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
            <div className='h-[20vh]'>
              <FooterQR/>
            </div>
            {/* Modal */}
            <ItemModal
            open={!!modalData}
            onClose={() => setModalData(null)}
            {...modalData}
            />
        </div>
    );
}