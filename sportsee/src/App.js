import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [userDatas, setUserDatas] = useState([]);
  const [isDataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchDatas () {
      try {
        const response = await fetch('http://localhost:3000/datas/datasMocked.json');
        const datasJson = await response.json();
        setUserDatas(datasJson);
      } catch (err) {
        console.log(err);
        setError(true);
      } finally {
        setDataLoading(false);
      }
    }
    fetchDatas();
  }, []);
  console.log(isDataLoading, error);

  return (
    <div className="App">{JSON.stringify(userDatas)}
    </div>
  );
}

export default App;
