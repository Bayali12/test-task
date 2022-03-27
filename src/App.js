import React from 'react';
import axios from "axios";
import Currency from './components/Currency'
import './App.css';


function App() {
  const [items, setItems] = React.useState([]);
  const [prevDate, setPrevDate] = React.useState();


  React.useEffect(() => {
    async function fetchData() {
      try {
        const itemsResponse = await axios.get('https://www.cbr-xml-daily.ru/daily_json.js');
        setPrevDate(itemsResponse.data.PreviousDate);
        setItems(Object.values(itemsResponse.data.Valute));
      } catch (error) {
        alert(error.message)
      }
    }
    fetchData();
  }, [])



  const getFormatDate = (dt) => {
    let date = new Date(dt);
    return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getDate()}`
  }

  const onClickСurrency = async (charCode) => {
    let previousDate = prevDate;
    const prevItems = [];
    for (let i = 0; i < 9; i++) {
      try {
        await axios.get(`https://www.cbr-xml-daily.ru/archive/${getFormatDate(previousDate)}/daily_json.js`).then((response) => {
          response.data.Valute[charCode].Date = previousDate;
          prevItems.push(response.data.Valute[charCode]);
          previousDate = response.data.PreviousDate;
        });
      }
      catch (e) {
        console.log(e.message);
      }
    }
    return prevItems;
  }





  const renderItems = () => {
    return (items.map((item, index) => (
      <li className="currencyLi" key={index}>
        <Currency
          charCode={item.CharCode}
          Name={item.Name}
          currencyValue={item.Value}
          difference={(item.Value - item.Previous * 100 / 100).toFixed(2)}
          onClickСurrency={onClickСurrency}
        />
      </li>
    )))
  }





  return (
    <div className="App">
      <header className="App-header">
        <h1>Курсы валют ЦБ РФ на {new Date().toLocaleDateString()}</h1>
      </header>
      <ul className="currencies">
        <li className="titleLi">
          <Currency
            charCode="Букв.код"
            currencyValue="Валюта"
            difference="Изменение в"
          />
        </li>
        {
          renderItems()
        }
      </ul>
    </div>
  );
}

export default App;
