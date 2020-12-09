

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
            onInit: function (calendar) {}, // Callback after first initialization
            onMonthChange: function (month, year) {}, // Callback on month change
            onDateSelect: function (date, events) {}, // Callback on date selection
            onEventSelect: function () {},              // Callback fired when an event is selected     - see $(this).data('event')
            onEventCreate: function( $el ) {},          // Callback fired when an HTML event is created - see $(this).data('event')
            onDayCreate:   function( $el, d, m, y ) {}  // Callback fired when an HTML day is created   - see $(this).data('today'), .data('todayEvents')
        };
        this.settings = { ...this.defaults, ...settings} // merge des options
      
        this.element = element
        this.currentDate = new Date();
        this.isChanging = false // if the slider is cuyrrently changing

        console.log(this)
        this.init();
      
    }

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

        var newCalendar = this.buildCalendar(todayDate, calendar);
        calendarcontent.append(newCalendar);

        calendar.append(calendarcontent)
        //this.buildCalendar(todayDate, calendar);
        container.append(calendar);
    
        this.bindEvents();
        this.settings.onInit(this);
    }  
    
     //Update the current month header
    updateHeader(date, header) {
        var monthText = this.settings.months[date.getMonth()];
        monthText += this.settings.displayYear ? ' <div class="year">' + date.getFullYear() : '</div>';
        header.querySelector('.month')
        header.querySelector('.month').innerHTML = monthText;
    }

    //Build calendar of a month from date
    buildCalendar(fromDate, calendar) {
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
            var td = document.createElement('td')
            td.innerHTML = '<div class="day" data-date="' + day.toISOString() + '">' + day.getDate() + '</div>';
  
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
            var todayEvents = this.getDateEvents(day);
  
            if (todayEvents.length && this.settings.displayEvent) {
              $day.classList.add("has-event");
            }
  
            // associate some data available from the onDayCreate callback
            $day.dataset.todayEvents = todayEvents;
  
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

    getDateEvents(day) {
      var that = this;
      return that.settings.events.filter(function (event) {
          console.log(new Date(event.date))
          console.log(day)
          console.log( that.isDayBetween(day, new Date(event.startDate), new Date(event.date)))
          return that.isDayBetween(day, new Date(event.startDate), new Date(event.date));
      });
        
    }

    getDateEvents(day) {
      var that = this;
      return that.settings.events.filter(function (event) {
          // console.log(new Date(event.date))
          // console.log(day)
          // if(that.isDateEquals(day, new Date(event.date))) {
          //   return true
          // }
          //return false
          // console.log( that.isDayBetween(day, new Date(event.startDate), new Date(event.date)))
          // return null
          return that.isDayBetween(day, new Date(event.date), new Date(event.date));
      });
        
    }

    isDayBetween(d, dStart, dEnd) {
      dStart.setHours(0,0,0);
      dEnd.setHours(23,59,59,999);
      d.setHours(12,0,0);

      return dStart <= d && d <= dEnd;
    }

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
      var newCalendar =  this.buildCalendar(this.currentDate, this.element.querySelector('.calendar'));

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
        this.settings.onMonthChange(this.currentDate.getMonth(), this.currentDate.getFullYear())
    
      
    }

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
      //Binding day event
      
          // var date = new Date($(this).data('date'));
          // var events = plugin.getDateEvents(date);
          // if (!$(this).hasClass('disabled')) {
          // plugin.fillUp(e.pageX, e.pageY);
          // plugin.displayEvents(events);
          // }
          // plugin.settings.onDateSelect(date, events);
    

      // //Binding event container close
      // $(plugin.element).on('click', '.event-container .close', function (e) {
      //     plugin.empty(e.pageX, e.pageY);
      // });
    }

    bindCalendarEvent() {
      var that = this
      that.element.querySelectorAll("table.new .day").forEach(day => {
        day.addEventListener('click', function() {
            var date = new Date(this.dataset.date);
            
            var events = that.getDateEvents(date);
            // if (!$(this).hasClass('disabled')) {
            //   plugin.fillUp(e.pageX, e.pageY);
            //   plugin.displayEvents(events);
            // }
            that.settings.onDateSelect(date, events);
        })
      })
    }
}


