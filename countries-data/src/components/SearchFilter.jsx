const SearchFilter = ({ searchTerm, setSearchTerm }) => {
    return (
      <div>
        Find countries: <input onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} />
      </div>
    )
  }

  export default SearchFilter