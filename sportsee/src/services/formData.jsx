import GetData from "./GetDatas";


export function formData(){
    const stateMainData = () => {
        return GetData({dataSection : "mainData"})
    }

    const stateActivities = () => {
        return GetData({dataSection : "Activities"})

    }

    const stateAverageSession = ()=> {
        return GetData({dataSection : "AverageSession"})

    }

    const statePerformances = () => {
        return GetData({dataSection : "Performances"})

    }

    return {stMainData : stateMainData(), stActivities : stateActivities(), stAverage: stateAverageSession(), stPerformance : statePerformances()}
}