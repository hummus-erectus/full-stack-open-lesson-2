import Person from "./Person"

const Persons = ({ persons, searchTerm }) => {
    return (
        <>
            {persons
                .filter((person) => person.name.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((person) => (
                    <Person key={person.name} person={person} />
                ))
            }
        </>
    )
}

export default Persons