import Styled from "styled-components";
import { datasContext } from "../routes/GetRoutes";
import { useContext, useEffect, useState } from 'react';

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
    font-size: 30px;
    font-weight: bold;
    text-align: center;
    width: 80%;
`
;

/** 
 * @namespace Loading
 * @function Loading
 * @description The Loading component displays a loading animation and the selected user's ID.
 * @returns {JSX.Element}
 */
function Loading({messageError}){
const { idUserSelected } = useContext(datasContext);
const [ error, setError ]= useState(messageError);
useEffect(() => {
setError(messageError)
},[messageError, error]
)
    return (
        <>
        <CircleContainer>
            <Circle>
            </Circle>
        </CircleContainer>
        <SelectMessage>{!error&& "selection Utilisateur : " +idUserSelected}</SelectMessage>
            </>
    );
}

export default Loading;
