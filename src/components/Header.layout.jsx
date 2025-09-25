import { useEffect,useState } from 'react'
import { Link ,useParams,useNavigate } from 'react-router-dom'

// Importing logo and slogan from dataConfig
import {srcImgLogo,slogan,headerOptions} from '../config/macros.js';

// Importing styles
import {headerStyles} from '../config/customStyles.js';


export function Header () {

    
    const { category } = useParams();
    const pCaterogry = category;

    // Importing logo and slogan from dataConfig
    const [logoImage, setLogoImage] = useState("");
    const [sloganText, setSloganText] = useState("");

    const navigate = useNavigate();

    const [buttonTop, setButtonTop] = useState(150); // Estado para la posición 'top' del botón
    const initialTop = 150; // Posición 'top' inicial deseada
    const scrollOffset = 140; // Cuánto quieres que se mueva hacia arriba al hacer scroll

    const handleScroll = () => {
        const scrollY = window.scrollY; // Cuántos píxeles se ha desplazado la ventana
        // Calcula la nueva posición 'top'.
        // Si el scroll supera un cierto umbral, haz que el botón suba un poco.
        // Puedes ajustar 'initialTop - scrollOffset' para que no suba demasiado.
        const newTop = Math.max(initialTop - scrollY , initialTop - scrollOffset); // Ajusta el 0.1 para la velocidad

        setButtonTop(newTop);
    };


    useEffect(() => {
        setLogoImage(srcImgLogo);
        setSloganText(slogan);


        // Agregar el listener de scroll al cargar el componente
        // y eliminarlo al desmontar el componente
        window.addEventListener('scroll', handleScroll);
        return () => {
        window.removeEventListener('scroll', handleScroll);
       };
    }, []);

    return (
    <>
        <div className="w-full z-50 ">
        {/* Header Section */}
            <header className={headerStyles.container}>
                <div className='flex flex-row my-auto px-5 py-1 text-2xl'>
                    <div className='flex flex-col sm:flex-row w-full justify-between items-center'>
                        <Link  to={'/'} className="place-self-center  object-cover rounded-md">
                            <img src={'/'+logoImage}  className="h-24"/>
                        </Link>
                        {(sloganText && sloganText.length > 0) &&
                            <h1 className={'sm:mr-auto sm:pl-5 '+headerStyles.sloganStyle}>{sloganText}</h1>
                        } 
                    </div>
                    <div className='flex text-right flex-row w-full my-auto justify-end'>
                        {
                            headerOptions.enableFacebookBtn && 
                            <a className='w-[30px] mx-4 text-lg mb-2 sm:mb-0' href={headerOptions.enableFacebookLink} target="_blank" rel="noopener noreferrer">
                                <img src={'/assets/social/fb.png'} className='w-8 h-8'/>
                            </a>
                        }
                        {
                            headerOptions.enableInstagramBtn && 
                            <a className='w-[30px] mx-4 text-lg mb-2 sm:mb-0' href={headerOptions.enableInstagramLink} target="_blank" rel="noopener noreferrer">
                                <img src={'/assets/social/ins.png'} className='w-8 h-8'/>
                            </a>
                        }
                        {
                            headerOptions.enableXBtn && 
                            <a className='w-[30px] mx-4 text-lg' href={headerOptions.enableXLink} target="_blank" rel="noopener noreferrer">
                                <img src={'/assets/social/x.png'} className='w-8 h-8'/>
                            </a>
                        }
                       
                    </div>
                </div>
            </header>
            {
                (pCaterogry &&
                (<button
                onClick={() => navigate(-1)}
                style={{zIndex: 20, top: `${buttonTop}px`}}
                className="fixed  ml-5 bg-gray-800 bg-opacity-80 hover:bg-opacity-100 text-amber-50 font-bold px-4 py-2 rounded-full shadow-lg cursor-pointer"
                >
                    <img src="/assets/icons/undo.png" alt="" />
                </button>))
            }
        </div>
    </>
    
        
    );
}