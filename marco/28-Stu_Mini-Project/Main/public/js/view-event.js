// Globla Variable

let nav = 0
let clicked = null

let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : []


// Modal Variable:
const newEvent = document.getElementById('newEventModal')
const deleteEventModal = document.getElementById('deleteEventModal')
const backDrop = document.getElementById('modalBackDrop')
const eventTitleInput = document.getElementById('eventTitleInput')
// --------
const calendar = document.getElementById('calendar') // div calendar:
const weekdays = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] //array with weekdays:

//functions


// import mysql from 'mysql2'

// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "password",
//   database: "event_db"
// });

// con.connect(function(err) {
//   if (err) throw err;
//   //Select all customers and return the result object:
//   con.query("SELECT * FROM event", function (err, result, fields) {
//     if (err) throw err;
//     console.log(result);
//   });
// });

              




function openModal(date){
  clicked = date
  const eventDay = events.find((event)=>event.date === clicked)
 

  if (eventDay){
    document.getElementById('eventText').innerText = eventDay.title
    deleteEventModal.style.display = 'block'


  } else{
    newEvent.style.display = 'block'

  }

  //BackDropModal.style.display = 'block'
}

//function load() will be called when the page is loaded:


function load (){ 
  const date = new Date() 
  

  //change month title:
  if(nav !== 0){
    date.setMonth(new Date().getMonth() + nav) 
  }
  
  const day = date.getDate()
  const month = date.getMonth()
  const year = date.getFullYear()

  
  
  const daysMonth = new Date (year, month + 1 , 0).getDate()
  const firstDayMonth = new Date (year, month, 1)
  

  const dateString = firstDayMonth.toLocaleDateString('en-us', {
    weekday: 'long',
    year:    'numeric',
    month:   'numeric',
    day:     'numeric',
  })
  

  const paddinDays = weekdays.indexOf(dateString.split(', ') [0])
  
  //show month and year:
  document.getElementById('monthDisplay').innerText = `${date.toLocaleDateString('en-us',{month: 'long'})}, ${year}`

  
  calendar.innerHTML =''

  // creating a div with the days:

  for (let i = 1; i <= paddinDays + daysMonth; i++) {
    const dayS = document.createElement('div')
    dayS.classList.add('day')

    const dayString = `${month + 1}/${i - paddinDays}/${year}`

    //conditional to create days and month:
     
    if (i > paddinDays) {
      dayS.innerText = i - paddinDays
      

      const eventDay = events.find(event=>event.date === dayString)
      
      if(i - paddinDays === day && nav === 0){
        dayS.id = 'currentDay'
      }


      if(eventDay){
        const eventDiv = document.createElement('div')
        eventDiv.classList.add('event')
        eventDiv.innerText = eventDay.title
        dayS.appendChild(eventDiv)

      }

      dayS.addEventListener('click', ()=> openModal(dayString))

    } else {
      dayS.classList.add('padding')
    }

    
    calendar.appendChild(dayS)
  }

}

function closeModal(){

  eventTitleInput.classList.remove('error')

  newEvent.style.display = 'none'

 // backDrop.style.display = 'none'


  deleteEventModal.style.display = 'none'


  eventTitleInput.value = ''


  clicked = null
  load()


}
function saveEvent(){
  if(eventTitleInput.value){
    eventTitleInput.classList.remove('error')

    events.push({
      date: clicked,
      title: eventTitleInput.value
    })

    localStorage.setItem('events', JSON.stringify(events))
    closeModal()

  }else{
    eventTitleInput.classList.add('error')
  }
}

function deleteEvent(){

  events = events.filter(event => event.date !== clicked)
  localStorage.setItem('events', JSON.stringify(events))
  closeModal()
}

// buttons

// buttons

function buttons (){
  document.getElementById('backButton').addEventListener('click', ()=>{
    nav--
    load()
    
  })

  document.getElementById('nextButton').addEventListener('click',()=>{
    nav++
    load()
    
  })

  document.getElementById('saveButton').addEventListener('click',()=> saveEvent())

  document.getElementById('cancelButton').addEventListener('click',()=>closeModal())

  document.getElementById('deleteButton').addEventListener('click', ()=>deleteEvent())

  document.getElementById('closeButton').addEventListener('click', ()=>closeModal())
  
}


load()

buttons()
