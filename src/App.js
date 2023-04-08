import './App.css';
import React , { useState , useEffect } from "react"
// import  ReactDOM  from 'react-dom';
import axios from "axios"
import DateTimePicker from "react-datetime-picker";

function App() {

  const[reminderMsg , setReminderMsg] = useState("");
  const[remindAt , setRemindAt]= useState();
  // const[addReminder , setReminder] = useState();
  const[reminderList , setReminderList] = useState([])
   
  // Clock  
  let time = new Date().toLocaleTimeString();
  var today = new Date();
  var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' +today.getFullYear() ;  
  const[currentTime , updateTime] = useState(time);

  const UpdatedTime = () =>{
      time = new Date().toLocaleTimeString();
      updateTime(time);
   }
  setInterval(UpdatedTime, 1000);


  useEffect(()=>{ 
    axios.get("http://127.0.0.1:4000/getAllReminder").then( res =>{
      setReminderList(res.data) 
    })
  },[])

  const addReminder = () =>{
    axios.post("http://127.0.0.1:4000/addReminder",{reminderMsg , remindAt})
    .then(res=> setReminderList(res.data))
    setReminderMsg("")
    setRemindAt()
  }
 
  const deleteReminder = (id) =>{
      axios.post("http://127.0.0.1:4000/deleteReminder" , {id})
      .then(res => setReminderList(res.data))
  }

 

  return (
    <div className="App">
    <div className="cube"></div>
    <div className="cube"></div>
    <div className="cube"></div>
    <div className="cube"></div>
    <div className="cube"></div>
    <div className="cube"></div>
      <div className="homepage">
        <div className='clock'>
            <p>Current Time : {currentTime}  </p>
            <p>Current Date  : {date}</p>
        </div>
      <div className='homepage_header'>
        <h1>Remind Me 🙋‍♂️</h1>
        <input type="text" placeholder='Reminder notes here....' value={reminderMsg} onChange={e => setReminderMsg(e.target.value)} />
          <DateTimePicker 
            value={remindAt}
            onChange={setRemindAt}
            minDate={new Date()}
            minutePlaceholder="mm"
            hourPlaceholder="hh"
            dayPlaceholder="DD"
            monthPlaceholder="MM"
            yearPlaceholder="YYYY"
          />  
          <button className="button" onClick={addReminder}>Add Reminder</button>
      </div>

    <div className='homepage_body'>
      {
         reminderList.map( reminder =>(
      <div className='reminder_card' key={reminder.key}>
        <h2>{reminder.reminderMsg}</h2>
        <h3>Remind Me at:</h3>
        <p>{String(new Date(reminder.remindAt.toLocaleString(undefined, {timezone:"Asia/Kolkata"})))}</p>
        <div className='button'  onClick={() => deleteReminder(reminder._id)}>Delete</div>
      </div>

        ))
      }


    </div>
     </div> 
    </div>
  );
    }

export default App;
