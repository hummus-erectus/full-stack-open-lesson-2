const CountryData = ({country, weather}) => {
    return (
        weather &&(
        <>
            <h1>{country.name.common}</h1>
            <p>Capital: {country.capital[0]}</p>
            <p>Area: {country.area}sq km</p>
            <h3>Languages:</h3>
            <ul>
                {Object.entries(country.languages).map(([key,value]) =>
                    <li key={key}>{value}</li>
                )}
            </ul>
            <img src={country.flags.png} alt={country.flags.alt} />
            <h2>Current Weather in {country.capital}</h2>
            <p>Temperature: {weather.main.temp} Celsius</p>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/>
            <p>Wind: {weather.wind.speed} m/s</p>
        </>

        )
    )
}

export default CountryData