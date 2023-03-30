import { useState, useEffect } from 'react'
import personService from './services/persons'
import PersonForm from './components/PersonForm'
import SearchFilter from './components/SearchFilter'
import Persons from './components/Persons'
import { Notification } from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [feedbackMessage, setFeedbackMessage] = useState(null)

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
            setNewName('')
            setNewNumber('')
            setFeedbackMessage({
              message: `Updated ${updatedPerson.name}'s phone number`,
              type: 'success'
            })
            setTimeout(() => {
              setFeedbackMessage(null)
            }, 5000)
          })
          .catch(error => {
            setPersons(persons.filter(person => person.name !== updatedPerson.name))
            setNewName('')
            setNewNumber('')
            setFeedbackMessage({
              message: `${updatedPerson.name}'s information has already been removed from the server`,
              type: 'error'
            })
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
          setFeedbackMessage({
            message: `Added ${returnedPerson.name} to phonebook`,
            type: 'success'
          })
          setTimeout(() => {
            setFeedbackMessage(null)
          }, 5000)
        })
        .catch (error => {
          setFeedbackMessage({
            message: error.response.data.error,
            type: 'error'
          })
          setTimeout(() => {
            setFeedbackMessage(null)
          }, 5000)
        })
    }
  }

  const deleteNumber = id => {
    personService
      .deleteObj(id)
      .then(response => {
        setPersons(persons.filter(person => person.id !== id))
      })
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification feedbackMessage={feedbackMessage} />
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