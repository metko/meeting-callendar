# Foobar

Ajax calendar events in js

Note: This is a devolpment version! 

## Installation

Use npm

```bash
npm i @metko/meeting-calendar
```

## Usage

```js
import Callendar from "@metko/meeting-calendar"
// in your scss file 
//@import "~@metko/meeting-calendar/dist/app.css";

Callendar("#selector", {
    // possible options

    // usefull when we nee to fill the calendar month with events
    // the month detail object gives you usefull info about the the current month (firstDay, lastDay, year)
    Init: async (callendar, monthDetail) => {
        callendar.setEvents([
            { date : new Date(), events: [{"...depends of the nature of your app"}]}
            { date : new Date() // must have a date object as property, the rest is up to you}
        ])
    },
    // when we click on a date on the calendar
    // return the callendar object, the date clicked, anbd the event object associated
    onDateSelect: (callendar, date, dayEvents) => {},
    
    // when we change the month
    // maybe we want to load more events
    onMonthChange: async (calendar , monthDetail) => {},

    // You can also override the name of the calendar
    months: ['janvier', 'fevrier', 'mars', 'avril', 'mai', 'juin', 'juillet', 'aout', 'septembre', 'octobre', 'novembre', 'decembre'], 
    days: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'], 
})
```


// TODO
- Set the current start day
- set min and max date
- events for a year or forever
- drag left/right for mobile
- different styles
- select for month and year
