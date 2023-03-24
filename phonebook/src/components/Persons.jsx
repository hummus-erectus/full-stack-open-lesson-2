import Person from "./Person"

const Persons = ({ persons, searchTerm, deleteNumber }) => {
    return (
        <>
            {persons
                .filter((person) => person.name.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((person) => (
                    <Person key={person.name} deleteNumber={deleteNumber} person={person} />
                ))
            }
        </>
    )
}

export default Persons