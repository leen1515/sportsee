import Axios from 'axios';
import { getUserId, getActivity, getAverage, getPerformance } from './Api';

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
        console.log("user info average", sessions);

        const getAverageSession = () => {
            return sessions?.map(({ day, sessionLength }, i) => ({day, sessionLength }));
        }
        console.log('average 55', getAverageSession());
        return { userId, sessions: getAverageSession() };
    }

    const getDatasUserPerformance = () => {
        const { userId, kind, data } = apiCall? performancesDatas.data: performancesDatas;
        console.log("user info 63 userperformance", kind, data);

        const getPerformanceKindData = () => {
            return data?.map((d) => {
                const { value, kind } = d;
                console.log("data performance", d);
                return { value, kind }
            });
        }
        console.log("performance kind", kind);
        return { userId, kind: kind, data: getPerformanceKindData() };
    }

    return { userDatas: getDatasUserInfos(), activitiesDatas: getDatasActivities(), averageDatas: getDatasAverage(), performancesDatas: getDatasUserPerformance()};
}
