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
        const fetchData = async () => {
            try {
                let data = await getDatasSection(undefined, parseInt(idUserSelected), true);
                if (data === null || data === undefined) {
                    setApiStatut(false);
                    throw new Error('API returned null or undefined');
                } else {
                setApiStatut(true);}
                setDatas(data);
            } catch (err) {
                console.log('Error fetching from API:', err);
                try {
                    let mockedData = await getDatasSection(process.env.PUBLIC_URL + '/datas/datasMocked.json', parseInt(idUserSelected), false);
                    setDatas(mockedData);
                    setApiStatut(false); 
                } catch (mockedErr) {
                    console.log('Error fetching mocked data:', mockedErr);
                }
            } finally {
                setDataLoading(false);
            }
        }
    
        fetchData();
    }, [idUserSelected, apiStatut]); 

console.log('le fichier route 37', datas?.activitiesDatas)


    return  !isDataLoading && <datasContext.Provider value = {{datas : datas, api : apiStatut}}><Routes>
    <Route path="/" element= {<Home/>}/>
    <Route path="/*" element={<Construction/>}/>
    <Route path="/profil/" element={<Profil/>} />
</Routes>
</datasContext.Provider>
}
export default GetRoutes;
