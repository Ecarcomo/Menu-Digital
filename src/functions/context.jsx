
import { createContext } from 'react';
import { useState } from 'react';


export const MenuContext = createContext(null);


export const Provider = ({children}) => {
    const [dataGS, setDataGS] = useState({});
    const [bgImage, setBgImage] = useState("");

    function _getMenuGS(){
        return dataGS['menu'] || null;
    }
    function _getParamsGS(){
        return dataGS['params']|| null;
    }
    function _setDataGS(data){
        setDataGS(data);
    }

    return (
        <MenuContext.Provider value={{_getParamsGS, _getMenuGS, _setDataGS,bgImage, setBgImage}}>
            {children}
        </MenuContext.Provider>
    )
}