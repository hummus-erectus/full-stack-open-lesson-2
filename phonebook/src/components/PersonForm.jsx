const PersonForm = ({ newName, newNumber, setNewName, setNewNumber, addNumber }) => {
    return (
        <form onSubmit={addNumber}>
            <h2>Add new contact</h2>
            <div>
                name: <input onChange={(e) => setNewName(e.target.value)} value={newName} />
            </div>
            <div>
                number: <input onChange={(e) => setNewNumber(e.target.value)} value={newNumber} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm