import { Route, Routes } from 'react-router-dom';

import Home from "./Home.jsx";
import _Home from './_Home.jsx';
import Admin from "./Admin.jsx";
import Error404 from './Error404.jsx';



function Site() {
    return (
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/admin" element={<Admin />} />
				<Route path="/_" element={<_Home />} />
                <Route path="*" element={<Error404 />} />
            </Routes>
    );
}

export default Site;
