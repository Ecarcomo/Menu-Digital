import { useState } from 'react'

// Importing components
import { ItemModal } from './modal.component';

// Importing data configuration
import { optionsConfig } from '../config/macros.js';
import { principalSectionStyles } from '../config/customStyles.js';

export function PrincipalSection({menuGS}) {

    // Estado para el modal
    const [modalData, setModalData] = useState(null);

    return(
        <section key="menu-dia" className= {"py-4 m-4 "+principalSectionStyles.container}>
          <h2 className={"mb-4 text-center "+(principalSectionStyles.title)}>Menu Del Dia</h2>

           { menuGS.map(([category, items]) => 
              category === 'Menu Del Dia' &&
              <div key={category} className={" mx-10 " +principalSectionStyles.descriptionText+" "+ principalSectionStyles.descriptionBorder}>
                {items['config']['descriptionCat'] && <center><p className='text-sm font-bold mb-4'>{items['config']['descriptionCat']}</p></center>}
                {items['config']['item1Cat'] && <li className='text-sm '>{items['config']['item1Cat']}</li>}
                {items['config']['item2Cat'] && <li className='text-sm '>{items['config']['item2Cat']}</li>}
                {items['config']['item3Cat'] && <li className='text-sm '>{items['config']['item3Cat']}</li>}
                {items['config']['item4Cat'] && <li className='text-sm '>{items['config']['item4Cat']}</li>}
                {items['config']['item5Cat'] && <li className='text-sm '>{items['config']['item5Cat']}</li>}
                {items['config']['item6Cat'] && <li className='text-sm '>{items['config']['item6Cat']}</li>}
                {items['config']['item7Cat'] && <li className='text-sm '>{items['config']['item7Cat']}</li>}
                {items['config']['item8Cat'] && <li className='text-sm '>{items['config']['item8Cat']}</li>}
                {items['config']['item9Cat'] && <li className='text-sm '>{items['config']['item9Cat']}</li>}
                {items['config']['item10Cat'] && <li className='text-sm '>{items['config']['item10Cat']}</li>}
              </div> 
                
          )}
              

          <ul className={"grid grid-cols-1 lg:grid-cols-2 gap-6 py-4 sm:px-4 "+principalSectionStyles.itemsText}> 
          {  menuGS.map(([category, items]) => 
              items['items'].map((item, index) => (
                (item['menu-dia'] === "si" && item['available']== "si" &&
                <li 
                  key={index} 
                  className={"flex flex-row items-start justify-between gap-4 px-3 w-full h-full  py-5 place-self-center "+(principalSectionStyles.itemContainer) +" " + (optionsConfig.enableItemModals &&" "&& principalSectionStyles.itemHover)}
                  onClick={optionsConfig.enableItemModals && 
                            item.image && (() => setModalData({
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
                                              }))
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
                        <span className={"bg-yellow-300 p-1  rounded-md float-right font-bold text-xs uppercase mx-1 "+principalSectionStyles.tagsTextColor}>Sin TACC</span>
                      )}
                      {(item['veggie'] === 'si' && 
                          <span className={"bg-green-600 p-1 rounded-md float-right font-bold text-xs text-amber-50 uppercase mx-1 "+principalSectionStyles.tagsTextColor}>Veggie</span>
                      )}
                       <span className={"bg-white p-1 rounded-md float-right font-bold text-xs uppercase "+principalSectionStyles.tagsTextColor}>{category}</span>
                    </div>
                    <div className="font-bold italic text-lg">{item.title}</div>
                    <div className="text-sm text-gray-500">{(item.description.length > 100 ?item.description.substr(0,100)+'...' : item.description)}</div>
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
          {/* Modal */}
          <ItemModal
            open={!!modalData}
            onClose={() => setModalData(null)}
            {...modalData}
          />
        </section>

    );

}