import RadialchartD3 from './d3/RadialchartD3';
import { useContext } from 'react';
import { datasContext } from '../routes/GetRoutes';
import styled from 'styled-components';

const RadialchartContainer = styled.div`
    width: 28%;
    height:100%;
    display:flex;
    align-items: center;
    justify-content: center;
`;
/** 
 * @namespace Radialchart
 * @function Radialchart
 * @description Container of the RadialchartD3. It stylizes its svg container.
 * @returns {JSX.Element} */

function Radialchart() {
        const { datas } = useContext(datasContext);
    return (<RadialchartContainer>
        <svg id = "radialchartSvg" 
        width="100%"
        height="263px"
        viewBox="0 0 500 500"
        style = {{backgroundColor: '#FBFBFB', borderRadius: "5px"}}
    >  
        {datas && (
            <RadialchartD3 data={ datas?.userDatas} />
        )}
        <text width= "100px" x="40" y="60" fill="#000000" fontSize="30px">
    Score
</text>
       
    </svg></RadialchartContainer>)
}

export default Radialchart;