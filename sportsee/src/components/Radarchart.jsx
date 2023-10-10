import RadarchartD3 from './d3/RadarchartD3';
import { useContext } from 'react';
import { datasContext } from '../routes/GetRoutes';
import styled from 'styled-components';

const RadarchartContainer = styled.div`
    width: 28%;
    height:auto;
    aspect-ratio: 1/1;
    display:flex;
    align-items: center;
    justify-content: center;
`;
/** 
 * @namespace Radarchart
 * @function Radarchart
 * @description Container of the RadarchartD3. It stylizes its svg container.
 * @returns {JSX.Element} */

function Radarchart() {
        const { datas } = useContext(datasContext);
    return (
        <RadarchartContainer><svg id = "radarchartSvg" 
        width="100%"
        height="100%"
        viewBox="0 0 500 500"
        style = {{backgroundColor: '#282D30', borderRadius: "5px"}}
    >
        {datas && (
            <RadarchartD3 datas ={ datas?.performancesDatas } />
        )}
    </svg></RadarchartContainer>)
}

export default Radarchart;