import React, { useState } from 'react'
const APIKEY = '07dd6c90b6d93a01a549e93a750d61fa'

const Weather = () => {
  const [city, setCity] = useState('')
  const [result, setResult] = useState({})
  //const [temp, setTemp] = useState
  const getWeather = async (e) => {
    e.preventDefault()
    if (!city) {
      return
    }
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}`
    )
    const { main } = await res.json()
    setResult(main)
  }
  const convertKtoC = (tempInK) => {
    return tempInK - 273.15
  }
  return (
    <div>
      <form onSubmit={getWeather}>
        <div>
          <label>City</label>
          <input value={city} onChange={(e) => setCity(e.target.value)}></input>
        </div>
        <button type="submit">Get Weather</button>
      </form>
      {result && (
        <div>
          <p>Feels like: {convertKtoC(result.feels_like)}</p>
          <p>Humidity: {result.humidity}</p>
          <p>Pressure: {result.pressure}</p>
          <p>Temperature: {convertKtoC(result.temp)}</p>
          <p>High: {convertKtoC(result.temp_max)}</p>
          <p>Low: {convertKtoC(result.temp_min)}</p>
        </div>
      )}
    </div>
  )
}

export default Weather
