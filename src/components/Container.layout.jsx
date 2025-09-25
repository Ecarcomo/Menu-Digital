// Importing components
import {Header} from './Header.layout.jsx';
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
import {srcImgBackground,urlGS} from '../config/macros.js';

// Importing modal component and dataConfig
import {paramModalsDelay,paramModalsEnable,optionsConfig} from '../config/macros.js'; 
import { ParamModal } from './modal.component.jsx';

//Importing functions
import { getParamValue } from '../functions/functions.js'; 



export default function Container () {

    const   menuContext = useContext(MenuContext);
    const   {_setDataGS, setBgImage,bgImage} = menuContext;

    const pParamModal= getParamValue('paramModal');
    const [modalData ,setModalData] = useState(null);

    const [loading, setLoading] = useState(true);

   useEffect(() => {
      // Imagen de fondo personalizable (ejemplo fijo, puedes adaptarlo a un input)
      setBgImage(srcImgBackground);
      return async ()=>{
        await obtenerinfo();
      }
    }, []);

    const obtenerinfo = async () => {
        const urlSinCache = `${urlGS}${urlGS.includes('?') ? '&' : '?'}_=${Date.now()}`;
        obtenerDatosDeHoja(urlSinCache)
        .then((data) => {
            _setDataGS(data);
            console.log('dataGS:',data);
            setLoading(false);
            paramModalsEnable && pParamModal && setTimeout(()=>handleModal(data['params'][pParamModal]), paramModalsDelay); // Llama a handleModal después de 1 segundo
        });
    }

    // Función para manejar el modal
    const handleModal = (data) => {
      if(optionsConfig.enableParamModals)
            setModalData(data || null);
    };
  

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-500">
        <span className="loader"></span>
      </div>
    );
  }

    return (
      <>
        <div className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
              style={{ backgroundImage: `url(/${bgImage})`}}>
            <Header />
            <Outlet/>
        </div>
        {/* Modal */}
        <ParamModal
        open={!!modalData}
        onClose={() => setModalData(null)}
        {...modalData}
        />
      </>
    );
}