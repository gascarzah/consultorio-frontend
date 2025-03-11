
import { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
export const MyCalendar = () => {
  const [dateRange, setDateRange] = useState(null);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Calendario</h2>
      <Calendar
        onChange={setDateRange}
        value={dateRange}
        selectRange={true}
      />
    </div>
  );
};
