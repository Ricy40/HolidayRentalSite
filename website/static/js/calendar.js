
document.addEventListener('DOMContentLoaded', function() {

    var calendarEl = document.getElementById('calendar-admins');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        selectable: true,

        headerToolbar: {
            start: "prevYear,nextYear",
            center: "title",
            end: "today prev,next"
        },

        dateClick: function(info) {

            var date = new Date(info.dateStr + 'T00:00:00');

            if (!isNaN(date.valueOf())) {

                var events = calendar.getEvents();
                console.log(events);

                for (entry in events) {
                    event = events[entry];
                    if (event.startStr === info.dateStr) {
                        event.remove();
                        var events = calendar.getEvents();
                        var eventsStart = events.map(function(event) { return event.start });
                        var eventStr = JSON.stringify(eventsStart);
                        sendData(eventStr);
                        return;
                    }
                }

                calendar.addEvent({
                    start: date,
                    allDay: true,
                    display: 'background',
                    color: "#ffa3a3"
                });

                var events = calendar.getEvents();
                var eventsStart = events.map(function(event) { return event.start });
                var eventStr = JSON.stringify(eventsStart);
                sendData(eventStr);

            } else {
                alert('Invalid date.');
            }
        },

        initialView: 'dayGridMonth',
        themeSystem: 'bootstrap5'

    });

    $.get({
        url: '/process',
        type: 'POST',
        success: function(data) {
            if (data) {
                dates = data.split(", ");
                var events = [];

                for (date in dates) {
                    event = {
                        start: dates[date],
                        allDay: true,
                        display: 'background',
                        color: "#ffa3a3"
                    };
                    events.push(event)
                }
                calendar.addEventSource(events);
                calendar.render();
            } else {
                calendar.render();
            }
        },
        error: function(error) {
            console.log(error);
        }
    });
});


function sendData(data) {
    console.log("Sending data: " + data);
    $.post( "/calendar", {
        startDates: data
    });
}

// If not admin

document.addEventListener('DOMContentLoaded', function() {

    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        selectable: true,

        headerToolbar: {
            start: "prevYear,nextYear",
            center: "title",
            end: "today prev,next"
        },

        initialView: 'dayGridMonth',
        themeSystem: 'bootstrap5'

    });

    $.get({
        url: '/process',
        type: 'POST',
        success: function(data) {
            if (data) {
                dates = data.split(", ");
                var events = [];

                for (date in dates) {
                    event = {
                        start: dates[date],
                        allDay: true,
                        display: 'background',
                        color: "#ffa3a3"
                    };
                    events.push(event)
                }
                calendar.addEventSource(events);
                calendar.render();
            } else {
                calendar.render();
            }
        },
        error: function(error) {
            console.log(error);
        }
    });
});