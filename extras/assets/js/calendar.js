document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        
        headerToolbar: {
            start: "prevYear,nextYear",
            center: "title",
            end: "today prev,next"
        },
        
        initialView: 'dayGridMonth',
        themeSystem: 'bootstrap5'
    });
    calendar.render();
});