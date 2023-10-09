import calories from '../svg/energy.svg';
import protein from '../svg/chicken.svg';
import carbs from '../svg/apple.svg';
import fat from '../svg/cheeseburger.svg';
import { useContext } from 'react';
import { datasContext } from '../routes/GetRoutes';
import styled from 'styled-components';

const CardsContainer = styled.div`
    position: relative;
    width: 28%;
    height:70vh;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    margin-right: 60px;
    margin-top: 0px;
`;

const Container = styled.div`
    background-color: #FBFBFB;
    width: 200px;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    padding: 40px 20px;
    height: fit-content;
`;

const InnerContainer = styled.div`
    width: 200px;
    height:30px;
    display: flex;
    flex-direction: row; 
    align-items: center;
`;

const ColumnContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center; 
    justify-content: center;
    height:20px;
`;

const DataImage = styled.img`
    width: 20px;   
    height: 100%;  
    padding: 10px 20px;
    border-radius: 10px;
    background-color: ${props => props.$bgcolor || 'transparent'};

`;

const ValueText = styled.p`
    padding: 0 10px;
    align-self: flex-start;

`; 
const LabelText = styled.p`
    font-size: 12px;
    padding: 0 10px;
    margin-top: -10px;
    color:#0000008c;
    align-self: flex-start;
`;

/** @memberOf Profil
/** @function KeyDataItem
 * It renders a structure with icon, value, and
 * label, used in a loop to this file's final container.
 * @param {String} icon defines the icon to be displayed in the container. 
 * @param {String} altText defines the alt text for the icon.
 * @param {Number} value with datas from the API, defines the value to be displayed in the container.
 * @param {String} label defines the label to be displayed in the container.
 * @param {String} color defines the background color of the icone's container.
 * @returns {JSX.Element}
 */

function KeyDataItem({ icon, altText, value, label, color }) {
    return (
        <Container>
            <InnerContainer>
                <DataImage $bgcolor={color} src={icon} alt={altText} />
                <ColumnContainer>
                    <ValueText>{value}</ValueText>
                    <LabelText>{label}</LabelText>
                </ColumnContainer>

            </InnerContainer>
        </Container>
    );
}

/** 
 * @namespace CardsInfos
 * @function CardsInfos
 * @description function renders a set of cards displaying key data value, such as calories,
 * protein, carbs, and fat to user.
 * @returns {JSX.Element} it is returning a container element called "CardsContainer"
 * that contains multiple instances of the "KeyDataItem" component. Each instance of the "KeyDataItem"
 * component has props such as "icon", "altText", "value", "label", and "color" that are passed in from
 * the "dataItems" array.*/

function CardsInfos() {
    const { datas } = useContext(datasContext);
    const keyData = datas?.userDatas?.keyData;
    const dataItems = [
        { icon: calories, altText: 'calories', value: `${keyData.calorieCount} kCal`, label: 'Calories', color: '#ff000040' },
        { icon: protein, altText: 'protein', value: `${keyData.proteinCount} g`, label: 'Protéines' ,  color: '#4ab7ff40'},
        { icon: carbs, altText: 'apple', value: `${keyData.carbohydrateCount} g` , label: 'Glucides',  color: '#FDCC0C40' },
        { icon: fat, altText: 'hamburger', value: `${keyData.lipidCount} g`, label: 'Lipides',  color: '#FD518140' },
    ];

    return (
        <CardsContainer>
            {dataItems.map((item, index) => (
                <KeyDataItem 
                    key={index} 
                    icon={item.icon} 
                    altText={item.altText} 
                    value={item.value} 
                    label={item.label} 
                    color={item.color}
                />
            ))}
        </CardsContainer>
    );
}

export default CardsInfos;