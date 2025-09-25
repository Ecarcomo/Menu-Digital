// Importing libraries
import './App.css'

import Container from './components/Container.layout.jsx';
import Interface from './components/Inteface.layout.jsx';
import {CategorySection} from './components/category.section.jsx';
import DisplayDePaso from './components/DisplayDePaso.layout.jsx';
import DisplayComercial from './components/DisplayComercial.layout.jsx';

import { useEffect } from 'react';

import { appName ,appDescription , optionsConfig} from './config/macros.js';

// Importing React Router
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';


function App() {
  useEffect(() => {
    document.title = appName;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", appDescription);
    } else {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.content = appDescription;
      document.head.appendChild(meta);
    }
  }, []);

  // Si la opción de MultiPage está habilitada, se renderizan las rutas correspondientes
  if(optionsConfig.enableMultiPage) {
    return (
      <Router>
            <Routes>
              {/* Defining routes */}
              <Route path="/menu" element={<Container />} >
                <Route index element={<Interface />} />
                <Route path="/menu/category/:category" element={<CategorySection />} />
              </Route>
              {
                optionsConfig.enableDisplayDePaso &&
                <Route path="/external" element={<DisplayDePaso />} >
                  <Route index element={<Interface />} />
                </Route>
              }
              {
                optionsConfig.enableCommercialDisplay &&
                Array.from({ length: optionsConfig.qtyCommercialDisplay }, (_, i) => (
                  <Route key={`dc-${i + 1}`} path={`/dc-${i + 1}`} element={<DisplayComercial nro_dc={i + 1} />} />
                ))
              }
              <Route path="*" element={<Navigate to="/menu" />} />
            </Routes>
      </Router>
    );
  }

  // Sin MultiPage no esta habilitado,el menu entra en modo Single Page
  return (
    <div className="App">
      <Router>
        <Routes>
            {/* Defining routes */}
            <Route path="/menu" element={<Container />} >
              <Route index element={<Interface />} />
            </Route>
              {
                optionsConfig.enableDisplayDePaso &&
                <Route path="/external" element={<DisplayDePaso />} >
                  <Route index element={<Interface />} />
                </Route>
              }
            <Route path="*" element={<Navigate to="/menu" />} />
          </Routes>
      </Router>
    </div>
  );
}

export default App
