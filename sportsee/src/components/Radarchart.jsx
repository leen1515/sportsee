import RadialchartD3 from './d3/RadarchartD3';
import { useContext } from 'react';
import { datasContext } from '../routes/GetRoutes';

function Radarchart() {
        const { datas } = useContext(datasContext);
        console.log("7 radarchart", datas?.performancesDatas)
    return (
        <><svg id = "radarchartSvg" 
        width="500px"
        height="500px"
        viewBox="0 0 500 500"
        style={{ backgroundColor: "#282D30"}}
    >
        {datas && (
            <RadialchartD3 data={ datas?.performancesDatas } />
        )}
    </svg></>)
}

export default Radarchart;