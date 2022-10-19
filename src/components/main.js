import { React, useState, useEffect } from 'react'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase.js'
import { CalendarHeader } from './CalendarHeader.jsx'
import Day from './Day'
import { NewEventModal } from './NewEventModal.jsx'
import { DeleteEventModal } from './DeleteEventModel.jsx'
import { AddingNewChild } from './AddingNewChild.jsx'
import { set, ref, getDatabase, getAuth } from 'firebase/database'
import { query, collection, onSnapshot, getFirestore, addDoc, getDocs, where } from 'firebase/firestore'
export default function () {
  const db = getDatabase()
  const db2 = getFirestore()

  const navigate = useNavigate()
  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigate('/')
    }).catch((err) => {
      alert(err.message)
    })
  }
  const [nav, setNav] = useState(0)
  const [dayDisplay, setDayDisplay] = useState('')
  const [click, setClick] = useState()
  const [days, setDays] = useState([])
  const [events, setEvents] = useState([]); // need to write data here as useEffect uses it 
  const [todos, setTodos] = useState([])
  


  const writeUserData2 = (title, note) => {
    const date = click.replace("/", "")
    const uid = date.replace("/", "")
    const reference = ref(db, `/${auth.currentUser.uid}/${uid}`)
    set(reference, {
      event: title,
      date: `${click}`,
      note: note,
      uid: uid
    })

  }
  const writeUserData = (title, note) => {

    const date = click.replace("/", "")
    const uid = date.replace("/", "")
    addDoc(collection(db2, 'todos'), {
      event: title,
      date: `${click}`,
      note: note,
      uid: uid
    })
  }
  console.log(days)
  const eventForDate = (date) => {
    var arr = []
    for(var i = 0; i< todos.length; i++){
      if(todos[i]?.date === date){
        return todos[i]
      }
    }
  }
  useEffect(() => {
    
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dt = new Date();

    if (nav !== 0) {
      dt.setMonth(new Date().getMonth() + nav);
    }
    const q = query(collection(db2, "todos"))
    const unsubscribe = onSnapshot(q, (querySnapshot) =>{
      let todosArr = []
      querySnapshot.forEach((doc) =>{
        todosArr.push(doc.data())
      })
      setTodos(todosArr)
    })

    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();

    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
      weekday: 'long',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });
    setDayDisplay(`${dt.toLocaleDateString('en-us', { month: 'long' })} ${year}`)
    const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

    const daysArray = []

    for (let i = 1; i <= paddingDays + daysInMonth; i++) {
      const dayString = `${month + 1}/${i - paddingDays}/${year}`;
      
      if (i > paddingDays) {
        daysArray.push({
          value: i - paddingDays,
          event: eventForDate(dayString),
          isCurrentDay: i - paddingDays === day && nav === 0,
          date: dayString,
        })
      } else {
        daysArray.push({
          value: 'padding',
          event: null,
          isCurrentDay: false,
          date: ''
        })
      }

    }
  
    setDays(daysArray)
    return () => unsubscribe()
  }, [nav])


  return (
    <div>

      <div id="container">
        <CalendarHeader dayDisplay={dayDisplay} onNext={() => setNav(nav + 1)} onBack={() => setNav(nav - 1)} onToday={() => setNav(0)} />

        <div id="weekdays">
          <div>Sunday</div>
          <div>Monday</div>
          <div>Tuesday</div>
          <div>Wednesday</div>
          <div>Thursday</div>
          <div>Friday</div>
          <div>Saturday</div>
        </div>
        <div id='calendar'>
          {days.map((day, index) => (
            <Day key={index}
              day={day}
              onClick={() => {
                if (day.value !== 'padding') {
                  setClick(day.date);
                }
              }}
            />
          ))}

        </div>
        <AddingNewChild></AddingNewChild>
      </div>
      {
        click && !eventForDate(click) &&
        <NewEventModal
          onClose={() => setClick(null)}
          onSave={(title, note) => {
            writeUserData(title, note)
            setClick(null);
          }}
        />
      }

      {
        click && eventForDate(click) &&
        <DeleteEventModal
          eventText={eventForDate(click).title}
          onClose={() => setClick(null)}
          onDelete={() => {
            setClick(null);
          }}
        />
      }

    </div>
  )
}
