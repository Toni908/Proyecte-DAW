import React, {Component} from "react";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import es from '@fullcalendar/core/locales/es';
import ca from '@fullcalendar/core/locales/ca';
import { LocaleContext } from "../../LocaleContext.js";

class FullCalendarReservas extends Component {

    handleDateClick = (arg) => {
        alert(arg.dateStr)
    }

    render() {
        const {reservas, dia_minimo} = this.props;
        let ArrayReservas = getArrayReservas(reservas);

        if (LocaleContext._currentValue==="es") {
            return (
                <FullCalendar
                    locale={es}
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    dateClick={this.handleDateClick}
                    events={[
                        {title: 'event 1', date: '2022-02-27'},
                        {title: 'event 2', date: '2022-02-27'}
                    ]}
                />
            )
        } else if (LocaleContext._currentValue==="ca") {
            return (
                <FullCalendar
                    locale={ca}
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    dateClick={this.handleDateClick}
                    events={[
                        {title: 'event 1', date: '2022-02-27'},
                        {title: 'event 2', date: '2022-02-27'}
                    ]}
                />
            )
        } else {
            return (
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    dateClick={this.handleDateClick}
                    events={[
                        {title: 'event 1', date: '2022-02-27', durationEditable: "02:00"},
                        {title: 'event 2', date: '2022-02-27'}
                    ]}
                />
            )
        }
    }
}

function getArrayReservas(reservas) {
    let array = [];
}

export default FullCalendarReservas;