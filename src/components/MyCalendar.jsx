import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { localizer, getMessagesES } from "../helpers";
import { addHours } from "date-fns";
import { CalendarEvent } from "./calendar/CalendarEvent";
import { useState } from "react";
import { CalendarModal } from "./calendar-modal/CalendarModal";

const events = [
  {
    title: "cumplea;os del jefe",
    notes: "hay",
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: "#fafafa",
    user: {
      _id: "123",
      name: "meli meli",
    },
  },
];

export const MyCalendar = () => {

  const [lastView, setLastView] = useState(localStorage.getItem('lastView' || 'week'))
  
  const eventStyleGetter = (event, start, ende, isSelected) => {

    const style = {
      backgroundColor: '#347CF7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'

    }

    return style


  };

  const onDoubleClick = (event) => {
    console.log({doubleClick: event})
  }
  const onSelect = (event) => {
    console.log({click: event})
  }
  const onViewChanged = (event) => {
    console.log({viewChanged: event})
    localStorage.setItem('lastView',event)
  }

  return (
    <div className="w-full">
      <Calendar
        culture="es"
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc(100vh - 80px" }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
        
      />
      <CalendarModal/>
    </div>
  );
};
