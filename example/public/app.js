/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/public/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./assets/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/app.js":
/*!***********************!*\
  !*** ./assets/app.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _metko_meeting_calendar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @metko/meeting-calendar */ "./packages/meeting-calendar/index.js");
/* harmony import */ var _metko_meeting_calendar__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_metko_meeting_calendar__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _queries__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./queries */ "./assets/queries.js");
/* harmony import */ var _app_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.scss */ "./assets/app.scss");
/* harmony import */ var _app_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_app_scss__WEBPACK_IMPORTED_MODULE_2__);




const sleep = milliseconds => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}; // ***************************************  
// print the info of the selected date on the header of the events
// ***************************************


const printDateEvent = date => {
  var dayEvent = document.querySelector('#events .selected-day');
  dayEvent.innerHTML = date.day + " " + date.d + " " + date.month + " " + date.year;
}; // ***************************************
// ***************************************
// Fill the block event with the date and time value
// ***************************************


const fillBlockEvent = event => {
  var start = new Date(event.start);
  var startH = start.getMinutes();

  if (startH === 0) {
    startH = '00';
  }

  start = start.getHours() - 1 + "-" + startH;
  var end = new Date(event.end);
  var endH = end.getMinutes();

  if (endH === 0) {
    endH = '00';
  }

  end = end.getHours() - 1 + "-" + endH;
  console.log(start);
  console.log(end); // if we have an event corresponding to the time start and time end, add the has-event class

  var block = document.querySelector('.block[data-time-start="' + start + '"][data-time-end="' + end + '"]');

  if (block) {
    block.querySelector('.title').innerHTML = event.title;
    block.classList.add('has-event');
  }
}; // ***************************************
// ***************************************
// Reset all the block event (title and event class)
// ***************************************


const resetBlockEvents = () => {
  var block = document.querySelectorAll('.block');
  block.forEach(b => {
    b.querySelector('.title').innerHTML = "";
    b.classList.remove('has-event');
  });
}; // ***************************************
// ***************************************
// reset all the selected block
// ***************************************


const resetBlockSelected = () => {
  var block = document.querySelectorAll('.block');
  block.forEach(b => {
    b.querySelector('.block-content').classList.remove('selected');
    var btn = b.querySelector('.btn-event');

    if (btn) {
      btn.remove();
    }
  });
}; // ***************************************
// ***************************************
// Change the confirm event
// ***************************************


const openConfirmEvent = event => {
  var element = event.target; // si on a clicker sur le bouton on ne fait rien

  if (element.classList.contains('btn-event')) {
    return;
  } // on enléve tous les attr selected des block events


  resetBlockSelected(); // si on a clicker sur un element qui a déja un evenement, on fait rien

  if (element.classList.contains('has-event')) {
    return;
  }

  element.querySelector('.block-content').classList.add('selected'); // create the bujtton confirmation

  var btn = document.createElement('div');
  btn.classList.add('btn-event');
  btn.innerHTML = "Confirmer";
  element.append(btn); // when we click on a block without an element
  // format the date and time and end the request

  btn.addEventListener('click', async function () {
    var date = btn.parentElement.dataset.date;
    var start = getFormatDateTime(date, btn.parentElement.dataset.timeStart);
    var end = getFormatDateTime(date, btn.parentElement.dataset.timeEnd);
    var request = await Object(_queries__WEBPACK_IMPORTED_MODULE_1__["bookEvents"])(new Date(date), start, end); // when the request is over, do your stuff
  });
}; // ***************************************
// ***************************************
// convert date + time in 10-00 into datetime oibject
// ***************************************


const getFormatDateTime = (date, time) => {
  var datetime = new Date(date).setHours(time.slice(0, 2));
  datetime = new Date(datetime).setMinutes(time.slice(3, 5));
  datetime = new Date(datetime).setSeconds(0);
  return new Date(datetime);
}; // ***************************************
// ***************************************
// create event listener for the blocks events
// ***************************************


const bindEventsBlockEvents = date => {
  document.querySelectorAll('.block').forEach(bl => {
    bl.removeEventListener("click", openConfirmEvent);
  });
  document.querySelectorAll('.block').forEach(bl => {
    bl.dataset.date = date;
    bl.addEventListener('click', openConfirmEvent);
  });
}; // ***************************************
// ***************************************
// Init the calendar object
// ***************************************


const initCalendar = async () => {
  _metko_meeting_calendar__WEBPACK_IMPORTED_MODULE_0___default()(container, {
    // when the calendar is ready
    onInit: async (calendar, monthDetail) => {
      // print the good header for the event 
      // use the helper methods from the calendar
      let d = calendar.fullDateString(new Date());
      printDateEvent(d);
      await setEvents(calendar, monthDetail);
      calendar.checkDayEvents(calendar.currentDate);
    },
    // when we click on a date on the calendar
    // return the callendar object, the date clicked, anbd the event object associated
    onDateSelect: (callendar, date, dayEvents) => {
      // print the new header in the event section
      let d = callendar.fullDateString(date);
      printDateEvent(d); // reset the block events

      resetBlockEvents();
      resetBlockSelected(); // if event has eventDetail (specific to the example !! )

      if (dayEvents && dayEvents.Events.length) {
        dayEvents.Events.forEach(ev => {
          // fill the block event with the good event from the db
          fillBlockEvent(ev);
        });
      } // bind the events listenner on the event block


      bindEventsBlockEvents(date);
    },

    async onMonthChange(calendar, monthDetail) {
      await setEvents(calendar, monthDetail);
    }

  });
}; // ***************************************
// get the events for the current month
// monthDetail == {date, firstDay, lastDay, year}
// ***************************************


const setEvents = async (calendar, monthDetail) => {
  // get the events
  let events = await Object(_queries__WEBPACK_IMPORTED_MODULE_1__["getEvents"])(monthDetail.firstDay, monthDetail.lastDay);
  events = events.data.calendar_events;

  if (events.length) {
    // get only the events with events detail ( depend of your application logic off course !)
    events = events.filter(ev => ev.Events.length); // then, push the events to the calendar
    // events = [ {date: object DateTime, ...{} }, {etc...}]

    calendar.setEvents(events);
  }

  return events;
};

let container = document.querySelector('#callendar');

if (container) {
  initCalendar();
}

/***/ }),

/***/ "./assets/app.scss":
/*!*************************!*\
  !*** ./assets/app.scss ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./assets/queries.js":
/*!***************************!*\
  !*** ./assets/queries.js ***!
  \***************************/
/*! exports provided: getEvents, bookEvents */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getEvents", function() { return getEvents; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bookEvents", function() { return bookEvents; });
const queryEvents = `query getEvents($from: timestamptz!, $to: timestamptz!) {
    calendar_events(where: {_or: [
      {_and: [{date: {_gte: $from}}, {date: {_lt: $to}}]},
      {_and: [{date: {_gt: $from}}, {date: {_lte: $to}}]},
    ]}) {
      id
      date
      Events {
        description
        end
        id
        id_calendar_event
        title
        start
      }
    }
  }`;

const query = async context => {
  const request = await fetch('https://back.myffme.fr/v1/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "x-hasura-admin-secret": "ffme2020*"
    },
    body: JSON.stringify(context)
  });
  const data = await request.json(); //await sleep(1000)

  return data;
};

const getEvents = async (start, end) => {
  return await query({
    query: queryEvents,
    variables: {
      from: start,
      to: end
    }
  });
};

const bookEvents = async (date, start, end) => {
  console.log(date);
  console.log(start);
  console.log(end);
};



/***/ }),

/***/ "./packages/meeting-calendar/index.js":
/*!********************************************!*\
  !*** ./packages/meeting-calendar/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (element, settings) => {
  const callendar = __webpack_require__(/*! ./src/callendar */ "./packages/meeting-calendar/src/callendar.js");

  if (!element) {
    console.error('not a valid container');
    return;
  }

  if (!settings) {
    settings = [];
  }

  new callendar(element, settings);
};

/***/ }),

/***/ "./packages/meeting-calendar/src/callendar.js":
/*!****************************************************!*\
  !*** ./packages/meeting-calendar/src/callendar.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = class CallendarEvent {
  constructor(element, settings) {
    this.defaults = {
      months: ['janvier', 'fevrier', 'mars', 'avril', 'mai', 'juin', 'juillet', 'aout', 'septembre', 'octobre', 'novembre', 'decembre'],
      //string of months starting from january
      days: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
      //string of days starting from sunday
      times: ['10:00', "10:30", "11:00", "11:30", "12:00"],
      displayYear: true,
      // display year in header
      fixedStartDay: true,
      // Week begin always by monday or by day set by number 0 = sunday, 7 = saturday, false = month always begin by first day of the month
      displayEvent: true,
      // display existing event
      disableEventDetails: false,
      // disable showing event details
      disableEmptyDetails: false,
      // disable showing empty date details
      events: [{ ...settings.events
      }],
      // List of event
      onInit: function (calendar, monthDetail) {},
      // Callback after first initialization
      onAnimationMonthChange: function (month, year) {},
      // Callback on month change
      onDateSelect: function (calendar, date, dayEvents) {},
      // Callback on date selection
      onEventSelect: function () {},
      // Callback fired when an event is selected     - see $(this).data('event')
      onEventCreate: function ($el) {},
      // Callback fired when an HTML event is created - see $(this).data('event')
      onDayCreate: function ($el, d, m, y) {},
      // Callback fired when an HTML day is created   - see $(this).data('today'), .data('todayEvents')
      onMonthChange: function (calendar, monthDetail) {} // callback if you want to put some events

    };
    this.settings = { ...this.defaults,
      ...settings
    }; // merge des options

    this.element = element;
    this.currentDate = new Date();
    this.isChanging = false; // if the slider is cuyrrently changing

    this.init();
  } // ***************************************


  init() {
    var container = this.element;
    var todayDate = this.currentDate;
    var calendar = document.createElement('div');
    calendar.classList.add('calendar');
    var header = document.createElement('header');
    header.innerHTML = '<h2 class="month"></h2>' + '<a class="simple-calendar-btn btn-prev" href="#"></a>' + '<a class="simple-calendar-btn btn-next" href="#"></a>';
    this.updateHeader(todayDate, header);
    calendar.append(header);
    var calendarcontent = document.createElement('div');
    calendarcontent.classList.add('content');
    var newCalendar = this.buildCalendar(todayDate);
    calendarcontent.append(newCalendar);
    calendar.append(calendarcontent); //this.buildCalendar(todayDate, calendar);

    container.append(calendar);
    this.bindEvents();
    this.settings.onInit(this, this.getMonthDetail());
  } // ***************************************
  // ***************************************
  // set event methods
  // @params array 
  // object must have a key date at least
  // ***************************************


  setEvents(events) {
    var that = this;
    this.events = events;
    events.forEach(event => {
      let date = new Date(event.date);
      let dayElement = that.element.querySelector('table.new .day.day-' + date.getDate());

      if (dayElement) {
        dayElement.classList.add('has-event');
      }
    });
  } // ***************************************
  // ***************************************
  // get the name of the day corresponding to the settings
  // ***************************************


  getDayName(index) {
    return this.settings.days[index];
  } // ***************************************
  // ***************************************
  // get the name of the month corresponding to the settings
  // ***************************************


  getMonthName(index) {
    return this.settings.months[index];
  } // ***************************************
  // ***************************************
  // get a full formated string date
  // ***************************************


  fullDateString(date) {
    return {
      day: this.getDayName(date.getDay()),
      month: this.getMonthName(date.getMonth()),
      year: date.getFullYear(),
      d: date.getDate()
    };
  } // ***************************************
  // ***************************************
  // get tfull detail of a month, (current date, first day, last day, year)
  // ***************************************


  getMonthDetail() {
    var y = this.currentDate.getFullYear(),
        m = this.currentDate.getMonth();
    var firstDay = new Date(y, m, 1);
    var lastDay = new Date(y, m + 1, 0);
    return {
      date: this.currentDate,
      month: this.currentDate.getMonth(),
      firstDay: firstDay,
      lastDay: lastDay,
      year: y
    };
  } // ***************************************
  // ***************************************
  //Update the current month header
  // ***************************************


  updateHeader(date, header) {
    var monthText = this.settings.months[date.getMonth()];
    monthText += this.settings.displayYear ? ' <div class="year">' + date.getFullYear() : '</div>';
    header.querySelector('.month');
    header.querySelector('.month').innerHTML = monthText;
  } // ***************************************
  // ***************************************
  //Build calendar of a month from date
  // ***************************************


  buildCalendar(fromDate) {
    var plugin = this; // Create the table structure

    var body = document.createElement('table');
    body.classList.add('new');
    var thead = document.createElement('thead');
    var tbody = document.createElement('tbody'); //set current year and month

    var y = fromDate.getFullYear(),
        m = fromDate.getMonth(); //set first day of the month

    var firstDay = new Date(y, m, 1); //set last day of the month

    var lastDay = new Date(y, m + 1, 0); //set  start day of weeks

    var startDayOfWeek = firstDay.getDay();

    if (this.settings.fixedStartDay !== false) {
      // Backward compatibility
      startDayOfWeek = this.settings.fixedStartDay ? 1 : this.settings.fixedStartDay; // If first day of month is different of startDayOfWeek

      while (firstDay.getDay() !== startDayOfWeek) {
        firstDay.setDate(firstDay.getDate() - 1);
      } // If last day of month is different of startDayOfWeek + 7


      while (lastDay.getDay() !== (startDayOfWeek + 7) % 7) {
        lastDay.setDate(lastDay.getDate() + 1);
      }
    } //Header day in a week ( (x to x + 7) % 7 to start the week by monday if x = 1)


    for (var i = startDayOfWeek; i < startDayOfWeek + 7; i++) {
      var td = document.createElement('td');
      td.innerHTML = this.settings.days[i % 7].substring(0, 3);
      thead.append(td);
    } //For firstDay to lastDay


    for (var day = firstDay; day <= lastDay; day.setDate(day.getDate())) {
      var tr = document.createElement('tr'); //For each row

      for (var i = 0; i < 7; i++) {
        console.log('dfd');
        var td = document.createElement('td');
        td.innerHTML = '<div class="day day-' + day.getDate() + '" data-date="' + day.toISOString() + '">' + day.getDate() + '</div>';
        var $day = td.querySelector('.day'); //if today is this day

        if (day.toDateString() === new Date().toDateString()) {
          $day.classList.add("today");
        } //if day is not in this month


        if (day.getMonth() != fromDate.getMonth()) {
          $day.classList.add("wrong-month");
        } // filter today's events


        day.setHours(12, 0, 0); // var todayEvents = this.getDateEvents(day);
        // if (todayEvents.length && this.settings.displayEvent) {
        //   $day.classList.add("has-event");
        // }
        // // associate some data available from the onDayCreate callback
        // $day.dataset.todayEvents = todayEvents;
        // simplify further customization

        this.settings.onDayCreate($day, day.getDate(), m, y);
        tr.append(td);
        day.setDate(day.getDate() + 1);
      }

      tbody.append(tr);
    }

    body.append(thead);
    body.append(tbody);
    return body;
  } // ***************************************
  // ***************************************
  // ***************************************


  changeMonth(value) {
    // if calendar is actually moving=>return
    if (!this.isChanging) {
      this.isChanging = true;
    } else {
      return;
    }

    var calendarcontent = this.element.querySelector('.content'); // Set the direction

    var direction = "";
    if (value == 1) direction = 'right-to-left';

    if (value == -1) {
      direction = 'left-to-right';
      calendarcontent.classList.add('reverse');
    }

    this.element.querySelector('table.new').classList.add('old');
    this.element.querySelector('table.new').classList.remove('new'); // update teh current date header

    this.currentDate.setMonth(this.currentDate.getMonth() + value, 1);
    this.updateHeader(this.currentDate, this.element.querySelector('.calendar header')); // build the next month calendar

    var newCalendar = this.buildCalendar(this.currentDate); // move old and next calendar

    calendarcontent.append(newCalendar);
    var that = this;
    setTimeout(function () {
      that.element.querySelector('table.old').classList.add('move', 'enter-' + direction);
      that.element.querySelector('table.new').classList.add('move', 'enter-' + direction);
      let transitionEndEventName = that.getTransitionEndEventName();
      that.element.querySelector('table.new').addEventListener(transitionEndEventName, function () {
        that.element.querySelector('table.new').classList.remove('move', 'enter-' + direction);
      });
      that.element.querySelector('table.old').addEventListener(transitionEndEventName, function () {
        that.element.querySelector('table.old').remove();
        calendarcontent.classList.remove('reverse');
        that.isChanging = false;
      });
      that.bindCalendarEvent();
    }, 50, direction); // hook 
    // this.settings.onAnimationMonthChange(this.currentDate.getMonth(), this.currentDate.getFullYear())

    this.settings.onMonthChange(this, this.getMonthDetail());
  } // ***************************************
  // ***************************************


  getTransitionEndEventName() {
    var transitions = {
      "transition": "transitionend",
      "OTransition": "oTransitionEnd",
      "MozTransition": "transitionend",
      "WebkitTransition": "webkitTransitionEnd"
    };
    let bodyStyle = document.body.style;

    for (let transition in transitions) {
      if (bodyStyle[transition] != undefined) {
        return transitions[transition];
      }
    }
  } // ***************************************
  // ***************************************


  isDayBetween(d, dStart, dEnd) {
    dStart.setHours(0, 0, 0);
    dEnd.setHours(23, 59, 59, 999);
    return true; // return dStart <= d && d <= dEnd;
  } // ***************************************
  // ***************************************


  bindEvents() {
    var that = this; //Click previous month

    that.element.querySelector(".btn-prev").addEventListener('click', function (e) {
      console.log('previous month');
      that.changeMonth(-1);
      e.preventDefault();
    }); //Click next month

    that.element.querySelector(".btn-next").addEventListener('click', function (e) {
      console.log('next month');
      that.changeMonth(1);
      e.preventDefault();
    });
    this.bindCalendarEvent();
  } // ***************************************
  // ***************************************


  bindCalendarEvent() {
    var that = this;
    that.element.querySelectorAll("table.new .day").forEach(day => {
      day.addEventListener('click', function () {
        that.resetSelectedDay();
        day.classList.add('selected');
        that.checkDayEvents(new Date(day.dataset.date));
      });
    });
  } // ***************************************
  // ***************************************
  // click on a day, select it and check for events details


  checkDayEvents(date) {
    var dayEvents = this.events.find(ev => {
      return new Date(ev.date).toDateString() === date.toDateString();
    });
    this.settings.onDateSelect(this, date, dayEvents);
  } // ***************************************
  // ***************************************


  resetSelectedDay() {
    var that = this;
    that.element.querySelectorAll("table.new .day").forEach(day => {
      day.classList.remove('selected');
    });
  }

};

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvYXBwLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3F1ZXJpZXMuanMiLCJ3ZWJwYWNrOi8vLy4vcGFja2FnZXMvbWVldGluZy1jYWxlbmRhci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9wYWNrYWdlcy9tZWV0aW5nLWNhbGVuZGFyL3NyYy9jYWxsZW5kYXIuanMiXSwibmFtZXMiOlsic2xlZXAiLCJtaWxsaXNlY29uZHMiLCJQcm9taXNlIiwicmVzb2x2ZSIsInNldFRpbWVvdXQiLCJwcmludERhdGVFdmVudCIsImRhdGUiLCJkYXlFdmVudCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImlubmVySFRNTCIsImRheSIsImQiLCJtb250aCIsInllYXIiLCJmaWxsQmxvY2tFdmVudCIsImV2ZW50Iiwic3RhcnQiLCJEYXRlIiwic3RhcnRIIiwiZ2V0TWludXRlcyIsImdldEhvdXJzIiwiZW5kIiwiZW5kSCIsImNvbnNvbGUiLCJsb2ciLCJibG9jayIsInRpdGxlIiwiY2xhc3NMaXN0IiwiYWRkIiwicmVzZXRCbG9ja0V2ZW50cyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwiYiIsInJlbW92ZSIsInJlc2V0QmxvY2tTZWxlY3RlZCIsImJ0biIsIm9wZW5Db25maXJtRXZlbnQiLCJlbGVtZW50IiwidGFyZ2V0IiwiY29udGFpbnMiLCJjcmVhdGVFbGVtZW50IiwiYXBwZW5kIiwiYWRkRXZlbnRMaXN0ZW5lciIsInBhcmVudEVsZW1lbnQiLCJkYXRhc2V0IiwiZ2V0Rm9ybWF0RGF0ZVRpbWUiLCJ0aW1lU3RhcnQiLCJ0aW1lRW5kIiwicmVxdWVzdCIsImJvb2tFdmVudHMiLCJ0aW1lIiwiZGF0ZXRpbWUiLCJzZXRIb3VycyIsInNsaWNlIiwic2V0TWludXRlcyIsInNldFNlY29uZHMiLCJiaW5kRXZlbnRzQmxvY2tFdmVudHMiLCJibCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJpbml0Q2FsZW5kYXIiLCJDYWxsZW5kYXIiLCJjb250YWluZXIiLCJvbkluaXQiLCJjYWxlbmRhciIsIm1vbnRoRGV0YWlsIiwiZnVsbERhdGVTdHJpbmciLCJzZXRFdmVudHMiLCJjaGVja0RheUV2ZW50cyIsImN1cnJlbnREYXRlIiwib25EYXRlU2VsZWN0IiwiY2FsbGVuZGFyIiwiZGF5RXZlbnRzIiwiRXZlbnRzIiwibGVuZ3RoIiwiZXYiLCJvbk1vbnRoQ2hhbmdlIiwiZXZlbnRzIiwiZ2V0RXZlbnRzIiwiZmlyc3REYXkiLCJsYXN0RGF5IiwiZGF0YSIsImNhbGVuZGFyX2V2ZW50cyIsImZpbHRlciIsInF1ZXJ5RXZlbnRzIiwicXVlcnkiLCJjb250ZXh0IiwiZmV0Y2giLCJtZXRob2QiLCJoZWFkZXJzIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJqc29uIiwidmFyaWFibGVzIiwiZnJvbSIsInRvIiwibW9kdWxlIiwiZXhwb3J0cyIsInNldHRpbmdzIiwicmVxdWlyZSIsImVycm9yIiwiQ2FsbGVuZGFyRXZlbnQiLCJjb25zdHJ1Y3RvciIsImRlZmF1bHRzIiwibW9udGhzIiwiZGF5cyIsInRpbWVzIiwiZGlzcGxheVllYXIiLCJmaXhlZFN0YXJ0RGF5IiwiZGlzcGxheUV2ZW50IiwiZGlzYWJsZUV2ZW50RGV0YWlscyIsImRpc2FibGVFbXB0eURldGFpbHMiLCJvbkFuaW1hdGlvbk1vbnRoQ2hhbmdlIiwib25FdmVudFNlbGVjdCIsIm9uRXZlbnRDcmVhdGUiLCIkZWwiLCJvbkRheUNyZWF0ZSIsIm0iLCJ5IiwiaXNDaGFuZ2luZyIsImluaXQiLCJ0b2RheURhdGUiLCJoZWFkZXIiLCJ1cGRhdGVIZWFkZXIiLCJjYWxlbmRhcmNvbnRlbnQiLCJuZXdDYWxlbmRhciIsImJ1aWxkQ2FsZW5kYXIiLCJiaW5kRXZlbnRzIiwiZ2V0TW9udGhEZXRhaWwiLCJ0aGF0IiwiZGF5RWxlbWVudCIsImdldERhdGUiLCJnZXREYXlOYW1lIiwiaW5kZXgiLCJnZXRNb250aE5hbWUiLCJnZXREYXkiLCJnZXRNb250aCIsImdldEZ1bGxZZWFyIiwibW9udGhUZXh0IiwiZnJvbURhdGUiLCJwbHVnaW4iLCJ0aGVhZCIsInRib2R5Iiwic3RhcnREYXlPZldlZWsiLCJzZXREYXRlIiwiaSIsInRkIiwic3Vic3RyaW5nIiwidHIiLCJ0b0lTT1N0cmluZyIsIiRkYXkiLCJ0b0RhdGVTdHJpbmciLCJjaGFuZ2VNb250aCIsInZhbHVlIiwiZGlyZWN0aW9uIiwic2V0TW9udGgiLCJ0cmFuc2l0aW9uRW5kRXZlbnROYW1lIiwiZ2V0VHJhbnNpdGlvbkVuZEV2ZW50TmFtZSIsImJpbmRDYWxlbmRhckV2ZW50IiwidHJhbnNpdGlvbnMiLCJib2R5U3R5bGUiLCJzdHlsZSIsInRyYW5zaXRpb24iLCJ1bmRlZmluZWQiLCJpc0RheUJldHdlZW4iLCJkU3RhcnQiLCJkRW5kIiwiZSIsInByZXZlbnREZWZhdWx0IiwicmVzZXRTZWxlY3RlZERheSIsImZpbmQiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFD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VUFBbEI7QUFDQXFHLFlBQUksQ0FBQzlELGNBQUwsQ0FBb0IsSUFBSWxELElBQUosQ0FBU1AsR0FBRyxDQUFDa0MsT0FBSixDQUFZdkMsSUFBckIsQ0FBcEI7QUFDRixPQUpEO0FBTUQsS0FSRDtBQVNELEdBL1dpQyxDQWlYbEM7QUFDQTtBQUNBOzs7QUFDQThELGdCQUFjLENBQUM5RCxJQUFELEVBQU87QUFDakIsUUFBSWtFLFNBQVMsR0FBRyxLQUFLSyxNQUFMLENBQVk4RixJQUFaLENBQWlCaEcsRUFBRSxJQUFJO0FBQ3JDLGFBQU8sSUFBSXpELElBQUosQ0FBU3lELEVBQUUsQ0FBQ3JFLElBQVosRUFBa0JrSixZQUFsQixPQUFxQ2xKLElBQUksQ0FBQ2tKLFlBQUwsRUFBNUM7QUFDRCxLQUZlLENBQWhCO0FBR0EsU0FBS3JELFFBQUwsQ0FBYzdCLFlBQWQsQ0FBMkIsSUFBM0IsRUFBaUNoRSxJQUFqQyxFQUF1Q2tFLFNBQXZDO0FBQ0gsR0F6WGlDLENBNFhsQztBQUNBOzs7QUFDQWtHLGtCQUFnQixHQUFHO0FBQ2pCLFFBQUl4QyxJQUFJLEdBQUcsSUFBWDtBQUNBQSxRQUFJLENBQUM1RixPQUFMLENBQWFQLGdCQUFiLENBQThCLGdCQUE5QixFQUFnREMsT0FBaEQsQ0FBd0RyQixHQUFHLElBQUk7QUFDM0RBLFNBQUcsQ0FBQ2lCLFNBQUosQ0FBY00sTUFBZCxDQUFxQixVQUFyQjtBQUNILEtBRkQ7QUFHRDs7QUFuWWlDLENBQXRDLEMiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvcHVibGljL1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2Fzc2V0cy9hcHAuanNcIik7XG4iLCJpbXBvcnQgQ2FsbGVuZGFyIGZyb20gXCJAbWV0a28vbWVldGluZy1jYWxlbmRhclwiXG5pbXBvcnQge2dldEV2ZW50cywgYm9va0V2ZW50c30gZnJvbSBcIi4vcXVlcmllc1wiXG5pbXBvcnRcIi4vYXBwLnNjc3NcIjtcblxuY29uc3Qgc2xlZXAgPSAobWlsbGlzZWNvbmRzKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCBtaWxsaXNlY29uZHMpKVxufVxuXG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogIFxuLy8gcHJpbnQgdGhlIGluZm8gb2YgdGhlIHNlbGVjdGVkIGRhdGUgb24gdGhlIGhlYWRlciBvZiB0aGUgZXZlbnRzXG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbmNvbnN0IHByaW50RGF0ZUV2ZW50ID0gKGRhdGUpID0+IHtcbiAgICB2YXIgZGF5RXZlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZXZlbnRzIC5zZWxlY3RlZC1kYXknKVxuICAgIGRheUV2ZW50LmlubmVySFRNTCA9IGRhdGUuZGF5ICsgXCIgXCIrIGRhdGUuZCArIFwiIFwiICsgZGF0ZS5tb250aCArIFwiIFwiICsgZGF0ZS55ZWFyXG59XG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcblxuXG5cbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuLy8gRmlsbCB0aGUgYmxvY2sgZXZlbnQgd2l0aCB0aGUgZGF0ZSBhbmQgdGltZSB2YWx1ZVxuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5jb25zdCBmaWxsQmxvY2tFdmVudCA9IChldmVudCkgPT4ge1xuICAgIFxuICAgIHZhciBzdGFydCAgPSBuZXcgRGF0ZShldmVudC5zdGFydClcbiAgICB2YXIgc3RhcnRIID0gc3RhcnQuZ2V0TWludXRlcygpXG4gICAgaWYoIHN0YXJ0SCA9PT0gMCkge1xuICAgICAgICBzdGFydEggPSAnMDAnXG4gICAgfVxuICAgIHN0YXJ0ID0gKHN0YXJ0LmdldEhvdXJzKCkgLSAxKSArXCItXCIrc3RhcnRIXG5cbiAgICB2YXIgZW5kICA9IG5ldyBEYXRlKGV2ZW50LmVuZClcbiAgICB2YXIgZW5kSCA9IGVuZC5nZXRNaW51dGVzKClcblxuICAgIGlmKCBlbmRIID09PSAwKSB7XG4gICAgICAgIGVuZEggPSAnMDAnXG4gICAgfVxuICBcbiAgICBlbmQgPSAoZW5kLmdldEhvdXJzKCkgLSAxKSArXCItXCIrZW5kSFxuICAgIGNvbnNvbGUubG9nKHN0YXJ0KVxuICAgIGNvbnNvbGUubG9nKGVuZClcbiAgICBcbiAgICAvLyBpZiB3ZSBoYXZlIGFuIGV2ZW50IGNvcnJlc3BvbmRpbmcgdG8gdGhlIHRpbWUgc3RhcnQgYW5kIHRpbWUgZW5kLCBhZGQgdGhlIGhhcy1ldmVudCBjbGFzc1xuICAgIHZhciBibG9jayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ibG9ja1tkYXRhLXRpbWUtc3RhcnQ9XCInK3N0YXJ0KydcIl1bZGF0YS10aW1lLWVuZD1cIicrZW5kKydcIl0nKTtcbiAgICBpZihibG9jaykge1xuICAgICAgICBibG9jay5xdWVyeVNlbGVjdG9yKCcudGl0bGUnKS5pbm5lckhUTUwgPSBldmVudC50aXRsZVxuICAgICAgICBibG9jay5jbGFzc0xpc3QuYWRkKCdoYXMtZXZlbnQnKVxuICAgIH1cbn1cbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuXG5cbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuLy8gUmVzZXQgYWxsIHRoZSBibG9jayBldmVudCAodGl0bGUgYW5kIGV2ZW50IGNsYXNzKVxuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5jb25zdCByZXNldEJsb2NrRXZlbnRzID0gKCkgPT4ge1xuICAgIHZhciBibG9jayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ibG9jaycpO1xuICAgIGJsb2NrLmZvckVhY2goYiA9PiB7XG4gICAgICAgIGIucXVlcnlTZWxlY3RvcignLnRpdGxlJykuaW5uZXJIVE1MID0gXCJcIlxuICAgICAgICBiLmNsYXNzTGlzdC5yZW1vdmUoJ2hhcy1ldmVudCcpXG4gICAgfSlcbn1cbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuXG5cbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuLy8gcmVzZXQgYWxsIHRoZSBzZWxlY3RlZCBibG9ja1xuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5jb25zdCByZXNldEJsb2NrU2VsZWN0ZWQgPSAoKSA9PiB7XG4gICAgdmFyIGJsb2NrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmJsb2NrJyk7XG4gICAgYmxvY2suZm9yRWFjaChiID0+IHtcbiAgICAgICAgYi5xdWVyeVNlbGVjdG9yKCcuYmxvY2stY29udGVudCcpLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJylcbiAgICAgICAgdmFyIGJ0biA9IGIucXVlcnlTZWxlY3RvcignLmJ0bi1ldmVudCcpXG4gICAgICAgIGlmKGJ0bikge1xuICAgICAgICAgICAgYnRuLnJlbW92ZSgpXG4gICAgICAgIH1cbiAgICB9KVxufVxuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5cblxuXG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbi8vIENoYW5nZSB0aGUgY29uZmlybSBldmVudFxuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5jb25zdCBvcGVuQ29uZmlybUV2ZW50ID0gKGV2ZW50KSA9PiB7XG5cbiAgICB2YXIgZWxlbWVudCA9IGV2ZW50LnRhcmdldFxuICAgIFxuICAgIC8vIHNpIG9uIGEgY2xpY2tlciBzdXIgbGUgYm91dG9uIG9uIG5lIGZhaXQgcmllblxuICAgIGlmKGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdidG4tZXZlbnQnKSkge1xuICAgICAgICByZXR1cm5cbiAgICB9XG5cbiAgICAvLyBvbiBlbmzDqXZlIHRvdXMgbGVzIGF0dHIgc2VsZWN0ZWQgZGVzIGJsb2NrIGV2ZW50c1xuICAgIHJlc2V0QmxvY2tTZWxlY3RlZCgpXG5cbiAgICAvLyBzaSBvbiBhIGNsaWNrZXIgc3VyIHVuIGVsZW1lbnQgcXVpIGEgZMOpamEgdW4gZXZlbmVtZW50LCBvbiBmYWl0IHJpZW5cbiAgICBpZiggZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2hhcy1ldmVudCcpKSB7XG4gICAgICAgIHJldHVyblxuICAgIH1cbiAgICBcbiAgICBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ibG9jay1jb250ZW50JykuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKVxuICAgIFxuICAgIC8vIGNyZWF0ZSB0aGUgYnVqdHRvbiBjb25maXJtYXRpb25cbiAgICB2YXIgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBidG4uY2xhc3NMaXN0LmFkZCgnYnRuLWV2ZW50JylcbiAgICBidG4uaW5uZXJIVE1MID0gXCJDb25maXJtZXJcIlxuICAgIGVsZW1lbnQuYXBwZW5kKGJ0bilcblxuICAgIC8vIHdoZW4gd2UgY2xpY2sgb24gYSBibG9jayB3aXRob3V0IGFuIGVsZW1lbnRcbiAgICAvLyBmb3JtYXQgdGhlIGRhdGUgYW5kIHRpbWUgYW5kIGVuZCB0aGUgcmVxdWVzdFxuICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZGF0ZSA9IGJ0bi5wYXJlbnRFbGVtZW50LmRhdGFzZXQuZGF0ZVxuICAgICAgICB2YXIgc3RhcnQgPSBnZXRGb3JtYXREYXRlVGltZShkYXRlLCBidG4ucGFyZW50RWxlbWVudC5kYXRhc2V0LnRpbWVTdGFydClcbiAgICAgICAgdmFyIGVuZCA9IGdldEZvcm1hdERhdGVUaW1lKGRhdGUsIGJ0bi5wYXJlbnRFbGVtZW50LmRhdGFzZXQudGltZUVuZClcbiAgICAgICAgdmFyIHJlcXVlc3QgPSAgYXdhaXQgYm9va0V2ZW50cyhuZXcgRGF0ZShkYXRlKSwgc3RhcnQsIGVuZClcbiAgICAgICAgLy8gd2hlbiB0aGUgcmVxdWVzdCBpcyBvdmVyLCBkbyB5b3VyIHN0dWZmXG4gICAgfSlcbiBcbn1cbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuXG5cblxuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4vLyBjb252ZXJ0IGRhdGUgKyB0aW1lIGluIDEwLTAwIGludG8gZGF0ZXRpbWUgb2liamVjdFxuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5jb25zdCBnZXRGb3JtYXREYXRlVGltZSA9IChkYXRlLCB0aW1lKSA9PiB7XG4gICAgdmFyIGRhdGV0aW1lID0gbmV3IERhdGUoZGF0ZSkuc2V0SG91cnModGltZS5zbGljZSgwLDIpKVxuICAgIGRhdGV0aW1lID0gbmV3IERhdGUoZGF0ZXRpbWUpLnNldE1pbnV0ZXModGltZS5zbGljZSgzLDUpKVxuICAgIGRhdGV0aW1lID0gbmV3IERhdGUoZGF0ZXRpbWUpLnNldFNlY29uZHMoMClcbiAgICByZXR1cm4gbmV3IERhdGUoZGF0ZXRpbWUpXG59XG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcblxuXG5cbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuLy8gY3JlYXRlIGV2ZW50IGxpc3RlbmVyIGZvciB0aGUgYmxvY2tzIGV2ZW50c1xuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5jb25zdCBiaW5kRXZlbnRzQmxvY2tFdmVudHMgPSAoZGF0ZSkgPT4ge1xuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmJsb2NrJykuZm9yRWFjaChibCA9PiB7XG4gICAgICAgYmwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG9wZW5Db25maXJtRXZlbnQpXG4gICAgfSlcbiAgICBcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYmxvY2snKS5mb3JFYWNoKGJsID0+IHtcbiAgICAgICAgYmwuZGF0YXNldC5kYXRlID0gZGF0ZVxuICAgICAgICBibC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9wZW5Db25maXJtRXZlbnQgKVxuICAgIH0pXG59XG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcblxuXG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbi8vIEluaXQgdGhlIGNhbGVuZGFyIG9iamVjdFxuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5jb25zdCBpbml0Q2FsZW5kYXIgPSBhc3luYygpID0+ICB7XG4gIFxuICAgIENhbGxlbmRhcihjb250YWluZXIsIHtcblxuICAgICAgICAvLyB3aGVuIHRoZSBjYWxlbmRhciBpcyByZWFkeVxuICAgICAgICBvbkluaXQ6IGFzeW5jIChjYWxlbmRhciwgbW9udGhEZXRhaWwpID0+IHtcbiAgICAgICAgICAgIC8vIHByaW50IHRoZSBnb29kIGhlYWRlciBmb3IgdGhlIGV2ZW50IFxuICAgICAgICAgICAgLy8gdXNlIHRoZSBoZWxwZXIgbWV0aG9kcyBmcm9tIHRoZSBjYWxlbmRhclxuICAgICAgICAgICAgbGV0IGQgPSBjYWxlbmRhci5mdWxsRGF0ZVN0cmluZyhuZXcgRGF0ZSgpKVxuICAgICAgICAgICAgcHJpbnREYXRlRXZlbnQoZClcblxuICAgICAgICAgICAgYXdhaXQgc2V0RXZlbnRzKGNhbGVuZGFyLCBtb250aERldGFpbClcbiAgICAgICAgICAgIGNhbGVuZGFyLmNoZWNrRGF5RXZlbnRzKGNhbGVuZGFyLmN1cnJlbnREYXRlKVxuICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgfSxcbiAgICAgICAgXG4gICAgICAgIC8vIHdoZW4gd2UgY2xpY2sgb24gYSBkYXRlIG9uIHRoZSBjYWxlbmRhclxuICAgICAgICAvLyByZXR1cm4gdGhlIGNhbGxlbmRhciBvYmplY3QsIHRoZSBkYXRlIGNsaWNrZWQsIGFuYmQgdGhlIGV2ZW50IG9iamVjdCBhc3NvY2lhdGVkXG4gICAgICAgIG9uRGF0ZVNlbGVjdDogKGNhbGxlbmRhciwgZGF0ZSwgZGF5RXZlbnRzKSA9PiB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIHByaW50IHRoZSBuZXcgaGVhZGVyIGluIHRoZSBldmVudCBzZWN0aW9uXG4gICAgICAgICAgICBsZXQgZCA9IGNhbGxlbmRhci5mdWxsRGF0ZVN0cmluZyhkYXRlKVxuICAgICAgICAgICAgcHJpbnREYXRlRXZlbnQoZClcblxuICAgICAgICAgICAgLy8gcmVzZXQgdGhlIGJsb2NrIGV2ZW50c1xuICAgICAgICAgICAgcmVzZXRCbG9ja0V2ZW50cygpXG4gICAgICAgICAgICByZXNldEJsb2NrU2VsZWN0ZWQoKVxuXG4gICAgICAgICAgICAvLyBpZiBldmVudCBoYXMgZXZlbnREZXRhaWwgKHNwZWNpZmljIHRvIHRoZSBleGFtcGxlICEhIClcbiAgICAgICAgICAgIGlmKGRheUV2ZW50cyAmJiBkYXlFdmVudHMuRXZlbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGRheUV2ZW50cy5FdmVudHMuZm9yRWFjaCggZXYgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyBmaWxsIHRoZSBibG9jayBldmVudCB3aXRoIHRoZSBnb29kIGV2ZW50IGZyb20gdGhlIGRiXG4gICAgICAgICAgICAgICAgICAgIGZpbGxCbG9ja0V2ZW50KGV2KVxuICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGJpbmQgdGhlIGV2ZW50cyBsaXN0ZW5uZXIgb24gdGhlIGV2ZW50IGJsb2NrXG4gICAgICAgICAgICBiaW5kRXZlbnRzQmxvY2tFdmVudHMoZGF0ZSlcbiAgICAgICAgfSxcblxuICAgICAgICBhc3luYyBvbk1vbnRoQ2hhbmdlKGNhbGVuZGFyICwgbW9udGhEZXRhaWwpIHtcbiAgICAgICAgICAgIGF3YWl0IHNldEV2ZW50cyhjYWxlbmRhciwgbW9udGhEZXRhaWwpXG4gICAgICAgIH1cbiAgICB9KVxufVxuXG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbi8vIGdldCB0aGUgZXZlbnRzIGZvciB0aGUgY3VycmVudCBtb250aFxuLy8gbW9udGhEZXRhaWwgPT0ge2RhdGUsIGZpcnN0RGF5LCBsYXN0RGF5LCB5ZWFyfVxuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5jb25zdCBzZXRFdmVudHMgPSBhc3luYyAoY2FsZW5kYXIsIG1vbnRoRGV0YWlsKSA9PiB7XG5cbiAgICAvLyBnZXQgdGhlIGV2ZW50c1xuICAgIGxldCBldmVudHMgPSBhd2FpdCBnZXRFdmVudHMobW9udGhEZXRhaWwuZmlyc3REYXksIG1vbnRoRGV0YWlsLmxhc3REYXkpXG4gICAgZXZlbnRzID0gZXZlbnRzLmRhdGEuY2FsZW5kYXJfZXZlbnRzXG5cbiAgICBpZihldmVudHMubGVuZ3RoKSB7XG4gICAgICAgIC8vIGdldCBvbmx5IHRoZSBldmVudHMgd2l0aCBldmVudHMgZGV0YWlsICggZGVwZW5kIG9mIHlvdXIgYXBwbGljYXRpb24gbG9naWMgb2ZmIGNvdXJzZSAhKVxuICAgICAgICBldmVudHMgPSBldmVudHMuZmlsdGVyKGV2ID0+IGV2LkV2ZW50cy5sZW5ndGgpXG5cbiAgICAgICAgLy8gdGhlbiwgcHVzaCB0aGUgZXZlbnRzIHRvIHRoZSBjYWxlbmRhclxuICAgICAgICAvLyBldmVudHMgPSBbIHtkYXRlOiBvYmplY3QgRGF0ZVRpbWUsIC4uLnt9IH0sIHtldGMuLi59XVxuICAgICAgICBjYWxlbmRhci5zZXRFdmVudHMoZXZlbnRzKVxuICAgIH1cbiAgICByZXR1cm4gZXZlbnRzXG59XG5cblxubGV0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjYWxsZW5kYXInKVxuaWYoY29udGFpbmVyKSB7XG4gICAgaW5pdENhbGVuZGFyKCkgXG59XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iLCJcblxuY29uc3QgcXVlcnlFdmVudHMgPSBgcXVlcnkgZ2V0RXZlbnRzKCRmcm9tOiB0aW1lc3RhbXB0eiEsICR0bzogdGltZXN0YW1wdHohKSB7XG4gICAgY2FsZW5kYXJfZXZlbnRzKHdoZXJlOiB7X29yOiBbXG4gICAgICB7X2FuZDogW3tkYXRlOiB7X2d0ZTogJGZyb219fSwge2RhdGU6IHtfbHQ6ICR0b319XX0sXG4gICAgICB7X2FuZDogW3tkYXRlOiB7X2d0OiAkZnJvbX19LCB7ZGF0ZToge19sdGU6ICR0b319XX0sXG4gICAgXX0pIHtcbiAgICAgIGlkXG4gICAgICBkYXRlXG4gICAgICBFdmVudHMge1xuICAgICAgICBkZXNjcmlwdGlvblxuICAgICAgICBlbmRcbiAgICAgICAgaWRcbiAgICAgICAgaWRfY2FsZW5kYXJfZXZlbnRcbiAgICAgICAgdGl0bGVcbiAgICAgICAgc3RhcnRcbiAgICAgIH1cbiAgICB9XG4gIH1gO1xuXG5jb25zdCBxdWVyeSA9IGFzeW5jIChjb250ZXh0KSA9PiB7XG4gIGNvbnN0IHJlcXVlc3QgPSBhd2FpdCBmZXRjaCgnaHR0cHM6Ly9iYWNrLm15ZmZtZS5mci92MS9ncmFwaHFsJywge1xuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICBcIngtaGFzdXJhLWFkbWluLXNlY3JldFwiOiBcImZmbWUyMDIwKlwiXG4gICAgfSxcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeShjb250ZXh0KVxuICB9KVxuICBjb25zdCBkYXRhID0gYXdhaXQgcmVxdWVzdC5qc29uKClcbiAgLy9hd2FpdCBzbGVlcCgxMDAwKVxuICByZXR1cm4gZGF0YVxufVxuXG5cbmNvbnN0IGdldEV2ZW50cyA9IGFzeW5jIChzdGFydCwgZW5kKSA9PiB7XG4gICAgcmV0dXJuIGF3YWl0IHF1ZXJ5KHtcbiAgICAgIHF1ZXJ5OiBxdWVyeUV2ZW50cyxcbiAgICAgIHZhcmlhYmxlczogeyBcbiAgICAgICAgICBmcm9tOiBzdGFydCxcbiAgICAgICAgICB0bzogZW5kXG4gICAgICAgfSxcbiAgICB9KVxufVxuXG5jb25zdCBib29rRXZlbnRzID0gYXN5bmMgKGRhdGUsIHN0YXJ0LCBlbmQpID0+IHtcblxuICAgIGNvbnNvbGUubG9nKGRhdGUpXG4gICAgY29uc29sZS5sb2coc3RhcnQpXG4gICAgY29uc29sZS5sb2coZW5kKVxufVxuXG5cbmV4cG9ydCB7Z2V0RXZlbnRzLCBib29rRXZlbnRzfSIsIm1vZHVsZS5leHBvcnRzID0gKGVsZW1lbnQsIHNldHRpbmdzKSA9PiB7XG4gICBjb25zdCBjYWxsZW5kYXIgPSByZXF1aXJlKCcuL3NyYy9jYWxsZW5kYXInKVxuICAgaWYoIWVsZW1lbnQpIHsgXG4gICAgICAgY29uc29sZS5lcnJvcignbm90IGEgdmFsaWQgY29udGFpbmVyJylcbiAgICAgICByZXR1cm4gXG4gICB9XG4gICBpZighc2V0dGluZ3MpIHtcbiAgICAgICBzZXR0aW5ncyA9IFtdXG4gICB9XG4gICBcbiAgIG5ldyBjYWxsZW5kYXIoZWxlbWVudCwgc2V0dGluZ3MpXG59XG4iLCJcblxubW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBDYWxsZW5kYXJFdmVudCB7XG5cbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50LCBzZXR0aW5ncykge1xuICAgICAgICB0aGlzLmRlZmF1bHRzID0ge1xuICAgICAgICAgICAgbW9udGhzOiBbJ2phbnZpZXInLCAnZmV2cmllcicsICdtYXJzJywgJ2F2cmlsJywgJ21haScsICdqdWluJywgJ2p1aWxsZXQnLCAnYW91dCcsICdzZXB0ZW1icmUnLCAnb2N0b2JyZScsICdub3ZlbWJyZScsICdkZWNlbWJyZSddLCAvL3N0cmluZyBvZiBtb250aHMgc3RhcnRpbmcgZnJvbSBqYW51YXJ5XG4gICAgICAgICAgICBkYXlzOiBbJ2RpbWFuY2hlJywgJ2x1bmRpJywgJ21hcmRpJywgJ21lcmNyZWRpJywgJ2pldWRpJywgJ3ZlbmRyZWRpJywgJ3NhbWVkaSddLCAvL3N0cmluZyBvZiBkYXlzIHN0YXJ0aW5nIGZyb20gc3VuZGF5XG4gICAgICAgICAgICB0aW1lczogWycxMDowMCcsIFwiMTA6MzBcIiwgXCIxMTowMFwiLCBcIjExOjMwXCIsIFwiMTI6MDBcIl0sXG4gICAgICAgICAgICBkaXNwbGF5WWVhcjogdHJ1ZSwgLy8gZGlzcGxheSB5ZWFyIGluIGhlYWRlclxuICAgICAgICAgICAgZml4ZWRTdGFydERheTogdHJ1ZSwgLy8gV2VlayBiZWdpbiBhbHdheXMgYnkgbW9uZGF5IG9yIGJ5IGRheSBzZXQgYnkgbnVtYmVyIDAgPSBzdW5kYXksIDcgPSBzYXR1cmRheSwgZmFsc2UgPSBtb250aCBhbHdheXMgYmVnaW4gYnkgZmlyc3QgZGF5IG9mIHRoZSBtb250aFxuICAgICAgICAgICAgZGlzcGxheUV2ZW50OiB0cnVlLCAvLyBkaXNwbGF5IGV4aXN0aW5nIGV2ZW50XG4gICAgICAgICAgICBkaXNhYmxlRXZlbnREZXRhaWxzOiBmYWxzZSwgLy8gZGlzYWJsZSBzaG93aW5nIGV2ZW50IGRldGFpbHNcbiAgICAgICAgICAgIGRpc2FibGVFbXB0eURldGFpbHM6IGZhbHNlLCAvLyBkaXNhYmxlIHNob3dpbmcgZW1wdHkgZGF0ZSBkZXRhaWxzXG4gICAgICAgICAgICBldmVudHM6IFt7Li4uc2V0dGluZ3MuZXZlbnRzfV0sIC8vIExpc3Qgb2YgZXZlbnRcbiAgICAgICAgICAgIG9uSW5pdDogZnVuY3Rpb24gKGNhbGVuZGFyLCBtb250aERldGFpbCkge30sIC8vIENhbGxiYWNrIGFmdGVyIGZpcnN0IGluaXRpYWxpemF0aW9uXG4gICAgICAgICAgICBvbkFuaW1hdGlvbk1vbnRoQ2hhbmdlOiBmdW5jdGlvbiAobW9udGgsIHllYXIpIHt9LCAvLyBDYWxsYmFjayBvbiBtb250aCBjaGFuZ2VcbiAgICAgICAgICAgIG9uRGF0ZVNlbGVjdDogZnVuY3Rpb24gKGNhbGVuZGFyLCBkYXRlLCBkYXlFdmVudHMpIHt9LCAvLyBDYWxsYmFjayBvbiBkYXRlIHNlbGVjdGlvblxuICAgICAgICAgICAgb25FdmVudFNlbGVjdDogZnVuY3Rpb24gKCkge30sICAgICAgICAgICAgICAvLyBDYWxsYmFjayBmaXJlZCB3aGVuIGFuIGV2ZW50IGlzIHNlbGVjdGVkICAgICAtIHNlZSAkKHRoaXMpLmRhdGEoJ2V2ZW50JylcbiAgICAgICAgICAgIG9uRXZlbnRDcmVhdGU6IGZ1bmN0aW9uKCAkZWwgKSB7fSwgICAgICAgICAgLy8gQ2FsbGJhY2sgZmlyZWQgd2hlbiBhbiBIVE1MIGV2ZW50IGlzIGNyZWF0ZWQgLSBzZWUgJCh0aGlzKS5kYXRhKCdldmVudCcpXG4gICAgICAgICAgICBvbkRheUNyZWF0ZTogICBmdW5jdGlvbiggJGVsLCBkLCBtLCB5ICkge30sICAvLyBDYWxsYmFjayBmaXJlZCB3aGVuIGFuIEhUTUwgZGF5IGlzIGNyZWF0ZWQgICAtIHNlZSAkKHRoaXMpLmRhdGEoJ3RvZGF5JyksIC5kYXRhKCd0b2RheUV2ZW50cycpXG4gICAgICAgICAgICBvbk1vbnRoQ2hhbmdlOiBmdW5jdGlvbiggY2FsZW5kYXIsIG1vbnRoRGV0YWlsICkge30gLy8gY2FsbGJhY2sgaWYgeW91IHdhbnQgdG8gcHV0IHNvbWUgZXZlbnRzXG4gICAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IHsgLi4udGhpcy5kZWZhdWx0cywgLi4uc2V0dGluZ3N9IC8vIG1lcmdlIGRlcyBvcHRpb25zXG4gICAgICBcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudFxuICAgICAgICB0aGlzLmN1cnJlbnREYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgdGhpcy5pc0NoYW5naW5nID0gZmFsc2UgLy8gaWYgdGhlIHNsaWRlciBpcyBjdXlycmVudGx5IGNoYW5naW5nXG4gICAgICAgIFxuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgIFxuICAgIH1cblxuICAgIC8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgIGluaXQoKSB7XG4gICAgICAgIHZhciBjb250YWluZXIgPSB0aGlzLmVsZW1lbnQ7XG4gICAgICAgIHZhciB0b2RheURhdGUgPSB0aGlzLmN1cnJlbnREYXRlO1xuICAgIFxuICAgICAgICB2YXIgY2FsZW5kYXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICBjYWxlbmRhci5jbGFzc0xpc3QuYWRkKCdjYWxlbmRhcicpXG5cbiAgICAgICAgdmFyIGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2hlYWRlcicpXG4gICAgICAgIGhlYWRlci5pbm5lckhUTUwgPSAnPGgyIGNsYXNzPVwibW9udGhcIj48L2gyPicgK1xuICAgICAgICAnPGEgY2xhc3M9XCJzaW1wbGUtY2FsZW5kYXItYnRuIGJ0bi1wcmV2XCIgaHJlZj1cIiNcIj48L2E+JyArXG4gICAgICAgICc8YSBjbGFzcz1cInNpbXBsZS1jYWxlbmRhci1idG4gYnRuLW5leHRcIiBocmVmPVwiI1wiPjwvYT4nXG4gICAgXG4gICAgXG4gICAgICAgIHRoaXMudXBkYXRlSGVhZGVyKHRvZGF5RGF0ZSwgaGVhZGVyKTtcbiAgICAgICAgY2FsZW5kYXIuYXBwZW5kKGhlYWRlcik7XG5cbiAgICAgICAgdmFyIGNhbGVuZGFyY29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgIGNhbGVuZGFyY29udGVudC5jbGFzc0xpc3QuYWRkKCdjb250ZW50JylcblxuICAgICAgICB2YXIgbmV3Q2FsZW5kYXIgPSB0aGlzLmJ1aWxkQ2FsZW5kYXIodG9kYXlEYXRlKTtcbiAgICAgICAgY2FsZW5kYXJjb250ZW50LmFwcGVuZChuZXdDYWxlbmRhcik7XG5cbiAgICAgICAgY2FsZW5kYXIuYXBwZW5kKGNhbGVuZGFyY29udGVudClcbiAgICAgICAgLy90aGlzLmJ1aWxkQ2FsZW5kYXIodG9kYXlEYXRlLCBjYWxlbmRhcik7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmQoY2FsZW5kYXIpO1xuICAgICAgIFxuICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5vbkluaXQodGhpcywgdGhpcy5nZXRNb250aERldGFpbCgpKTtcbiAgICB9XG4gICAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5cbiAgICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAvLyBzZXQgZXZlbnQgbWV0aG9kc1xuICAgIC8vIEBwYXJhbXMgYXJyYXkgXG4gICAgLy8gb2JqZWN0IG11c3QgaGF2ZSBhIGtleSBkYXRlIGF0IGxlYXN0XG4gICAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgc2V0RXZlbnRzKGV2ZW50cykge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzXG4gICAgICB0aGlzLmV2ZW50cyA9IGV2ZW50c1xuICAgICAgZXZlbnRzLmZvckVhY2goZXZlbnQgPT4ge1xuICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKGV2ZW50LmRhdGUpXG4gICAgICAgIGxldCBkYXlFbGVtZW50ID0gdGhhdC5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3RhYmxlLm5ldyAuZGF5LmRheS0nK2RhdGUuZ2V0RGF0ZSgpKVxuICAgICAgICBpZihkYXlFbGVtZW50KSB7XG4gICAgICAgICAgZGF5RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdoYXMtZXZlbnQnKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcblxuXG4gICAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgLy8gZ2V0IHRoZSBuYW1lIG9mIHRoZSBkYXkgY29ycmVzcG9uZGluZyB0byB0aGUgc2V0dGluZ3NcbiAgICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICBnZXREYXlOYW1lKGluZGV4KSB7XG4gICAgICByZXR1cm4gdGhpcy5zZXR0aW5ncy5kYXlzW2luZGV4XVxuICAgIH1cbiAgICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcblxuXG4gICAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgLy8gZ2V0IHRoZSBuYW1lIG9mIHRoZSBtb250aCBjb3JyZXNwb25kaW5nIHRvIHRoZSBzZXR0aW5nc1xuICAgIC8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgIGdldE1vbnRoTmFtZShpbmRleCkge1xuICAgICAgcmV0dXJuIHRoaXMuc2V0dGluZ3MubW9udGhzW2luZGV4XVxuICAgIH1cbiAgICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcblxuXG4gICAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgLy8gZ2V0IGEgZnVsbCBmb3JtYXRlZCBzdHJpbmcgZGF0ZVxuICAgIC8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgIGZ1bGxEYXRlU3RyaW5nKGRhdGUpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgICBkYXk6IHRoaXMuZ2V0RGF5TmFtZShkYXRlLmdldERheSgpKSxcbiAgICAgICAgIG1vbnRoOiB0aGlzLmdldE1vbnRoTmFtZShkYXRlLmdldE1vbnRoKCkpLFxuICAgICAgICAgeWVhcjogZGF0ZS5nZXRGdWxsWWVhcigpLFxuICAgICAgICAgZDogZGF0ZS5nZXREYXRlKClcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgXG4gICAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgLy8gZ2V0IHRmdWxsIGRldGFpbCBvZiBhIG1vbnRoLCAoY3VycmVudCBkYXRlLCBmaXJzdCBkYXksIGxhc3QgZGF5LCB5ZWFyKVxuICAgIC8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgIGdldE1vbnRoRGV0YWlsKCkge1xuICAgICAgdmFyIHkgPSB0aGlzLmN1cnJlbnREYXRlLmdldEZ1bGxZZWFyKCksIG0gPSB0aGlzLmN1cnJlbnREYXRlLmdldE1vbnRoKCk7XG4gICAgICB2YXIgZmlyc3REYXkgPSBuZXcgRGF0ZSh5LCBtLCAxKTtcbiAgICAgIHZhciBsYXN0RGF5ID0gbmV3IERhdGUoeSwgbSArIDEsIDApO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZGF0ZTogdGhpcy5jdXJyZW50RGF0ZSxcbiAgICAgICAgbW9udGg6IHRoaXMuY3VycmVudERhdGUuZ2V0TW9udGgoKSxcbiAgICAgICAgZmlyc3REYXk6IGZpcnN0RGF5LFxuICAgICAgICBsYXN0RGF5OiBsYXN0RGF5LFxuICAgICAgICB5ZWFyOnksXG4gICAgICB9XG4gICAgfVxuICAgIC8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuXG5cbiAgICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgLy9VcGRhdGUgdGhlIGN1cnJlbnQgbW9udGggaGVhZGVyXG4gICAgIC8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgIHVwZGF0ZUhlYWRlcihkYXRlLCBoZWFkZXIpIHtcbiAgICAgICAgdmFyIG1vbnRoVGV4dCA9IHRoaXMuc2V0dGluZ3MubW9udGhzW2RhdGUuZ2V0TW9udGgoKV07XG4gICAgICAgIG1vbnRoVGV4dCArPSB0aGlzLnNldHRpbmdzLmRpc3BsYXlZZWFyID8gJyA8ZGl2IGNsYXNzPVwieWVhclwiPicgKyBkYXRlLmdldEZ1bGxZZWFyKCkgOiAnPC9kaXY+JztcbiAgICAgICAgaGVhZGVyLnF1ZXJ5U2VsZWN0b3IoJy5tb250aCcpXG4gICAgICAgIGhlYWRlci5xdWVyeVNlbGVjdG9yKCcubW9udGgnKS5pbm5lckhUTUwgPSBtb250aFRleHQ7XG4gICAgfVxuICAgIC8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuXG5cbiAgICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAvL0J1aWxkIGNhbGVuZGFyIG9mIGEgbW9udGggZnJvbSBkYXRlXG4gICAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgYnVpbGRDYWxlbmRhcihmcm9tRGF0ZSkge1xuICAgICAgICB2YXIgcGx1Z2luID0gdGhpcztcbiAgICAgICAgXG4gICAgICAgIC8vIENyZWF0ZSB0aGUgdGFibGUgc3RydWN0dXJlXG4gICAgICAgIHZhciBib2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGFibGUnKTtcbiAgICAgICAgYm9keS5jbGFzc0xpc3QuYWRkKCduZXcnKVxuICAgICAgICB2YXIgdGhlYWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0aGVhZCcpO1xuICAgICAgICB2YXIgdGJvZHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0Ym9keScpO1xuICBcbiAgICAgICAgLy9zZXQgY3VycmVudCB5ZWFyIGFuZCBtb250aFxuICAgICAgICB2YXIgeSA9IGZyb21EYXRlLmdldEZ1bGxZZWFyKCksIG0gPSBmcm9tRGF0ZS5nZXRNb250aCgpO1xuICAgICAgICAvL3NldCBmaXJzdCBkYXkgb2YgdGhlIG1vbnRoXG4gICAgICAgIHZhciBmaXJzdERheSA9IG5ldyBEYXRlKHksIG0sIDEpO1xuXG4gICAgICAgIC8vc2V0IGxhc3QgZGF5IG9mIHRoZSBtb250aFxuICAgICAgICB2YXIgbGFzdERheSA9IG5ldyBEYXRlKHksIG0gKyAxLCAwKTtcbiAgICAgICAgXG4gICAgICAgIC8vc2V0ICBzdGFydCBkYXkgb2Ygd2Vla3NcbiAgICAgICAgdmFyIHN0YXJ0RGF5T2ZXZWVrID0gZmlyc3REYXkuZ2V0RGF5KCk7XG4gIFxuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5maXhlZFN0YXJ0RGF5ICE9PSBmYWxzZSkge1xuICAgICAgICAgIC8vIEJhY2t3YXJkIGNvbXBhdGliaWxpdHlcbiAgICAgICAgICBzdGFydERheU9mV2VlayA9ICB0aGlzLnNldHRpbmdzLmZpeGVkU3RhcnREYXkgPyAxIDogdGhpcy5zZXR0aW5ncy5maXhlZFN0YXJ0RGF5O1xuICBcbiAgICAgICAgICAvLyBJZiBmaXJzdCBkYXkgb2YgbW9udGggaXMgZGlmZmVyZW50IG9mIHN0YXJ0RGF5T2ZXZWVrXG4gICAgICAgICAgd2hpbGUgKGZpcnN0RGF5LmdldERheSgpICE9PSBzdGFydERheU9mV2Vlaykge1xuICAgICAgICAgICAgZmlyc3REYXkuc2V0RGF0ZShmaXJzdERheS5nZXREYXRlKCkgLSAxKTtcbiAgICAgICAgICB9XG4gICAgICAgXG4gICAgICAgICAgLy8gSWYgbGFzdCBkYXkgb2YgbW9udGggaXMgZGlmZmVyZW50IG9mIHN0YXJ0RGF5T2ZXZWVrICsgN1xuICAgICAgICAgIHdoaWxlIChsYXN0RGF5LmdldERheSgpICE9PSAoKHN0YXJ0RGF5T2ZXZWVrICsgNykgJSA3KSkge1xuICAgICAgICAgICAgbGFzdERheS5zZXREYXRlKGxhc3REYXkuZ2V0RGF0ZSgpICsgMSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gIFxuICAgICAgICAvL0hlYWRlciBkYXkgaW4gYSB3ZWVrICggKHggdG8geCArIDcpICUgNyB0byBzdGFydCB0aGUgd2VlayBieSBtb25kYXkgaWYgeCA9IDEpXG4gICAgICAgIGZvciAodmFyIGkgPSBzdGFydERheU9mV2VlazsgaSA8IHN0YXJ0RGF5T2ZXZWVrICsgNzsgaSsrKSB7XG4gICAgICAgICAgdmFyIHRkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKVxuICAgICAgICAgIHRkLmlubmVySFRNTCA9ICB0aGlzLnNldHRpbmdzLmRheXNbaSAlIDddLnN1YnN0cmluZygwLCAzKVxuICAgICAgICAgIHRoZWFkLmFwcGVuZCh0ZCk7XG4gICAgICAgIH1cblxuICAgICAgICAvL0ZvciBmaXJzdERheSB0byBsYXN0RGF5XG4gICAgICAgIGZvciAodmFyIGRheSA9IGZpcnN0RGF5OyBkYXkgPD0gbGFzdERheTsgZGF5LnNldERhdGUoZGF5LmdldERhdGUoKSkpIHtcbiAgICAgIFxuICAgICAgICAgdmFyIHRyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKVxuICAgICAgICAgIC8vRm9yIGVhY2ggcm93XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA3OyBpKyspIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdkZmQnKVxuICAgICAgICAgICAgdmFyIHRkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKVxuICAgICAgICAgICAgdGQuaW5uZXJIVE1MID0gJzxkaXYgY2xhc3M9XCJkYXkgZGF5LScrZGF5LmdldERhdGUoKSsnXCIgZGF0YS1kYXRlPVwiJyArIGRheS50b0lTT1N0cmluZygpICsgJ1wiPicgKyBkYXkuZ2V0RGF0ZSgpICsgJzwvZGl2Pic7XG4gICAgICAgICAgICB2YXIgJGRheSA9IHRkLnF1ZXJ5U2VsZWN0b3IoJy5kYXknKTtcbiAgXG4gICAgICAgICAgICAvL2lmIHRvZGF5IGlzIHRoaXMgZGF5XG4gICAgICAgICAgICBpZiAoZGF5LnRvRGF0ZVN0cmluZygpID09PSAobmV3IERhdGUpLnRvRGF0ZVN0cmluZygpKSB7XG4gICAgICAgICAgICAgICRkYXkuY2xhc3NMaXN0LmFkZChcInRvZGF5XCIpO1xuICAgICAgICAgICAgfVxuICBcbiAgICAgICAgICAgIC8vaWYgZGF5IGlzIG5vdCBpbiB0aGlzIG1vbnRoXG4gICAgICAgICAgICBpZiAoZGF5LmdldE1vbnRoKCkgIT0gZnJvbURhdGUuZ2V0TW9udGgoKSkge1xuICAgICAgICAgICAgICAkZGF5LmNsYXNzTGlzdC5hZGQoXCJ3cm9uZy1tb250aFwiKTtcbiAgICAgICAgICAgIH1cbiAgXG4gICAgICAgICAgICAvLyBmaWx0ZXIgdG9kYXkncyBldmVudHNcbiAgICAgICAgICAgIGRheS5zZXRIb3VycygxMiwwLDApO1xuICAgICAgICAgICAgLy8gdmFyIHRvZGF5RXZlbnRzID0gdGhpcy5nZXREYXRlRXZlbnRzKGRheSk7XG4gIFxuICAgICAgICAgICAgLy8gaWYgKHRvZGF5RXZlbnRzLmxlbmd0aCAmJiB0aGlzLnNldHRpbmdzLmRpc3BsYXlFdmVudCkge1xuICAgICAgICAgICAgLy8gICAkZGF5LmNsYXNzTGlzdC5hZGQoXCJoYXMtZXZlbnRcIik7XG4gICAgICAgICAgICAvLyB9XG4gIFxuICAgICAgICAgICAgLy8gLy8gYXNzb2NpYXRlIHNvbWUgZGF0YSBhdmFpbGFibGUgZnJvbSB0aGUgb25EYXlDcmVhdGUgY2FsbGJhY2tcbiAgICAgICAgICAgIC8vICRkYXkuZGF0YXNldC50b2RheUV2ZW50cyA9IHRvZGF5RXZlbnRzO1xuICBcbiAgICAgICAgICAgIC8vIHNpbXBsaWZ5IGZ1cnRoZXIgY3VzdG9taXphdGlvblxuICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5vbkRheUNyZWF0ZSggJGRheSwgZGF5LmdldERhdGUoKSwgbSwgeSApO1xuICBcbiAgICAgICAgICAgIHRyLmFwcGVuZCh0ZCk7XG4gICAgICAgICAgICBkYXkuc2V0RGF0ZShkYXkuZ2V0RGF0ZSgpICsgMSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRib2R5LmFwcGVuZCh0cik7XG4gICAgICAgIH1cbiAgXG4gICAgICAgIGJvZHkuYXBwZW5kKHRoZWFkKTtcbiAgICAgICAgYm9keS5hcHBlbmQodGJvZHkpO1xuICAgICBcbiAgICAgXG4gICAgICAgIHJldHVybiBib2R5XG4gICAgfVxuICAgIC8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuXG4gICAgXG4gICAgXG4gIC8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgIC8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgIGNoYW5nZU1vbnRoKHZhbHVlKSB7XG4gICAgICAvLyBpZiBjYWxlbmRhciBpcyBhY3R1YWxseSBtb3Zpbmc9PnJldHVyblxuICAgICAgaWYoICEgdGhpcy5pc0NoYW5naW5nKSB7XG4gICAgICAgIHRoaXMuaXNDaGFuZ2luZyA9IHRydWVcbiAgICAgIH1lbHNlIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIHZhciBjYWxlbmRhcmNvbnRlbnQgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnQnKVxuXG4gICAgICAvLyBTZXQgdGhlIGRpcmVjdGlvblxuICAgICAgdmFyIGRpcmVjdGlvbiA9IFwiXCJcbiAgICAgIGlmKHZhbHVlID09IDEpIGRpcmVjdGlvbiA9ICdyaWdodC10by1sZWZ0J1xuICAgICAgaWYodmFsdWUgPT0gLTEpe1xuICAgICAgICBkaXJlY3Rpb24gPSAnbGVmdC10by1yaWdodCdcbiAgICAgICAgY2FsZW5kYXJjb250ZW50LmNsYXNzTGlzdC5hZGQoJ3JldmVyc2UnKVxuICAgICAgfVxuXG4gICAgICB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcigndGFibGUubmV3JykuY2xhc3NMaXN0LmFkZCgnb2xkJylcbiAgICAgIHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCd0YWJsZS5uZXcnKS5jbGFzc0xpc3QucmVtb3ZlKCduZXcnKVxuICAgICAgXG4gICAgICAvLyB1cGRhdGUgdGVoIGN1cnJlbnQgZGF0ZSBoZWFkZXJcbiAgICAgIHRoaXMuY3VycmVudERhdGUuc2V0TW9udGgodGhpcy5jdXJyZW50RGF0ZS5nZXRNb250aCgpICsgdmFsdWUsIDEpO1xuICAgICAgdGhpcy51cGRhdGVIZWFkZXIodGhpcy5jdXJyZW50RGF0ZSwgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYWxlbmRhciBoZWFkZXInKSk7XG5cbiAgICAgIC8vIGJ1aWxkIHRoZSBuZXh0IG1vbnRoIGNhbGVuZGFyXG4gICAgICB2YXIgbmV3Q2FsZW5kYXIgPSAgdGhpcy5idWlsZENhbGVuZGFyKHRoaXMuY3VycmVudERhdGUpO1xuXG4gICAgICAvLyBtb3ZlIG9sZCBhbmQgbmV4dCBjYWxlbmRhclxuICAgICAgY2FsZW5kYXJjb250ZW50LmFwcGVuZChuZXdDYWxlbmRhcilcblxuICAgICAgdmFyIHRoYXQgPSB0aGlzXG5cbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXsgXG4gICAgICAgICAgdGhhdC5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3RhYmxlLm9sZCcpLmNsYXNzTGlzdC5hZGQoJ21vdmUnLCAnZW50ZXItJytkaXJlY3Rpb24pXG4gICAgICAgICAgdGhhdC5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3RhYmxlLm5ldycpLmNsYXNzTGlzdC5hZGQoJ21vdmUnLCAnZW50ZXItJytkaXJlY3Rpb24pXG4gICAgICAgICAgXG4gICAgICAgICAgbGV0IHRyYW5zaXRpb25FbmRFdmVudE5hbWUgPSB0aGF0LmdldFRyYW5zaXRpb25FbmRFdmVudE5hbWUoKTtcblxuICAgICAgICAgIHRoYXQuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCd0YWJsZS5uZXcnKS5hZGRFdmVudExpc3RlbmVyKHRyYW5zaXRpb25FbmRFdmVudE5hbWUsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhhdC5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3RhYmxlLm5ldycpLmNsYXNzTGlzdC5yZW1vdmUoJ21vdmUnLCAnZW50ZXItJytkaXJlY3Rpb24pXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICB0aGF0LmVsZW1lbnQucXVlcnlTZWxlY3RvcigndGFibGUub2xkJykuYWRkRXZlbnRMaXN0ZW5lcih0cmFuc2l0aW9uRW5kRXZlbnROYW1lLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRoYXQuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCd0YWJsZS5vbGQnKS5yZW1vdmUoKVxuICAgICAgICAgICAgY2FsZW5kYXJjb250ZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3JldmVyc2UnKVxuICAgICAgICAgICAgdGhhdC5pc0NoYW5naW5nID0gZmFsc2VcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB0aGF0LmJpbmRDYWxlbmRhckV2ZW50KClcbiAgICAgICAgfSwgNTAsIGRpcmVjdGlvbik7XG4gICAgICAgIC8vIGhvb2sgXG5cbiAgICAgICAgLy8gdGhpcy5zZXR0aW5ncy5vbkFuaW1hdGlvbk1vbnRoQ2hhbmdlKHRoaXMuY3VycmVudERhdGUuZ2V0TW9udGgoKSwgdGhpcy5jdXJyZW50RGF0ZS5nZXRGdWxsWWVhcigpKVxuICAgIFxuICAgICAgICB0aGlzLnNldHRpbmdzLm9uTW9udGhDaGFuZ2UodGhpcywgdGhpcy5nZXRNb250aERldGFpbCgpKTtcblxuICAgIH1cblxuXG4gICAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgZ2V0VHJhbnNpdGlvbkVuZEV2ZW50TmFtZSgpIHtcbiAgICAgIHZhciB0cmFuc2l0aW9ucyA9IHtcbiAgICAgICAgICBcInRyYW5zaXRpb25cIiAgICAgIDogXCJ0cmFuc2l0aW9uZW5kXCIsXG4gICAgICAgICAgXCJPVHJhbnNpdGlvblwiICAgICA6IFwib1RyYW5zaXRpb25FbmRcIixcbiAgICAgICAgICBcIk1velRyYW5zaXRpb25cIiAgIDogXCJ0cmFuc2l0aW9uZW5kXCIsXG4gICAgICAgICAgXCJXZWJraXRUcmFuc2l0aW9uXCI6IFwid2Via2l0VHJhbnNpdGlvbkVuZFwiXG4gICAgICAgIH1cbiAgICAgIGxldCBib2R5U3R5bGUgPSBkb2N1bWVudC5ib2R5LnN0eWxlO1xuICAgICAgZm9yKGxldCB0cmFuc2l0aW9uIGluIHRyYW5zaXRpb25zKSB7XG4gICAgICAgICAgaWYoYm9keVN0eWxlW3RyYW5zaXRpb25dICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICByZXR1cm4gdHJhbnNpdGlvbnNbdHJhbnNpdGlvbl07XG4gICAgICAgICAgfSBcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICBpc0RheUJldHdlZW4oZCwgZFN0YXJ0LCBkRW5kKSB7XG4gICAgICBkU3RhcnQuc2V0SG91cnMoMCwwLDApO1xuICAgICAgZEVuZC5zZXRIb3VycygyMyw1OSw1OSw5OTkpO1xuICAgICAgcmV0dXJuIHRydWVcbiAgICAgIC8vIHJldHVybiBkU3RhcnQgPD0gZCAmJiBkIDw9IGRFbmQ7XG4gICAgfVxuXG5cbiAgICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICBiaW5kRXZlbnRzKCkge1xuXG4gICAgICB2YXIgdGhhdCA9IHRoaXNcblxuICAgICAgLy9DbGljayBwcmV2aW91cyBtb250aFxuICAgICAgdGhhdC5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnRuLXByZXZcIikuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoIGUgKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ3ByZXZpb3VzIG1vbnRoJylcbiAgICAgICAgICB0aGF0LmNoYW5nZU1vbnRoKC0xKVxuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH0pO1xuXG4gICAgICAvL0NsaWNrIG5leHQgbW9udGhcbiAgICAgIHRoYXQuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ0bi1uZXh0XCIpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCBlICkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCduZXh0IG1vbnRoJylcbiAgICAgICAgICB0aGF0LmNoYW5nZU1vbnRoKDEpXG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfSk7XG4gICAgICBcbiAgICAgIHRoaXMuYmluZENhbGVuZGFyRXZlbnQoKVxuIFxuICAgIH1cblxuXG4gICAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgYmluZENhbGVuZGFyRXZlbnQoKSB7XG5cbiAgICAgIHZhciB0aGF0ID0gdGhpc1xuXG4gICAgICB0aGF0LmVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChcInRhYmxlLm5ldyAuZGF5XCIpLmZvckVhY2goZGF5ID0+IHtcblxuICAgICAgICBkYXkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgdGhhdC5yZXNldFNlbGVjdGVkRGF5KClcbiAgICAgICAgICAgZGF5LmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJylcbiAgICAgICAgICAgdGhhdC5jaGVja0RheUV2ZW50cyhuZXcgRGF0ZShkYXkuZGF0YXNldC5kYXRlKSlcbiAgICAgICAgfSlcblxuICAgICAgfSlcbiAgICB9XG4gICAgXG4gICAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgLy8gY2xpY2sgb24gYSBkYXksIHNlbGVjdCBpdCBhbmQgY2hlY2sgZm9yIGV2ZW50cyBkZXRhaWxzXG4gICAgY2hlY2tEYXlFdmVudHMoZGF0ZSkge1xuICAgICAgICB2YXIgZGF5RXZlbnRzID0gdGhpcy5ldmVudHMuZmluZChldiA9PiB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBEYXRlKGV2LmRhdGUpLnRvRGF0ZVN0cmluZygpID09PSBkYXRlLnRvRGF0ZVN0cmluZygpXG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMuc2V0dGluZ3Mub25EYXRlU2VsZWN0KHRoaXMsIGRhdGUsIGRheUV2ZW50cyk7XG4gICAgfVxuXG5cbiAgICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICByZXNldFNlbGVjdGVkRGF5KCkge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzXG4gICAgICB0aGF0LmVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChcInRhYmxlLm5ldyAuZGF5XCIpLmZvckVhY2goZGF5ID0+IHtcbiAgICAgICAgICBkYXkuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKVxuICAgICAgfSlcbiAgICB9XG5cblxufVxuXG5cbiJdLCJzb3VyY2VSb290IjoiIn0=