import RadialchartD3 from './d3/RadialchartD3';
import { useContext } from 'react';
import { datasContext } from '../routes/GetRoutes';
import styled from 'styled-components';

const RadialchartContainer = styled.div`
    width: 30%;
    height:100%;
    display:flex;
    align-items: center;
    justify-content: center;
`;

function Radialchart() {
        const { datas } = useContext(datasContext);
    return (<RadialchartContainer>
        <svg id = "radialchartSvg" 
        width="80%"
        height="263px"
        viewBox="0 0 500 500"
        style = {{backgroundColor: '#FBFBFB', borderRadius: "8px"}}
    >  <text width= "100px" x="32" y="100" fill="#ffffff87" fontSize="30px">
    Score
</text>
        {datas && (
            <RadialchartD3 data={ datas?.userDatas} />
        )}
       
    </svg></RadialchartContainer>)
}

export default Radialchart;