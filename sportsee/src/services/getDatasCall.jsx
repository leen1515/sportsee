import Axios from 'axios';
import { getUserId, getActivity, getAverage, getPerformance } from './api';

export async function getDatasSection(mock, userId, apiCall) {
    const API_URL = "http://localhost:3001";
    const datas = !apiCall && await Axios.get(mock).then((response) => response.data);
    const userDatas = apiCall ? await (getUserId(API_URL, userId)) : await datas[0].userMainData.find((data) => (data.userId === userId));
    const activitiesDatas = apiCall ? await (getActivity(API_URL, userId)) : await datas[0].userActivities.find((data) => (data.userId === userId));
    const averageDatas = apiCall ? await (getAverage(API_URL, userId)) : await datas[0].userAverageSession.find((data) => (data.userId === userId));
    const performancesDatas = apiCall ? await (getPerformance(API_URL, userId)) : await datas[0].userPerformances.find((data) => (data.userId === userId));
    console.log(datas[0]);
    console.log("appi", apiCall, userDatas.data)

    const getDatasUserInfos = () => {
        const { keyData, todayScore, userId, userInfos } = apiCall? userDatas.data:userDatas;
        console.log("user info", userDatas, userInfos);

        const getKeyData = () => {
            const { calorieCount, proteinCount, carbohydrateCount, lipidCount } = keyData;
            console.log("keyData", keyData);
            return { calorieCount, proteinCount, carbohydrateCount, lipidCount }
        }

        const getUserInfos = () => {
            const { firstName, lastName, age } = userInfos;
            console.log("userInfos", userInfos);
            return { firstName, lastName, age }
        }

        return { keyData: getKeyData(), todayScore, userId, userInfos: getUserInfos() }
    }

    const getDatasActivities = () => {
        const { userId, sessions } = apiCall? activitiesDatas.data: activitiesDatas;
        console.log("user info", sessions);

        const getActivitiesSession = () => {
            return sessions.map((d) => {
                const { day, kilogram, calories } = d;
                const dayFormat = day.toString().slice(-1);
                return { day: dayFormat, kilogram: kilogram, calories: calories }
            });
        }
        console.log('actisession 44', getActivitiesSession())
        return { userId, sessions: getActivitiesSession()};

    }


    const getDatasAverage = () => {
        const { userId, sessions } = apiCall? averageDatas.data: averageDatas;
        console.log("user info", sessions);

        const getAverageSession = () => {
            const { day, sessionLength } = sessions;
            console.log("sessions", sessions);
            return { day, sessionLength }
        }
        return { userId, sessions: getAverageSession() };
    }

    const getDatasUserPerformance = () => {
        const { userId, kind, data } = apiCall? performancesDatas.data: performancesDatas;
        console.log("user info", kind, data);

        const getPerformanceKind = () => {
            const { k1, k2, k3, k4, k5, k6 } = kind;
            console.log("kind", kind);
            return { k1, k2, k3, k4, k5, k6 }
        }

        const getPerformanceKindData = () => {
            const { value, kind } = data;
            console.log("data", data);
            return { value, kind }
        }

        return { userId, kind: getPerformanceKind(), data: getPerformanceKindData() };
    }

    return { userDatas: getDatasUserInfos(), activitiesDatas: getDatasActivities(), averageDatas: getDatasAverage(), performancesDatas: getDatasUserPerformance()};
}
