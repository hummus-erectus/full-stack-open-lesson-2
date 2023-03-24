import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
import PersonForm from './components/PersonForm'
import SearchFilter from './components/SearchFilter'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
      personService
        .getAll()
        .then(initialPersons => {
          setPersons(initialPersons)
        })
  }, [])


  const addNumber = e => {
    e.preventDefault()

    if (persons.some(person => person.name === newName)){
      alert(`${newName} already exists in phonebook`)
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      }

      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const deleteNumber = id => {
    // const person = persons.find(p => p.id === id)
    personService
      .deleteObj(id)
      .then(response => {
        setPersons(persons.filter(person => person.id !== id))
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        addNumber={addNumber}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        deleteNumber={deleteNumber}
        searchTerm={searchTerm}
      />
      <div>debug: {newName}</div>
    </div>
  )
}

export default App