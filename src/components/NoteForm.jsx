import React, { useEffect, useState } from 'react'
import './NoteForm.css'

export const NoteForm = ({note, onSubmit, onCancel}) => {
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')

    useEffect(() => {
        setTitle(note?.title || '')
        setText(note?.text || '')
    }, [note,setTitle, setText])

    const onSave = (e) => {
        e.preventDefault()
        const updatedNote = {...note,title,text}
        onSubmit(updatedNote)
    }
    const refreshForm = () => {
        setTitle('')
        setText('')
        onCancel()
    }

    return <form className='note-form'>
        <div className="form-group">
            <input
                className="form-control"
                data-testid="input-title"
                placeholder='Title'
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
        </div>
        <div className="form-group">
            <textarea
                className="form-control text-area"
                data-testid="input-text"
                name="text"
                value={text}
                placeholder='Write your note here...'
                onChange={(e) => setText(e.target.value)}
            />
        </div>
        <div className="form-group">
            <input
                type="button"
                data-testid="cancel-note"
                className="btn btn-cancel"
                value="Cancel"
                onClick={() => refreshForm()}
            />
            <input
                type="submit"
                data-testid="save-note"
                className="btn btn-save"
                value="Save"
                disabled={note === null}
                onClick={(e) => onSave(e)}
            />
        </div>
    </form>
}
