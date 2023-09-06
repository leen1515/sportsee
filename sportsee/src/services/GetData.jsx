import { useEffect, useState, useReducer } from "react";

function GetData ({dataSection}){

    const [userData, setUserData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => { async function getMainUser(){
        setUserData(await fetch('http://localhost:3000/datas/datasMocked.json')
        .then((res) => { if (res.ok) { setIsLoading(false); return res.json()} throw res;  })
        .catch((err) => {
            console.log('erreur', err);
            setIsLoading(false) 
        })); console.log("verif", isLoading, userData)}; getMainUser()}, [dataSection, isLoading])

        const userDataSwitch = (state, action) => {
            switch(action.type){
            case "mainData" : return {...userData.userMainData};
            case "Activities" : return {...userData.userActivities}; 
            case "AverageSession" : return {...userData.userAverageSession}; 
            case "Performances" : return {...userData.userPerformances}; 
            default : return {...userData.userMainData};     
        } 
        }
        
        const [userDataReduce, dispatch] = useReducer(userDataSwitch);
        useEffect(() => { 
            userData && dispatch({type : dataSection})}
    , [dataSection, userData])
            console.log(userDataReduce)
    return [userDataReduce]
}

export default GetData;