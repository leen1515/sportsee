import { useContext } from 'react';
import { datasContext } from '../routes/GetRoutes';
import BarChartD3 from './d3/BarchartD3';

function BarChart() {
        const { datas } = useContext(datasContext);
        console.log("7 datas", datas?.activitiesDatas?.sessions)
    return (
        <>
            <svg width="825"
                height="320"
                viewBox="0 0 825 320"
            >
                <text x="32" y="50" fill="#20253A" fontSize="15">
                    Activité quotidienne
                </text>
                <circle cx="520" cy="44" r="4" fill="#20253A" />
                <text x="535" y="50" fill="#20253A" fontSize="15">
                    Poids (kg)
                </text>
                <circle cx="620" cy="44" r="4" fill="#E60000" />
                <text x="635" y="50" fill="#20253A" fontSize="15">
                    Calories Brulées (kCal)
                </text>
                {datas && (
                    <BarChartD3 data={ datas?.activitiesDatas?.sessions} />
                )}
            </svg>
        </>
    );
}

export default BarChart;