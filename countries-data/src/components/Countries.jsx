const Countries = ({ countries, searchTerm }) => {
    return (
        <>
            {countries
                .filter((country) => country.name.common.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((country) => (
                    <p key={country.name.common}>{country}</p>
                ))
            }
        </>
    )
}

export default Countries