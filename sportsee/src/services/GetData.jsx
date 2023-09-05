import { useEffect, useState, useReducer } from "react";

function GetData ({dataSection}){

    const [userData, setUserData] = useState([]);

    useEffect(() => { async function getMainUser(){
        setUserData(await fetch('http://localhost:3000/datas/datasMocked.json')
        .then((res) => { if (res.ok) { return res.json(); } throw res; })
        .catch((err) => {
            console.log('erreur', err);
        }))}; getMainUser()}, [dataSection])

        const userDataSwitch = (state, action) => {
            switch(action.type){
            case "mainData" : return [userData.userMainData];
            case "Activities" : return userData.userActivities; 
            case "AverageSession" : return userData.userAverageSession; 
            case "Performances" : return userData.userPerformances; 
            default : return [userData.userMainData];     
        } 
        }
        
        const [userDataReduce, dispatch] = useReducer(userDataSwitch);
        useEffect(() => { 
            userData && dispatch({type : dataSection})}
    , [dataSection])
    
    return <>{[JSON.stringify(userDataReduce)]}</>
}

export default GetData;