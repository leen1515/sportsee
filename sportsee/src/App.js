import GetRoutes from './routes/GetRoutes';
import HeaderComponents from './components/header/Header';
import GlobalStyle from './style/utils';

/** 
 * @namespace App
 * @function App
 * @description principal component of the application sportsee, there is the header and the routes called
*/
function App() {
  return <>  <GlobalStyle/>
  <HeaderComponents></HeaderComponents><GetRoutes/>
  </>
}

export default App;
