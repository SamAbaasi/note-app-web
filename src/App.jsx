import React, { useEffect, useState } from 'react'
import './App.css'

import { NotesList } from './components/NotesList'
import { NoteForm } from './components/NoteForm'

const App = (props) => {
    const { service } = props

    const [notes, setNotes] = useState([])
    const [selected, setSelected] = useState(null)
    const [newNoteAdded, setNewNoteAdded] = useState(false)
    // (!) Get notes from service
    useEffect(() => {
        fetchNotes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newNoteAdded])

    const fetchNotes = async() => {
        const notes = await service.getNotes()
        setNotes(notes)
        if(newNoteAdded) {
            setSelected(notes[notes.length - 1])
        }
        return notes
    }
    // Select new empty note
    async function newNote(){
        const newNote = {id:'', title: 'New Note', text:''}
        await onSubmit(newNote)
        setNewNoteAdded(true)
    }

    // Set note as selected
    function onSelect(note){
        setSelected(note)
        setNewNoteAdded(false)
    }

    // Save note to service
    async function onSubmit(note){
        await service.saveNote(note)
        fetchNotes()
    }

    // Unselect note
    function onCancel(){
        setSelected(null)
    }
    return (
        <div className="App">
            <NotesList notes={notes} selected={selected} onSelect={onSelect} newNote={newNote} setNewNoteAdded={setNewNoteAdded}/>
            <NoteForm note={selected} onSubmit={onSubmit} onCancel={onCancel}/>
        </div>
    )
}
export default App;