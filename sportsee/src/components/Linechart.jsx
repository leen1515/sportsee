import LinechartD3 from './d3/LinechartD3';
import { useContext } from 'react';
import { datasContext } from '../routes/GetRoutes';

function Linechart() {
        const { datas } = useContext(datasContext);
        console.log("7 average fichier linechart", datas?.averageDatas?.sessions)
    return (
        <>
            <svg id = "linechartSvg" 
                width="500px"
                height="400px"
                viewBox="0 0 500 500"
                style={{ backgroundColor: '#FF0000' }}
            >
                 <text x="32" y="50" fill="#ffffff87" fontSize="15">
                    Durée moyenne des sessions
                </text>
                {datas && (
                    <LinechartD3 data={ datas?.averageDatas?.sessions } />
                )}
            </svg>
        </>
    );
}

export default Linechart;