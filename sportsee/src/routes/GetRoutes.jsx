import { Routes, Route } from 'react-router';
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
            setDataLoading(true);
            try {
                let data;

                if(apiStatut) {
                    data = await getDatasSection(undefined, parseInt(idUserSelected), true);
                } else {
                    data = await getDatasSection(process.env.PUBLIC_URL + '/datas/datasMocked.json', parseInt(idUserSelected), false);
                }

                setDatas(data);
            } catch (err) {
                console.log('Error fetching data:', err);
            } finally {
                setDataLoading(false);
            }
        }
    
        fetchData();
    }, [idUserSelected, apiStatut]); 

    const choiceId = (id) => {
        setIdUserSelected(id);
    }

    const toggleAPIMode = () => {
        setApiStatut(prev => !prev);
    }

    return !isDataLoading && (
        <datasContext.Provider value={{datas, api: apiStatut, choiceId, toggleAPIMode}}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profil/" element={<Home />} />
                <Route path="/profil/:userId" element={<Profil />} />
            </Routes>
        </datasContext.Provider>
    );
}

export default GetRoutes;
