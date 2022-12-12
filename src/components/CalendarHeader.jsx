import React from 'react'

export const CalendarHeader  = ({onNext, onBack, dayDisplay, onToday}) => {
    
    return (
        <div>
            <div id="header">
                <div id="monthDisplay">{dayDisplay}</div>
                <div id= "nameDisplay"> Hi, Ms.Bogdany </div>
                <div>
                    <button onClick={onBack} id="backButton">Back</button>
                    <button onClick={onToday} id="todayButton">Today</button>
                    <button onClick={onNext} id="nextButton">Next</button>
                   
                    
                </div>
            </div>
        </div>
    )
}
