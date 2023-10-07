import APISwitch from "../../components/APISwitch";
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useContext } from "react";
import { datasContext } from "../../routes/GetRoutes";

const MainHome = styled.main`
  position: fixed;
  margin:auto;
  top:30%;
  left:calc(50% + 100px);
  transform: translate(-50%, -50%);
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

function Home({ messageError }) {
   const { api } = useContext(datasContext);
    return (
      <MainHome>
        <ModeDatas>
          {api? "Les données proviennent de l'API" : "Les données proviennent du Mock"}
          {messageError? <p>`Erreur : ${messageError}`</p>: <p>il n'y a pas d'erreur sur la page</p>}
        </ModeDatas>
        <APISwitch />
        <Link to="/profil/18">
          <UserChoice>User 18</UserChoice>
        </Link>
        <Link to="/profil/12">
          <UserChoice>User 12</UserChoice>
        </Link>
      </MainHome>
    );
  }


export default Home;