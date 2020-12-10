import Callendar from "@metko/meeting-calendar"
import {getEvents, bookEvents} from "./queries"
import"./app.scss";

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

// ***************************************  
// print the info of the selected date on the header of the events
// ***************************************
const printDateEvent = (date) => {
    var dayEvent = document.querySelector('#events .selected-day')
    dayEvent.innerHTML = date.day + " "+ date.d + " " + date.month + " " + date.year
}
// ***************************************



// ***************************************
// Fill the block event with the date and time value
// ***************************************
const fillBlockEvent = (event) => {
    
    var start  = new Date(event.start)
    var startH = start.getMinutes()
    if( startH === 0) {
        startH = '00'
    }
    start = (start.getHours() - 1) +"-"+startH

    var end  = new Date(event.end)
    var endH = end.getMinutes()

    if( endH === 0) {
        endH = '00'
    }
  
    end = (end.getHours() - 1) +"-"+endH
    console.log(start)
    console.log(end)
    
    // if we have an event corresponding to the time start and time end, add the has-event class
    var block = document.querySelector('.block[data-time-start="'+start+'"][data-time-end="'+end+'"]');
    if(block) {
        block.querySelector('.title').innerHTML = event.title
        block.classList.add('has-event')
    }
}
// ***************************************


// ***************************************
// Reset all the block event (title and event class)
// ***************************************
const resetBlockEvents = () => {
    var block = document.querySelectorAll('.block');
    block.forEach(b => {
        b.querySelector('.title').innerHTML = ""
        b.classList.remove('has-event')
    })
}
// ***************************************


// ***************************************
// reset all the selected block
// ***************************************
const resetBlockSelected = () => {
    var block = document.querySelectorAll('.block');
    block.forEach(b => {
        b.querySelector('.block-content').classList.remove('selected')
        var btn = b.querySelector('.btn-event')
        if(btn) {
            btn.remove()
        }
    })
}
// ***************************************



// ***************************************
// Change the confirm event
// ***************************************
const openConfirmEvent = (event) => {

    var element = event.target
    
    // si on a clicker sur le bouton on ne fait rien
    if(element.classList.contains('btn-event')) {
        return
    }

    // on enléve tous les attr selected des block events
    resetBlockSelected()

    // si on a clicker sur un element qui a déja un evenement, on fait rien
    if( element.classList.contains('has-event')) {
        return
    }
    
    element.querySelector('.block-content').classList.add('selected')
    
    // create the bujtton confirmation
    var btn = document.createElement('div')
    btn.classList.add('btn-event')
    btn.innerHTML = "Confirmer"
    element.append(btn)

    // when we click on a block without an element
    // format the date and time and end the request
    btn.addEventListener('click', async function() {
        var date = btn.parentElement.dataset.date
        var start = getFormatDateTime(date, btn.parentElement.dataset.timeStart)
        var end = getFormatDateTime(date, btn.parentElement.dataset.timeEnd)
        var request =  await bookEvents(new Date(date), start, end)
        // when the request is over, do your stuff
    })
 
}
// ***************************************



// ***************************************
// convert date + time in 10-00 into datetime oibject
// ***************************************
const getFormatDateTime = (date, time) => {
    var datetime = new Date(date).setHours(time.slice(0,2))
    datetime = new Date(datetime).setMinutes(time.slice(3,5))
    datetime = new Date(datetime).setSeconds(0)
    return new Date(datetime)
}
// ***************************************



// ***************************************
// create event listener for the blocks events
// ***************************************
const bindEventsBlockEvents = (date) => {

    document.querySelectorAll('.block').forEach(bl => {
       bl.removeEventListener("click", openConfirmEvent)
    })
    
    document.querySelectorAll('.block').forEach(bl => {
        bl.dataset.date = date
        bl.addEventListener('click', openConfirmEvent )
    })
}
// ***************************************


// ***************************************
// Init the calendar object
// ***************************************
const initCalendar = async() =>  {
  
    Callendar(container, {

        // when the calendar is ready
        onInit: async (calendar, monthDetail) => {
            // print the good header for the event 
            // use the helper methods from the calendar
            let d = calendar.fullDateString(new Date())
            printDateEvent(d)

            await setEvents(calendar, monthDetail)
            calendar.checkDayEvents(calendar.currentDate)
           
                
        },
        
        // when we click on a date on the calendar
        // return the callendar object, the date clicked, anbd the event object associated
        onDateSelect: (callendar, date, dayEvents) => {
            
            // print the new header in the event section
            let d = callendar.fullDateString(date)
            printDateEvent(d)

            // reset the block events
            resetBlockEvents()
            resetBlockSelected()

            // if event has eventDetail (specific to the example !! )
            if(dayEvents && dayEvents.Events.length) {
                dayEvents.Events.forEach( ev => {
                    // fill the block event with the good event from the db
                    fillBlockEvent(ev)
               })
            }
            // bind the events listenner on the event block
            bindEventsBlockEvents(date)
        },

        async onMonthChange(calendar , monthDetail) {
            await setEvents(calendar, monthDetail)
        }
    })
}

// ***************************************
// get the events for the current month
// monthDetail == {date, firstDay, lastDay, year}
// ***************************************
const setEvents = async (calendar, monthDetail) => {

    // get the events
    let events = await getEvents(monthDetail.firstDay, monthDetail.lastDay)
    events = events.data.calendar_events

    if(events.length) {
        // get only the events with events detail ( depend of your application logic off course !)
        events = events.filter(ev => ev.Events.length)

        // then, push the events to the calendar
        // events = [ {date: object DateTime, ...{} }, {etc...}]
        calendar.setEvents(events)
    }
    return events
}


let container = document.querySelector('#callendar')
if(container) {
    initCalendar() 
}
