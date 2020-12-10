

module.exports = class CallendarEvent {

    constructor(element, settings) {
        this.defaults = {
            months: ['janvier', 'fevrier', 'mars', 'avril', 'mai', 'juin', 'juillet', 'aout', 'septembre', 'octobre', 'novembre', 'decembre'], //string of months starting from january
            days: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'], //string of days starting from sunday
            times: ['10:00', "10:30", "11:00", "11:30", "12:00"],
            displayYear: true, // display year in header
            fixedStartDay: true, // Week begin always by monday or by day set by number 0 = sunday, 7 = saturday, false = month always begin by first day of the month
            displayEvent: true, // display existing event
            disableEventDetails: false, // disable showing event details
            disableEmptyDetails: false, // disable showing empty date details
            events: [{...settings.events}], // List of event
            onInit: function (calendar, monthDetail) {}, // Callback after first initialization
            onAnimationMonthChange: function (month, year) {}, // Callback on month change
            onDateSelect: function (calendar, date, dayEvents) {}, // Callback on date selection
            onEventSelect: function () {},              // Callback fired when an event is selected     - see $(this).data('event')
            onEventCreate: function( $el ) {},          // Callback fired when an HTML event is created - see $(this).data('event')
            onDayCreate:   function( $el, d, m, y ) {},  // Callback fired when an HTML day is created   - see $(this).data('today'), .data('todayEvents')
            onMonthChange: function( calendar, monthDetail ) {} // callback if you want to put some events
          };
        this.settings = { ...this.defaults, ...settings} // merge des options
      
        this.element = element
        this.currentDate = new Date();
        this.isChanging = false // if the slider is cuyrrently changing
        
        this.init();
      
    }

    // ***************************************
    init() {
        var container = this.element;
        var todayDate = this.currentDate;
    
        var calendar = document.createElement('div')
        calendar.classList.add('calendar')

        var header = document.createElement('header')
        header.innerHTML = '<h2 class="month"></h2>' +
        '<a class="simple-calendar-btn btn-prev" href="#"></a>' +
        '<a class="simple-calendar-btn btn-next" href="#"></a>'
    
    
        this.updateHeader(todayDate, header);
        calendar.append(header);

        var calendarcontent = document.createElement('div')
        calendarcontent.classList.add('content')

        var newCalendar = this.buildCalendar(todayDate);
        calendarcontent.append(newCalendar);

        calendar.append(calendarcontent)
        //this.buildCalendar(todayDate, calendar);
        container.append(calendar);
       
        this.bindEvents();
        this.settings.onInit(this, this.getMonthDetail());
    }
    // ***************************************

    // ***************************************
    // set event methods
    // @params array 
    // object must have a key date at least
    // ***************************************
    setEvents(events) {
      var that = this
      this.events = events
      events.forEach(event => {
        let date = new Date(event.date)
        let dayElement = that.element.querySelector('table.new .day.day-'+date.getDate())
        if(dayElement) {
          dayElement.classList.add('has-event')
        }
      })
    }
    // ***************************************


    // ***************************************
    // get the name of the day corresponding to the settings
    // ***************************************
    getDayName(index) {
      return this.settings.days[index]
    }
    // ***************************************


    // ***************************************
    // get the name of the month corresponding to the settings
    // ***************************************
    getMonthName(index) {
      return this.settings.months[index]
    }
    // ***************************************


    // ***************************************
    // get a full formated string date
    // ***************************************
    fullDateString(date) {
      return {
         day: this.getDayName(date.getDay()),
         month: this.getMonthName(date.getMonth()),
         year: date.getFullYear(),
         d: date.getDate()
      }
    }
    // ***************************************
    
    // ***************************************
    // get tfull detail of a month, (current date, first day, last day, year)
    // ***************************************
    getMonthDetail() {
      var y = this.currentDate.getFullYear(), m = this.currentDate.getMonth();
      var firstDay = new Date(y, m, 1);
      var lastDay = new Date(y, m + 1, 0);
      return {
        date: this.currentDate,
        month: this.currentDate.getMonth(),
        firstDay: firstDay,
        lastDay: lastDay,
        year:y,
      }
    }
    // ***************************************


    // ***************************************
     //Update the current month header
     // ***************************************
    updateHeader(date, header) {
        var monthText = this.settings.months[date.getMonth()];
        monthText += this.settings.displayYear ? ' <div class="year">' + date.getFullYear() : '</div>';
        header.querySelector('.month')
        header.querySelector('.month').innerHTML = monthText;
    }
    // ***************************************


    // ***************************************
    //Build calendar of a month from date
    // ***************************************
    buildCalendar(fromDate) {
        var plugin = this;
        
        // Create the table structure
        var body = document.createElement('table');
        body.classList.add('new')
        var thead = document.createElement('thead');
        var tbody = document.createElement('tbody');
  
        //set current year and month
        var y = fromDate.getFullYear(), m = fromDate.getMonth();
        //set first day of the month
        var firstDay = new Date(y, m, 1);

        //set last day of the month
        var lastDay = new Date(y, m + 1, 0);
        
        //set  start day of weeks
        var startDayOfWeek = firstDay.getDay();
  
        if (this.settings.fixedStartDay !== false) {
          // Backward compatibility
          startDayOfWeek =  this.settings.fixedStartDay ? 1 : this.settings.fixedStartDay;
  
          // If first day of month is different of startDayOfWeek
          while (firstDay.getDay() !== startDayOfWeek) {
            firstDay.setDate(firstDay.getDate() - 1);
          }
       
          // If last day of month is different of startDayOfWeek + 7
          while (lastDay.getDay() !== ((startDayOfWeek + 7) % 7)) {
            lastDay.setDate(lastDay.getDate() + 1);
          }
        }
  
        //Header day in a week ( (x to x + 7) % 7 to start the week by monday if x = 1)
        for (var i = startDayOfWeek; i < startDayOfWeek + 7; i++) {
          var td = document.createElement('td')
          td.innerHTML =  this.settings.days[i % 7].substring(0, 3)
          thead.append(td);
        }

        //For firstDay to lastDay
        for (var day = firstDay; day <= lastDay; day.setDate(day.getDate())) {
      
         var tr = document.createElement('tr')
          //For each row
          for (var i = 0; i < 7; i++) {
            console.log('dfd')
            var td = document.createElement('td')
            td.innerHTML = '<div class="day day-'+day.getDate()+'" data-date="' + day.toISOString() + '">' + day.getDate() + '</div>';
            var $day = td.querySelector('.day');
  
            //if today is this day
            if (day.toDateString() === (new Date).toDateString()) {
              $day.classList.add("today");
            }
  
            //if day is not in this month
            if (day.getMonth() != fromDate.getMonth()) {
              $day.classList.add("wrong-month");
            }
  
            // filter today's events
            day.setHours(12,0,0);
            // var todayEvents = this.getDateEvents(day);
  
            // if (todayEvents.length && this.settings.displayEvent) {
            //   $day.classList.add("has-event");
            // }
  
            // // associate some data available from the onDayCreate callback
            // $day.dataset.todayEvents = todayEvents;
  
            // simplify further customization
            this.settings.onDayCreate( $day, day.getDate(), m, y );
  
            tr.append(td);
            day.setDate(day.getDate() + 1);
          }
          tbody.append(tr);
        }
  
        body.append(thead);
        body.append(tbody);
     
     
        return body
    }
    // ***************************************


    // ***************************************
    // ***************************************
    changeMonth(value) {
      // if calendar is actually moving=>return
      if( ! this.isChanging) {
        this.isChanging = true
      }else {
        return
      }

      var calendarcontent = this.element.querySelector('.content')

      // Set the direction
      var direction = ""
      if(value == 1) direction = 'right-to-left'
      if(value == -1){
        direction = 'left-to-right'
        calendarcontent.classList.add('reverse')
      }

      this.element.querySelector('table.new').classList.add('old')
      this.element.querySelector('table.new').classList.remove('new')
      
      // update teh current date header
      this.currentDate.setMonth(this.currentDate.getMonth() + value, 1);
      this.updateHeader(this.currentDate, this.element.querySelector('.calendar header'));

      // build the next month calendar
      var newCalendar =  this.buildCalendar(this.currentDate);

      // move old and next calendar
      calendarcontent.append(newCalendar)

      var that = this

      setTimeout(function(){ 
          that.element.querySelector('table.old').classList.add('move', 'enter-'+direction)
          that.element.querySelector('table.new').classList.add('move', 'enter-'+direction)
          
          let transitionEndEventName = that.getTransitionEndEventName();

          that.element.querySelector('table.new').addEventListener(transitionEndEventName, function() {
            that.element.querySelector('table.new').classList.remove('move', 'enter-'+direction)
          });

          that.element.querySelector('table.old').addEventListener(transitionEndEventName, function() {
            that.element.querySelector('table.old').remove()
            calendarcontent.classList.remove('reverse')
            that.isChanging = false
          });
          that.bindCalendarEvent()
        }, 50, direction);
        // hook 

        // this.settings.onAnimationMonthChange(this.currentDate.getMonth(), this.currentDate.getFullYear())
    
        this.settings.onMonthChange(this, this.getMonthDetail());

    }


    // ***************************************
    // ***************************************
    getTransitionEndEventName() {
      var transitions = {
          "transition"      : "transitionend",
          "OTransition"     : "oTransitionEnd",
          "MozTransition"   : "transitionend",
          "WebkitTransition": "webkitTransitionEnd"
        }
      let bodyStyle = document.body.style;
      for(let transition in transitions) {
          if(bodyStyle[transition] != undefined) {
              return transitions[transition];
          } 
      }
    }

    // ***************************************
    // ***************************************
    isDayBetween(d, dStart, dEnd) {
      dStart.setHours(0,0,0);
      dEnd.setHours(23,59,59,999);
      return true
      // return dStart <= d && d <= dEnd;
    }


    // ***************************************
    // ***************************************
    bindEvents() {

      var that = this

      //Click previous month
      that.element.querySelector(".btn-prev").addEventListener('click', function ( e ) {
          console.log('previous month')
          that.changeMonth(-1)
          e.preventDefault();
      });

      //Click next month
      that.element.querySelector(".btn-next").addEventListener('click', function ( e ) {
          console.log('next month')
          that.changeMonth(1)
          e.preventDefault();
      });
      
      this.bindCalendarEvent()
 
    }


    // ***************************************
    // ***************************************
    bindCalendarEvent() {

      var that = this

      that.element.querySelectorAll("table.new .day").forEach(day => {

        day.addEventListener('click', function() {
           that.resetSelectedDay()
           day.classList.add('selected')
           that.checkDayEvents(new Date(day.dataset.date))
        })

      })
    }
    
    // ***************************************
    // ***************************************
    // click on a day, select it and check for events details
    checkDayEvents(date) {
        var dayEvents = this.events.find(ev => {
          return new Date(ev.date).toDateString() === date.toDateString()
        })
        this.settings.onDateSelect(this, date, dayEvents);
    }


    // ***************************************
    // ***************************************
    resetSelectedDay() {
      var that = this
      that.element.querySelectorAll("table.new .day").forEach(day => {
          day.classList.remove('selected')
      })
    }


}


