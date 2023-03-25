import { useState, useEffect } from "react"
import SearchFilter from "./components/SearchFilter"
import countryService from './services/countries'
import weatherService from './services/weather'
import CountryData from "./components/CountryData"
import CountryList from "./components/CountryList"

const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [countries, setCountries] = useState([])
  const [weatherData, setWeatherData] = useState('')

  useEffect(() => {
    countryService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
  }, [])

  const displayedCountries = countries.filter((country) => country.name.common.toLowerCase().includes(searchTerm.toLowerCase()))

  useEffect(() =>{
    if(displayedCountries.length === 1){
      weatherService
        .getWeather(displayedCountries[0].capital)
        .then(returnedWeather => {
          setWeatherData(returnedWeather)
        })
    }
  }, [displayedCountries])


  const showSelected = (country) => {
    setSearchTerm(country)
  }

  return (
    <div>
      <SearchFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      {displayedCountries.length>10?
        <p>Too many matches, please specify another filter</p>
      :
        (displayedCountries.length >1 ?
          <CountryList countries={displayedCountries} showSelected={showSelected}/>
        :
          (displayedCountries.length === 1?
            <CountryData country={displayedCountries[0]} weather={weatherData}/>
          :
            <p>No results found</p>
          )
        )
      }
    </div>
  )
}

export default App
