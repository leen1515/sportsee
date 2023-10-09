import Styled from "styled-components";

const CircleContainer = Styled.div`
    width: 100%;
    height: 100%;
    background-color: #000000b7;
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
    border: 20px solid #FF0101;
    border-top-color: #000000;
    animation: spin 2s infinite linear;
    margin: auto;
    margin-top: 100px;
    left: 50px;
    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
`

const SelectMessage = Styled.p`
    position:fixed;
    top: 40%;
    left: 53%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    width: 80%;
`
;

/** 
 * @namespace Construction
 * @function Construction
 * @returns {JSX.Element} It renders a loading animation and a message
indicating that the page does not exist but could exist later (error 404). */
function Construction(){
    return (
        <>
        <CircleContainer>
            <Circle>
            </Circle>
        </CircleContainer>
        <SelectMessage>Erreur 404 : cette page n'existe pas encore</SelectMessage>
             </>
    );
}

export default Construction;