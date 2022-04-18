import React, { useState, useEffect } from "react";

function App() {
 //Using state Hooks
  const [city, setCity] = useState("Vancouver");
  const [data, setData] = useState({});

  

  let uploaded = true
  //Search
  useEffect(()=>{
    const searching  = async () => {
      //API conection
      const url = await fetch (`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9deb3cccedf15a1276b9a6818a5d3718&units=metric`);
      if (uploaded){
        setData(await url.json());
        console.log(data)
      }
      return () => {
        uploaded = false;
      }
    }
      searching();
  }, [city]);

    const sub = (e) => {
      e.preventDefault();
      setCity("")

      
    }
 
  return (
    <div className="app">
      <div className="wrapper">
        <form onSubmit={sub} className="search">
          <input 
          type="text" 
          placeholder="City name, ex:Vancouver"
          required
          name="searchCity"
          value={city}
          onChange={(event) => setCity(event.target.value)}
          />

          <button type="button" onClick={sub}>Reset</button>
        </form>
        <div className="info">
          <div className="location">
            <p>{data.name} </p>
          </div>
          <div className="temp1">
          {data.main ? <h1>{data.main.temp.toFixed()}°C <i className="bi bi-cloud-sun-fill"></i></h1> : null}
            
          </div>
        </div>
        <div className="weather">
          <div className="feels topic">
            {data.main ? <h3>{data.main.feels_like}°C</h3> : null}
            <p>Feels Like <i className="bi bi-person-fill"></i></p>
            
          </div>
          <div className="humidity topic">
            {data.main ? <h3>{data.main.humidity}%</h3> : null}
            <p>Humidity <i className="bi bi-moisture"></i></p>
          </div>
          <div className="speed topic">
          {data.main ? <h3>{data.wind.speed}m/s</h3> : null}
            <p>Wind Speed <i className="bi bi-wind"></i> </p>
            
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
