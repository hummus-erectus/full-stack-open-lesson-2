const CountryList = ({countries, showSelected}) => {
    return (
        countries.map((country) => (
            <div key={country.name.common}>
                <p>{country.name.common}
                    <button onClick={() => showSelected(country.name.common)}>show</button>
                </p>
            </div>
        ))
    )
}

export default CountryList