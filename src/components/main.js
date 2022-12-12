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
import { query, collection, onSnapshot, getFirestore, addDoc, deleteDoc} from 'firebase/firestore'
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
  const [events, setEvents] = useState(localStorage.getItem('events') ? 
  JSON.parse(localStorage.getItem('events')) : 
  []);
  const [todos, setTodos] = useState([])
  



  const writeUserData = (title, note, person) => {

    const date = click.replace("/", "")
    const uid = date.replace("/", "")
    addDoc(collection(db2, 'todos'), {
      event: title,
      date: `${click}`,
      note: note,
      uid: uid,
      person: person
    })
  }
  const deleteUserData = () =>{
    deleteDoc(collection(db2, 'todos'))
  }
  const eventForDate2 = (date) => {
    
    for(var i = 0; i< todos.length; i++){
      if(todos[i]?.date === date){
        events.push(todos[i])
        return todos[i]
        
      }
    }
  }
  const eventForDate = date => events.find(e => e.date === date)
  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
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
  }, [nav, events])

  const [serviceList, setServiceList] = useState([{ service: "" }]);

  const handleServiceChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...serviceList];
    list[index][name] = value;
    setServiceList(list);
  };

  const handleServiceRemove = (index) => {
    const list = [...serviceList];
    list.splice(index, 1);
    setServiceList(list);
  };

  const handleServiceAdd = () => {
    setServiceList([...serviceList, { service: "" }]);
  };
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
        
      </div>
      {
        click && !eventForDate(click) &&
        <NewEventModal
          onClose={() => setClick(null)}
          personName1={serviceList[0]}
          personName2={serviceList[1]}
          onSave={(title, note, person) => {
            setEvents([ ...events, {title, date: click, note, person}]); 
            writeUserData(title, note, person)
            setClick(null);
          }}
        />
      }

      {
        click && eventForDate(click) &&
        <DeleteEventModal
          eventText={eventForDate(click).title}
          eventNote = {eventForDate(click).note}
          eventPerson = {eventForDate(click).person}
          onClose={() => setClick(null)}
          onDelete={() => {
            setEvents(events.filter(e => e.date !== click))
            deleteDoc()
            setClick(null);
          }}
        />
      }
      <form className="App" autoComplete="off">
      <div className="form-field">
        <label htmlFor="service">People</label>
        {serviceList.map((singleService, index) => (
          <div key={index} className="services">
            <div className="first-division">
              <input
                name="service"
                type="text"
                id="service"
                value={singleService.service}
                onChange={(e) => handleServiceChange(e, index)}
                required
              />
              {serviceList.length - 1 === index && serviceList.length < 2 && (
                <button
                  type="button"
                  onClick={handleServiceAdd}
                  className="add-btn"
                >
                  <span>Add a Person</span>
                </button>
              )}
            </div>
            <div className="second-division">
              {serviceList.length !== 1 && (
                <button
                  type="button"
                  onClick={() => handleServiceRemove(index)}
                  className="remove-btn"
                >
                  <span>Remove</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      
    </form>
    </div>
  )
}
