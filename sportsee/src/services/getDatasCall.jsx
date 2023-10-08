import Axios from 'axios';
import { getUserId, getActivity, getAverage, getPerformance } from './Api';

export async function getDatasSection(mock, userId, apiCall) {
    const API_URL = "http://localhost:3001";
    const datas = !apiCall? await Axios.get(mock).then(res => res.data) : null;
    console.log("datas", datas);
    const fetchData = async (apiFunction, dataPath) => {
        if (apiCall) {
            return await apiFunction(API_URL, userId);
        }
        return datas[0][dataPath].find(data => data.userId === userId);
    };

    const userDatas = await fetchData(getUserId, 'userMainData');
    const activitiesDatas = await fetchData(getActivity, 'userActivities');
    const averageDatas = await fetchData(getAverage, 'userAverageSession');
    const performancesDatas = await fetchData(getPerformance, 'userPerformances');
    
    const getDatasUserInfos = () => {
        const { keyData, todayScore, score, userId, userInfos } = apiCall ? userDatas.data : userDatas;

        const getKeyData = () => {
            return {
                calorieCount: keyData.calorieCount,
                proteinCount: keyData.proteinCount,
                carbohydrateCount: keyData.carbohydrateCount,
                lipidCount: keyData.lipidCount,
            };
        };

        const getUserInfos = () => {
            return {
                firstName: userInfos.firstName,
                lastName: userInfos.lastName,
                age: userInfos.age,
            };
        };

        return { keyData: getKeyData(), todayScore: todayScore||score, iD: userId, userInfos: getUserInfos() }
    }

    const getDatasActivities = () => {
        const { userId, sessions } = apiCall ? activitiesDatas.data : activitiesDatas;
        const getActivitiesSession = () => {
            return sessions.map((d) => {
                const { day, kilogram, calories } = d;
                const dayFormat = day.toString().slice(-1);
                return { day: dayFormat, kilogram: kilogram, calories: calories }
            });
        }
        return { userId, sessions: getActivitiesSession() };

    }


    const getDatasAverage = () => {
        const { userId, sessions } = apiCall ? averageDatas.data : averageDatas;
        const getAverageSession = () => {
            return sessions?.map(({ day, sessionLength }, i) => ({ day, sessionLength }));
        }
        return { userId, sessions: getAverageSession() };
    }

    const getDatasUserPerformance = () => {
        const { userId, kind, data } = apiCall ? performancesDatas.data : performancesDatas;

        const getPerformanceKindData = () => {
            return data?.map(({ value, kind }) => ({ value, kind }));
        }
        return { userId, kind: kind, dataPerformance: getPerformanceKindData() };
    }

    return { userDatas: getDatasUserInfos(), activitiesDatas: getDatasActivities(), averageDatas: getDatasAverage(), performancesDatas: getDatasUserPerformance() };
}
