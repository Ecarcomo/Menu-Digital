// Importing libraries
import { useEffect,useState,useContext } from 'react'
import '../App.css'



// Importing Context
import {MenuContext} from '../functions/context.jsx';


// Importing components
import { PrincipalSection } from './principal.section.jsx';
import { CategoriesLayout } from './Categories.layout.jsx';


function Interface() {

  const   menuContext = useContext(MenuContext);
  const   {_getMenuGS} = menuContext;

  return (
    <>
      {/* seccion principal */}
      <PrincipalSection menuGS={Object.entries(_getMenuGS())} />

      {/* seccion por categorias */}
      <CategoriesLayout menuGS={Object.entries(_getMenuGS())} />
    </>
    
  );
}

export default Interface
