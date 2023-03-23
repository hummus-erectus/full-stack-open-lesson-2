const SearchFilter = ({ searchTerm, setSearchTerm }) => {
  return (
    <div>
      filter shown with: <input onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} />
    </div>
  )
}

export default SearchFilter