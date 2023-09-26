import RadialchartD3 from './d3/RadialchartD3';
import { useContext } from 'react';
import { datasContext } from '../routes/GetRoutes';

function Radialchart() {
        const { datas } = useContext(datasContext);
        console.log("7 radialchart", datas?.userDatas?.todayScore)
    return (
        <svg id = "radialchartSvg" 
        width="500px"
        height="500px"
        viewBox="0 0 500 500"
        style={{ backgroundColor: "#b6b6b6"}}
    >
        {datas && (
            <RadialchartD3 data={ datas?.userDatas} />
        )}
    </svg>)
}

export default Radialchart;