import { useEffect,useState } from 'react'
import { Link ,useParams,useNavigate } from 'react-router-dom'
import {srcImgLogo,slogan} from '../config/macros.js';  

import {footerOptions} from '../config/macros.js'; // Importing footer options

export function FooterQR () {
    const { category } = useParams();
    const pCaterogry = category;

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
    <div className="absolute  w-full z-50 ">
    {/* Header Section */}
        <header className='bg-black text-white shadow-neutral-900 shadow-lg'>
            <div className='flex flex-row my-auto p-2 text-2xl'>
                <div className='flex flex-col sm:flex-row w-1/3 justify-between items-center'>
                    <Link  to={'/'} className="place-self-center  object-cover rounded-md">
                        <img src={'/'+logoImage}  className="h-32"/>
                    </Link>
                    {(sloganText && sloganText.length > 0) &&
                        <h1 className='sm:mr-auto sm:pl-5 text-amber-50 text-xl sm:text-2xl font-extralight italic '>{sloganText}</h1>
                    } 
                </div>
                <div className='flex flex-col my-auto w-1/3 '>
                {
                    footerOptions.enableFacebookBtn && 
                    <a className='flex flex-row w-[30px] mx-4 my-3 uppercase text-2xl mb-2 sm:mb-0' href="#"><img src={'/assets/social/fb.png'} className='w-8 h-8 mr-3'/>{footerOptions.FacebookAlias}</a>
                }
                {
                    footerOptions.enableInstagramBtn && 
                    <a className='flex flex-row w-[30px] mx-4 my-3 uppercase text-2xl mb-2 sm:mb-0' href="#"><img src={'/assets/social/ins.png'} className='w-8 h-8 mr-3'/>{footerOptions.InstagramAlias}</a>
                }
                {
                    footerOptions.enableXBtn && 
                    <a className='flex flex-row w-[30px] mx-4 my-3 uppercase text-2xl' href="#"><img src={'/assets/social/x.png'} className='w-8 h-8 mr-3'/>{footerOptions.XAlias}</a>
                }
                </div>
                 <div className='flex flex-col my-auto w-1/3 items-center '>
                    <div  className='absolute -top-2/3 bg-black p-5 rounded-full'>
                        <div  className=' bg-white p-12 rounded-full'>
                            <img src={'/assets/qr_miresto.png'} className='w-50'/>
                        </div>
                    </div>
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
        
    );
}