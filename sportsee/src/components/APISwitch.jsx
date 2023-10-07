import  { useContext } from "react";
import {datasContext} from "../routes/GetRoutes";
import styled from 'styled-components';

const StyledButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) ;
  background-color: black;
  color: white;
  border: 2px solid red;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: red;
    color: black;
  }
`;

function APISwitch() {
    const { api, toggleAPIMode } = useContext(datasContext);
  
    return (
      <StyledButton onClick={toggleAPIMode}>
        {api ? "Switch to Mocked Data" : "Switch to API Data"}
      </StyledButton>
    );
  }

  export default APISwitch;