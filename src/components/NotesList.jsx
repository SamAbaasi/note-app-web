import React from 'react'
import './NotesList.css'

export const NotesList = ({notes = [], selected, onSelect, newNote}) => {
    const addNote = () => {
        newNote()
    }
    return <div className="list">
        <div className="header">
            <h1>Notes</h1>
            <button id="new-note" className='btn btn-add' onClick={() => addNote()}>Add</button>
        </div>
        <div className='list-group'>
        {notes.map(note => {
            const active = (selected?.id === note?.id) ? `active` : ''
            return <div key={note.id} data-testid="note-item" className={`list-group-item ${active}`} onClick={() => onSelect(note)}>{note.title}</div>
        })}
        </div>
    </div>
}
