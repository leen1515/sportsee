import { Routes, Route } from 'react-router';
import Construction from '../pages/Construction';
import Home from '../pages/home/Home';
import Profil from '../pages/profil/Profil';

function GetRoutes(){
    return <Routes>
    <Route path="/" element= {<Home/>}/>
    <Route path="/*" element={<Construction/>}/>
    <Route path="/profil" element={<Profil/>} />
</Routes>
}
export default GetRoutes;
