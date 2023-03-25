const CountryData = ({country}) => {
    return (
        <>
            <h2>{country.name.common}</h2>
            <p>Capital: {country.capital[0]}</p>
            <p>Area: {country.area}sq km</p>
            <h3>Languages:</h3>
            <ul>
                {Object.entries(country.languages).map(([key,value]) =>
                    <li key={key}>{value}</li>
                )}
            </ul>
            <img src={country.flags.png} alt={country.flags.alt} />
        </>
    )
}

export default CountryData