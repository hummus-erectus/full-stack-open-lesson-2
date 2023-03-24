const Person = ({ person, deleteNumber }) => {
    return (
        <p key={person.name}>
            {person.name} {person.number}
            <button onClick={() => deleteNumber(person.id)}>Delete</button>
        </p>
    )
}

export default Person