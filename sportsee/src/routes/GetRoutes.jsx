import { Routes, Route } from 'react-router';
import Home from '../pages/home/Home';
import Profil from '../pages/profil/Profil';
import { createContext, useEffect, useState } from "react";
import { getDatasSection } from '../services/getDatasCall';
import Loading from '../components/Loading';
import Construction from '../pages/construction/Construction';

export const datasContext = createContext(null);

function GetRoutes(){
    const [datas, setDatas] = useState(null);
    const [isDataLoading, setDataLoading] = useState(true);
    const [apiStatut, setApiStatut] = useState(false);
    const [idUserSelected, setIdUserSelected] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!idUserSelected && null);
        const fetchData = async () => {
            setDataLoading(true);
            try {
                if (!idUserSelected) throw new Error("Veuillez sélectionner un utilisateur présent");
        
                const isAPI = apiStatut && idUserSelected;
                const data = isAPI 
                    ? await getDatasSection(undefined, idUserSelected, true)
                    : await getDatasSection(process.env.PUBLIC_URL + '/datas/datasMocked.json', idUserSelected, false);
        
                setDatas(data);
            } catch (err) {
                setError(err.message || "An error occurred");
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

    
    return (
        <datasContext.Provider value={{ datas, api: apiStatut, choiceId, toggleAPIMode, idUserSelected }}>
        {(isDataLoading ) && <Loading />}
            <Routes>
                {(idUserSelected && apiStatut && error === "Veuillez sélectionner un utilisateur présent") && (
                <><Route path="/profil/:userId" element={<Profil />} />
                <Route path="/profil" element={<Profil />} />
                <Route path="/" element={<><Home messageError={error} /><Loading /></>} />
                <Route path="/*" element={<Construction />}/>
                </>)}
                {(idUserSelected && !apiStatut && (error === "Veuillez sélectionner un utilisateur présent" || "Network Error")) && (
                <><Route path="/profil/:userId" element={<Profil />} />
                <Route path="/profil" element={<Profil />} />
                <Route path="/" element={<><Home messageError={error} /><Loading /></>} />
                <Route path="/*" element={<Construction />}/>
                </>)}
                <Route path="/" element={<><Home messageError={error} /><Loading /></>} />
                <Route path="/profil/:userId" element={<><Home messageError={error} /><Loading /></>} />
                <Route path="/profil" element={<><Home messageError={error} /><Loading /></>} />
                <Route path="/*" element={<Construction />} />
            </Routes>

        </datasContext.Provider>
    );

}

export default GetRoutes;
