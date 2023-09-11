import Axios from 'axios';

export async function getDatasSection(mock, userId){
    const datas = await Axios.get(mock).then((response) => response.data);
    const userDatas = await datas.userMainData.find((data) => (data.userId === userId));
    const activitiesDatas = await datas.userActivities.find((data) => (data.userId === userId));
    const averageDatas = await datas.userAverageSession.find((data) => (data.userId === userId));
    const performancesDatas = await datas.userPerformances.find((data) => (data.userId === userId));
    console.log(datas);

    const getDatasUserInfos = () => {
        const { keyData, todayScore, userId, userInfos } = userDatas;
        console.log("user info", userInfos);

        const getKeyData = () => {
            const {calorieCount, proteinCount, carbohydrateCount, lipidCount} = keyData;
            console.log("keyData", keyData);
            return {calorieCount, proteinCount, carbohydrateCount, lipidCount}
        }

        const getUserInfos = () => {
            const {firstName, lastName, age} = userInfos;
            console.log("userInfos", userInfos);
            return {firstName, lastName, age}
        }

        return {getKeyData, todayScore, userId, getUserInfos};
    }

    const getDatasActivities = () => {
        const { userId, sessions } = activitiesDatas;
        console.log("user info", sessions);

        const getActivitiesSession = () => {
            const {day, kilogram, calories} = sessions;
            console.log("sessions", sessions);
            return {day, kilogram, calories}
        }

        return {userId, getActivitiesSession};
    }
    
    const getDatasAverage = () => {
        const { userId, sessions } = averageDatas;
        console.log("user info", sessions);

        const getAverageSession = () => {
            const {day, sessionLength} = sessions;
            console.log("sessions", sessions);
            return {day, sessionLength}
        }
        return {userId, getAverageSession};
    }

    const getDatasUserPerformance = () => {
        const { userId, kind, data } = performancesDatas;
        console.log("user info", kind, data);

        const getPerformanceKind = () => {
            const {k1, k2, k3, k4, k5, k6} = kind;
            console.log("kind", kind);
            return {k1, k2, k3, k4, k5, k6}
        }
        
        const getPerformanceKindData = () => {
            const {value, kind} = data;
            console.log("data", data);
            return {value, kind}
        }

        return {userId, getPerformanceKind, getPerformanceKindData};
    }



    return {getDatasUserInfos, getDatasActivities, getDatasAverage, getDatasUserPerformance};
}
