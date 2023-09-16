import { Routes, Route } from 'react-router';
import Construction from '../pages/Construction';
import Home from '../pages/home/Home';
import Profil from '../pages/profil/Profil';
import { createContext, useEffect, useState } from "react";
import { getDatasSection } from '../services/getDatasCall';

export const datasContext = createContext(null);

function GetRoutes(){
    const [datas, setDatas] = useState(null);
    const [isDataLoading, setDataLoading] = useState(true);
    const [apiStatut, setApiStatut] = useState(true);
    const [idUserSelected, setIdUserSelected] = useState(12);

    useEffect(() => {
        if(!apiStatut){ 
            return async()=> { 
            try{setDatas(await getDatasSection(process.env.PUBLIC_URL + '/datas/datasMocked.json', parseInt(idUserSelected)))}
            catch (err) {
                console.log(err);
                } finally {
                setDataLoading(false);
            ;
        }}
} else {
    return async()=> { 
        try{setDatas(await getDatasSection(undefined, parseInt(idUserSelected), apiStatut))}
        catch (err) {
            console.log(err);
            } finally {
            setDataLoading(false);
    }}
}
}, []);

console.log('le fichier route 37', datas?.activitiesDatas)


    return  !isDataLoading && <datasContext.Provider value = {{datas : datas, api : apiStatut}}><Routes>
    <Route path="/" element= {<Home/>}/>
    <Route path="/*" element={<Construction/>}/>
    <Route path="/profil/" element={<Profil/>} />
</Routes>
</datasContext.Provider>
}
export default GetRoutes;
