import {Component} from "react";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick

class FullCalendarReservas extends Component {

    handleDateClick = (arg) => {
        alert(arg.dateStr)
    }

    render() {
        return(
            <FullCalendar
                plugins={[ dayGridPlugin,interactionPlugin ]}
                initialView="dayGridMonth"
                dateClick={this.handleDateClick}
                events={[
                    { title: 'event 1', date: '2022-02-27' },
                    { title: 'event 2', date: '2022-02-27' }
                ]}
            />
        )
    }
}

export default FullCalendarReservas;