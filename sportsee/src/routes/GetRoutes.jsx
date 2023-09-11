import { Routes, Route } from 'react-router';
import Construction from '../pages/Construction';
import Home from '../pages/home/Home';
import Profil from '../pages/profil/Profil';
import { createContext, useEffect, useState } from "react";
import { getDatasSection } from '../services/getDatas';

export const datasContext = createContext(null);

function GetRoutes(){
    const [mockUser, setMockUser] = useState(null);
    const [isDataLoading, setDataLoading] = useState(true);

    useEffect(() => async()=> { 
        try{setMockUser(await getDatasSection(process.env.PUBLIC_URL + '/datas/datasMocked.json', parseInt(18)))}
        catch (err) {
            console.log(err);
            } finally {
            setDataLoading(false);
        ;
    }}, [setMockUser]);

    return  !isDataLoading && <datasContext.Provider value = {{datas : mockUser, set: setMockUser}}><Routes>
    <Route path="/" element= {<Home/>}/>
    <Route path="/*" element={<Construction/>}/>
    <Route path="/profil/" element={<Profil/>} />
</Routes>
</datasContext.Provider>
}
export default GetRoutes;
