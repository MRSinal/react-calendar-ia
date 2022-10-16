import React,{useState} from 'react'

export const NewEventModal = ({onSave, onClose}) => {
    const [title, setTitle] = useState('')
    const [note, setNote] = useState('')
    const [error, setError] = useState(false) // React Hook

    return (
        <div>
            <div id="newEventModal">
                <h2>New Event</h2>

                <input className={error ? 'error': ''} value={title}  onChange={e => setTitle(e.target.value)} id="eventTitleInput" placeholder="Event Title" />
                <input className={error ? 'error': ''} value={note}  onChange={e => setNote(e.target.value)}   id="eventTitleInput" placeholder="Notes" />
                <p className={error ? 'error' : ''} id="inputError" > You have to fill out the form </p>
                <button onClick={() => {
                    if(title){
                        setError(false)
                        onSave(title, note)
                    }else{
                        setError(true)
                    }
                }} id="saveButton">Save</button>

                <button onClick={onClose} id="cancelButton">Cancel</button>
                
            </div>
            <div id="modalBackDrop"></div>
        </div>
    )
}