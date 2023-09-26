import calories from '../svg/energy.svg';
import protein from '../svg/chicken.svg';
import carbs from '../svg/apple.svg';
import fat from '../svg/cheeseburger.svg';
import { useContext } from 'react';
import { datasContext } from '../routes/GetRoutes';
function KeyDataItem({ icon, altText, value, label }) {
    return (
        <div>
            <img src={icon} alt={altText}/>
            <div>
                <p>
                    {value}
                </p>
                <p>{label}</p>
            </div>
        </div>
    );
}

function CardsInfos() {
    const { datas } = useContext(datasContext);
    console.log("22 keydata", datas?.userDatas?.keyData)
    const keyData = datas?.userDatas?.keyData;
    const dataItems = [
        { icon: calories, altText: 'calories', value: `${keyData.calorieCount} kCal`, label: 'Calories' },
        { icon: protein, altText: 'protein', value: `${keyData.proteinCount} g`, label: 'Protéines' },
        { icon: carbs, altText: 'apple', value: `${keyData.carbohydrateCount} g` , label: 'Glucides' },
        { icon: fat, altText: 'hamburger', value: `${keyData.lipidCount} g`, label: 'Lipides' },
    ];

    return (
        <>
            {dataItems.map((item, index) => (
                <KeyDataItem 
                    key={index} 
                    icon={item.icon} 
                    altText={item.altText} 
                    value={item.value} 
                    label={item.label} 
                />
            ))}
        </>
    );
}

export default CardsInfos;