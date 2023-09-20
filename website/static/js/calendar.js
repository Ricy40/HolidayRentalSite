
document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        selectable: true,

        headerToolbar: {
            start: "prevYear,nextYear",
            center: "title",
            end: "today prev,next"
        },

        events: getEventsF(),

        dateClick: function(info) {

            var date = new Date(info.dateStr + 'T00:00:00');

            if (!isNaN(date.valueOf())) {

                var events = calendar.getEvents();
                console.log(events);

                for (entry in events) {
                    event = events[entry];
                    if (event.startStr === info.dateStr) {
                        event.remove();
                        alert('Removed Events...');
                        return;
                    }
                }

                calendar.addEvent({
                    start: date,
                    allDay: true,
                    display: 'background',
                    color: "#ffa3a3"
                });
                alert('Great. Now, update your database...');

                var events = calendar.getEvents();
                var eventsStart = events.map(function(event) { return event.start });
                var eventStr = JSON.stringify(eventsStart);

                console.log(eventStr);
                sendData(eventStr);

            } else {
                alert('Invalid date.');
            }
        },


        //select: function(info) {
        //    alert('selected ' + info.startStr + ' to ' + info.endStr);
        //},

        initialView: 'dayGridMonth',
        themeSystem: 'bootstrap5'

    });
    calendar.render();
});


function sendData(data) {
    
    console.log("Sending data: " + data);
    
    $.post( "/calendar", {
        startDates: data
    });
}

function getEventsF() {
    data = getData();
    console.log(data);

    if (data) {
        dates = JSON.parse(data);
        console.log(dates);

        events = [];

        for (date in dates) {
            console.log(date);

            events.push({
                start: date,
                allDay: true,
                display: 'background',
                color: "#ffa3a3"
            })
        }
        console.log(events);
        return events;
    } else {
        return [];
    }
}


function getData() {
    $.ajax({
        url: '/process',
        type: 'POST',
        success: function(response) {
            return response
        },
        error: function(error) {
            console.log(error);
        }
    });
}