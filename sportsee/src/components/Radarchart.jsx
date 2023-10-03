import RadarchartD3 from './d3/RadarchartD3';
import { useContext } from 'react';
import { datasContext } from '../routes/GetRoutes';
import styled from 'styled-components';

const RadarchartContainer = styled.div`
    width: 20%;
    height:100%;
    display:flex;
    align-items: center;
    justify-content: center;
`;
function Radarchart() {
        const { datas } = useContext(datasContext);
        console.log("7 radarchart", datas?.performancesDatas)
    return (
        <RadarchartContainer><svg id = "radarchartSvg" 
        width="100%"
        height="263px"
        viewBox="0 0 500 500"
        style = {{backgroundColor: '#282D30', borderRadius: "8px"}}
    >
        {datas && (
            <RadarchartD3 datas ={ datas?.performancesDatas } />
        )}
    </svg></RadarchartContainer>)
}

export default Radarchart;