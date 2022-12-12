import React,{useState, useEffect} from 'react'

export const NewEventModal = ({onSave, onClose, personName1, personName2}) => {
    const [title, setTitle] = useState('')
    const [note, setNote] = useState('')
    const [person1, setPerson1] = useState(false)
    const [person2, setPerson2] = useState(false)
    const [error, setError] = useState(false) // React Hook
    const [person, setPerson] = useState('')
    useEffect(() =>{
        if(person1){
            setPerson(personName1.service)
        }
        else if(person2){
            setPerson(personName2.service)
        }
    }, [person1, person2])

    return (
        <div>
            <div id="newEventModal">
                <h2>New Event</h2>

                <input className={error ? 'error': ''} value={title}  onChange={e => setTitle(e.target.value)} id="eventTitleInput" placeholder="Event Title" />
                <input className={error ? 'error': ''} value={note}  onChange={e => setNote(e.target.value)}   id="eventTitleInput" placeholder="Notes" />
                <label hmtlFor='myCheckBoxId' id='checkBox'>
                    <input id='myCheckBoxId' type='checkbox' value={person1} onChange={() => setPerson1(true)}></input>
                    {personName1.service}
                </label>
                <label hmtlFor='myCheckBoxId2' id='checkBox'>
                    <input id='myCheckBoxId2' type='checkbox' value={person2} onChange={()=> setPerson2(true)}></input>
                    {personName2.service}
                </label>
                <p className={error ? 'error' : ''} id="inputError" > You have to fill out the form </p>
                <button onClick={() => {
                    if(title){
                        setError(false)
                        onSave(title, note, person)
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