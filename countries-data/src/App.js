import { useState, useEffect } from "react"
import SearchFilter from "./components/SearchFilter"
import countryService from './services/countries'
import CountryData from "./components/CountryData"

const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    countryService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
  }, [])

  const displayedCountries = countries.filter((country) => country.name.common.toLowerCase().includes(searchTerm.toLowerCase()))

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
          displayedCountries.map((country) => (
                <p key={country.name.common}>{country.name.common}</p>
            ))
        :
          (displayedCountries.length === 1?
            <CountryData country={displayedCountries[0]}/>
          :
            <p>No results found</p>
          )
        )
      }
    </div>
  )
}

export default App
