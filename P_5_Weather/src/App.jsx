import { useEffect, useState } from "react";

const KEY = "ce9e987f-vishwajeetkumar-9cefbf26c"

export default function App() {
  const [data, setData] = useState({});
  const [city, setCity] = useState("mairwa");


  function getWeather(city){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${KEY}`)
    .then(resp=>resp.json())
    .then(setData)
  }
  
  useEffect(()=>{
    getWeather(city);
  },[])

  return (
    <>
      <input 
        className="border"
        type="text"  
        value={city} 
        onChange={(e)=>setCity(e.target.value)}
      />
      <button onClick={()=>getWeather(city)}>Get</button>

      <h1>Weather</h1>
      <p>Temp : {toCelcius(data.main?.temp)}</p>
      <p>Feels Like : {toCelcius(data.main?.feels_like)}</p>
    </>
  );
}

function toCelcius(kel){
  return (kel - 273.15).toFixed(2);
}
