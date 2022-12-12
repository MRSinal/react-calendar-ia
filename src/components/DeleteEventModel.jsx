import React from 'react'

export const DeleteEventModal = ({onDelete, eventText, onClose, eventNote, eventPerson}) => {
    return (
        <div>
            <div id="deleteEventModal">
                <h2>Event</h2>

                <p id="eventText">Title: {eventText}</p>
                <p id="noteText">Notes: {eventNote}</p>
                <p>Who: {eventPerson}</p>
                <button onClick={onDelete} id="deleteButton">Delete</button>
                <button onClick={onClose} id="closeButton">Close</button>
            </div>
            <div id="modalBackDrop"></div>
        </div>
    )
}