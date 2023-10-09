import APISwitch from "../../components/APISwitch";
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from "react";
import { datasContext } from "../../routes/GetRoutes";

const MainHome = styled.main`
  position: fixed;
  margin:auto;
  top:30%;
  left:calc(50% + 50px);
  transform: translate(-50%, -50%);
  z-index: 20;
`;
const UserChoice = styled.div`
  position: relative;
  margin:auto;
  top:200px;
  width: 200px;
  background-color: black;
  color: white;
  border: 2px solid red;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease-in-out;
  margin-top: 10px;
  text-align: center;

  &:hover {
    background-color: #FF0101;
    color: black;
  }
`;

const ModeDatas = styled.div`
 position: relative;
  margin:auto;
  width: 400px;
  height:50px;
  background-color: #FF0101;
  color: white;
  border: 2px solid red;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease-in-out;
  text-align: center;
  & p{
    margin-top: 10px;
    font-size: 13px;
  }`;


/** 
 * @namespace Home
 * @function Home
 * @description The `Home` function is a React component, it page role in the application. 
 * it call the switch API/mock component, and display the error message if there is one.
 * it handlers also the user choice to navigate to a specific profile page.
 * @param {string} errormessage  The error message to display. 
 * @returns {JSX.Element} 
 * */

function Home({ messageError }) {
  
  const { api, choiceId } = useContext(datasContext);
  const navigate  = useNavigate();

  /** 
   * @namespace HandleUserChoice 
   * @function handleUserChoice
   * @description `handleUserChoice` takes an `id` parameter, calls the `choiceId` function with the
   * `id`, and navigates to a specific profile page using the `navigate` function.
   * @param {Number} id The id of the user to navigate to.
   * */
  const handleUserChoice = (id) => {
    if(!id) return;
      choiceId(id);
      navigate(`/profil/${id}`);
    }
      const [ error, setError ]= useState(messageError);

      useEffect(() => {
        setError(messageError)
        },[messageError]
        )
  return (
      <MainHome>
          <ModeDatas>
              {api ? "Les données proviennent de l'API" : "Les données proviennent du Mock"}
              {error?(<p>{error}</p>) : <p>il n'y a pas d'erreur sur la page</p>}
          </ModeDatas>
          <APISwitch />
            <UserChoice onClick={() => handleUserChoice(18)}>User 18</UserChoice>
            <UserChoice onClick={() => handleUserChoice(12)}>User 12</UserChoice>
      </MainHome>
  );
}



export default Home;