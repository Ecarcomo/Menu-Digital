
import {ButtonCategory} from './button.component.jsx';
import {CategorySection} from './category.section.jsx';

//importing Options Config
import { optionsConfig } from '../config/macros.js';

export function CategoriesLayout({menuGS}) {

    return(
        <div className="flex flex-wrap place-content-center ">
              {(() => {
        
                // Filtrar categorías que no son 'Menu Del Dia', no están vacías y están disponibles
                const categories = menuGS.filter(([categoryName,categoryObject]) => 
                                                    categoryName !== 'Menu Del Dia' && 
                                                    categoryName !== '' && 
                                                    (categoryObject['items'].length > 0) &&
                                                    (categoryObject['config']['availableCat'] === 'si')
                                                );
                // Ordenar categorías por el valor de 'orderCat' en su configuración
                const orderCategories = categories.sort(
                                                          ([, aObj], [, bObj]) => {
                                                            // Convierte a número por si viene como string
                                                            const aOrder = Number(aObj.config.orderCat) || 0;
                                                            const bOrder = Number(bObj.config.orderCat) || 0;
                                                            return aOrder - bOrder;
                                                          }
                                                        );
                
                return orderCategories.map(([categoryName,categoryObject], idx) => {
                  // Si quedan 2 en la última fila, haz que ambos ocupen el 50% en pantallas grandes
                  const isLastOne = orderCategories.length % 3 === 1 && idx > (orderCategories.length-1) - 1;
                  const isLastTwo = orderCategories.length % 3 === 2 && idx > (orderCategories.length-1) - 2;

                  const sizeClass = isLastOne ? 'w-full' : isLastTwo ? ' md:w-1/2 w-full' : 'xl:w-1/3 md:w-1/2 w-full';
                
                  if(categoryObject['items'].length === 0) return null; // Skip empty categories
        
                  if(categoryObject['config']['availableCat'] === 'no') return null; // Skip unavailable categories
        
                  // Renderizar el botón de categoría
                  if(optionsConfig.enableMultiPage) {
                    return (
                        <ButtonCategory
                          key={categoryName}
                          title={categoryName}
                          path={'/menu/category/' + categoryName}
                          srcImg={'/assets/cat-imgs/buttons/' + categoryName + '.png'}
                          sizeClass={sizeClass}
                          classButton={
                            'text-5xl hover:text-4xl inset-shadow-sm inset-shadow-white shadow-md shadow-gray-950 inset-shadow-black hover:drop-shadow-xl/50 transition-all duration-800 ease-in-out '
                          }
                          classText=' font-bold italic text-shadow-lg text-shadow-gray-950 text-center text-white '
                        />
                    );

                  }
                  // Renderizar sección de categoría si es Single Page
                  return(
                    <CategorySection key={categoryName} categoryName={categoryName} categoryObject={categoryObject} sizeClass={sizeClass}/> 
                  );

                });
                
              })()}
            </div>

    );

}