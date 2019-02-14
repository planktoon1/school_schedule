import React, { useState } from "react";
import PropTypes from "prop-types";

/*  WeekSchedule Component
    Renders a table representing a schoolweek (monday-friday)
    props: takes a "week" prop which is an object representing a school week.
    See default prop for the week structure
*/

function WeekSchedule(props) {
  // State
  const [currentWeek, ChangeWeek] = useState(props.week);

  const calendarRows = currentWeek.classStart.map(time => {
    return (
      <tr key={time}>
        <td>{time}</td>
        <td>{currentWeek[currentWeek.datesInWeek[0]][time]}</td>
        <td>{currentWeek[currentWeek.datesInWeek[1]][time]}</td>
        <td>{currentWeek[currentWeek.datesInWeek[2]][time]}</td>
        <td>{currentWeek[currentWeek.datesInWeek[3]][time]}</td>
        <td>{currentWeek[currentWeek.datesInWeek[4]][time]}</td>
      </tr>
    );
  });

  return (
    <div className="calendarWrapper">
      <h2>Calendar</h2>
      <table>
        <thead>
          <tr>
            <th />
            <th>Mandag ({Object.keys(currentWeek)[2]})</th>
            <th>Tirsdag ({Object.keys(currentWeek)[3]})</th>
            <th>Onsdag ({Object.keys(currentWeek)[4]})</th>
            <th>Torsdag ({Object.keys(currentWeek)[5]})</th>
            <th>Fredag ({Object.keys(currentWeek)[6]})</th>
          </tr>
        </thead>
        <tbody>{calendarRows}</tbody>
      </table>
    </div>
  );
}

WeekSchedule.propTypes = {
  week: PropTypes.object
};

WeekSchedule.defaultProps = {
  week: {
    classStart: ["08:30", "10:30", "12:30", "14:30"],
    datesInWeek: ["2019-1-1", "2019-1-2", "2019-1-3", "2019-1-4", "2019-1-5"],
    "2019-1-1": { "08:30": "FRI" },
    "2019-1-2": { "10:30": "FRI" },
    "2019-1-3": { "12:30": "FRI" },
    "2019-1-4": { "14:30": "FRI" },
    "2019-1-5": {
      "08:30": "FRI",
      "10:30": "FRI",
      "12:30": "FRI",
      "14:30": "FRI"
    }
  }
};

export default WeekSchedule;