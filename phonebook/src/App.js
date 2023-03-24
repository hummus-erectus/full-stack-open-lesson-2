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

    const existingPerson = persons.find(p => p.name === newName)

    if (existingPerson){
      if (window.confirm(`${newName} already exists in phonebook. Replace the old number with a new one?`)){
        const updatedPerson = {...existingPerson, number: newNumber}

        personService
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson))
          })
      }
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