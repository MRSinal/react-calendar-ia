import React from 'react'

export const CalendarHeader  = ({onNext, onBack, dayDisplay, onToday, nameDisplay}) => {
    nameDisplay = nameDisplay.replace("@gmail.com", "")
    return (
        <div>
            <div id="header">
                <div id="monthDisplay">{dayDisplay}</div>
                <div id= "nameDisplay"> Hi, {nameDisplay}</div>
                <div>
                    <button onClick={onBack} id="backButton">Back</button>
                    <button onClick={onToday} id="todayButton">Today</button>
                    <button onClick={onNext} id="nextButton">Next</button>
                   
                    
                </div>
            </div>
        </div>
    )
}
