import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const addNumber = (e) => {
    e.preventDefault()

    if (persons.some(person => person.name === newName)){
      alert(`${newName} already exists in phonebook`)
    } else{
      const personObject = {
        name: newName,
      }
      setPersons(persons.concat(personObject))
      setNewName('')
    }

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNumber}>
        <div>
          name: <input onChange={(e) => setNewName(e.target.value)} value={newName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => <p key={person.name}>{person.name}</p>)}
      <div>debug: {newName}</div>
    </div>
  )
}

export default App