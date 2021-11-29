import React from 'react';
//este import es de router para poder ir pasando de pagina en pagina 
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom';
//las paginas 

import Home from './Pages/Home';
import Login from './Pages/Login';

const App = () => (
    //de la madre de los router este es como el central borras los comentarios y solo los comentarios
    <Router>
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/Login" element={<Login />} />
        </Routes>
    </Router>
);

export default App;
