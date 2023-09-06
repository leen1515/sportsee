import './App.css';
import { formData } from './services/formData';

function App() {

console.log(formData().stMainData);
  return (
    <div className="App">{formData().stMainData}
    </div>
  );
}

export default App;
