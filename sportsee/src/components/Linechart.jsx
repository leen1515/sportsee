import LinechartD3 from './d3/LinechartD3';
import { useContext } from 'react';
import { datasContext } from '../routes/GetRoutes';
import styled from 'styled-components';

const LinechartContainer = styled.div`
    width: 20%;
`;


function Linechart() {
        const { datas } = useContext(datasContext);
    return (
        <LinechartContainer>
            <svg id = "linechartSvg" 
                width="100%"
                height="263px"
                viewBox="0 0 500 500"
                style={{ backgroundColor: '#FF0000', borderRadius: "8px"}}
            >
                {datas && (
                    <LinechartD3 data={ datas?.averageDatas?.sessions } />
                )}
                <text x="32" y="100" fill="#ffffff87" fontSize="30px">
                    Durée moyenne des
                </text>
                <text x="32" y="140" fill="#ffffff87" fontSize="30px">
                    sessions
                </text>
            </svg>
        </LinechartContainer>
    );
}


export default Linechart;