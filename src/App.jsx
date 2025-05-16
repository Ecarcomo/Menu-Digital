import { useEffect,useState } from 'react'
import './App.css'
import {obtenerDatosDeHoja} from './functions/functions.js'

function App() {
  const [menu, setMenu] = useState({});
  const [menuGS, setMenuGS] = useState({});
  const [bgImage, setBgImage] = useState("");
  const [logoImage, setLogoImage] = useState("");

  useEffect(() => {

    // Imagen de fondo personalizable (ejemplo fijo, puedes adaptarlo a un input)
    setBgImage("./assets/background.png");
    setLogoImage("./assets/logo.png");


    /*fetch("./menu.json") // El archivo JSON debe estar en public/
      .then((res) => res.json())
      .then((data) => {
        setMenu(data);
        console.log('menu:',data);
      });*/

    
    
    obtenerinfo();
 
  }, []);

  const obtenerinfo = async () => {
    obtenerDatosDeHoja('https://docs.google.com/spreadsheets/d/e/2PACX-1vRz9tuezMxV4YtWxMi8oEg2N2sTuH8fK9mhpNaWsTK_51zQdKPSuRDITWLeQYr3Mi36AzGJ9Kl4RLZL/pub?gid=0&single=true&output=tsv')
    .then((data) => {
      setMenuGS(data);
      console.log('menuGS:',data);
    });
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: `url(${bgImage})`}}
  >
      <header className='bg-black text-white'>
        <div className='flex flex-row my-auto p-5 text-2xl'>
          <img src={logoImage} className="place-self-center h-20 object-cover rounded-md"/>
          <div className='flex text-right flex-row w-full my-auto justify-end'>
              <a className='w-[30px] mx-4 text-lg mb-2 sm:mb-0' href="#"><img src={'./assets/social/fb.png'} className='w-8 h-8'/></a>
              <a className='w-[30px] mx-4 text-lg mb-2 sm:mb-0' href="#"><img src={'./assets/social/ins.png'} className='w-8 h-8'/></a>
              <a className='w-[30px] mx-4 text-lg' href="#"><img src={'./assets/social/x.png'} className='w-8 h-8'/></a>
          </div>
        </div>
      </header>
        <section key="menu-dia" className="bg-white/80 p-4 m-4 rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-center">Menu Del Dia</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4"> 
          {  Object.entries(menuGS).map(([category, items]) => 
          items.map((item, index) => (
            (item['menu-ppal'] === "si" && item['available']== "si" &&
            <li key={index} className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 px-10 w-full h-full bg-white py-5 rounded-md place-self-center">
              <img src={item.image} alt={item.title} className="w-full sm:w-20 sm:h-20 object-cover rounded-md" />
              <div className="flex-1">
                <span className="bg-white p-1 rounded-md float-right font-bold text-xs uppercase">{category}</span>
                <div className="font-bold italic text-lg">{item.title}</div>
                <div className="text-sm text-gray-500">{item.description}</div>
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
      <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-6 p-4 ">
      {Object.entries(menuGS).map(([category, items]) => (
        
       
       <section key={category} className="bg-white/80 p-4 rounded-2xl shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center">{category}</h2>
            <ul className="space-y-4">
              {
                items.map((item, index) => (
                  ( item['available']== "si" && 
                    (<li
                        key={index}
                        className="flex items-start justify-between gap-4 border-b last:border-b-0 pb-2"
                      >
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-20 h-20 object-cover rounded-md"
                          />
                        )}
                        <div className="flex-1">
                          <div className="font-bold italic text-lg">{item.title}</div>
                          <div className="text-sm text-gray-500">{item.description}</div>
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
                              <div className="ml-auto font-semibold">${item.price.toFixed(2)}</div>
                            )}
                          </div>
                        </div>
                      </li>
                    )
                  )
                ))
              }
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

export default App
