import LinechartD3 from './d3/LinechartD3';
import { useContext } from 'react';
import { datasContext } from '../routes/GetRoutes';
import styled from 'styled-components';

const LinechartContainer = styled.div`
    width: 30%;
`;


function Linechart() {
    const { datas } = useContext(datasContext);

    return (
        <LinechartContainer>
            <svg id="linechartSvg"
                width="100%"
                height="263px"
                viewBox="0 0 500 500"
            >
                <defs>
                    <linearGradient id="redToBlackGradient" x1="0%" y1="0%" x2="80%" y2="0%">
                        <stop offset="80%" style={{ stopColor: "#FF0000", stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: "#c80101", stopOpacity: 1 }} />
                    </linearGradient>
                </defs>
                <rect width="100%" height="100%" fill="url(#redToBlackGradient)" rx="8" ry="8" />

                {datas && (
                    <LinechartD3 data={datas?.averageDatas?.sessions} />
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