import Styled from "styled-components";

const CircleContainer = Styled.div`
    width: 100%;
    height: 100%;
    background-color: #00000039;
    position:fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`
const Circle = Styled.div`
    position: relative;
    width: 500px;
    height: 500px;
    border-radius: 50%;
    border: 3px solid #FF0101;
    border-top-color: #000000;
    animation: spin 2s infinite linear;
    margin: auto;
    margin-top: 100px;
    left: 100px;
    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
`;
function Loading(){
    return (
        <CircleContainer>
            <Circle>
                <p>...</p>
            </Circle>
        </CircleContainer>
    );
}

export default Loading;