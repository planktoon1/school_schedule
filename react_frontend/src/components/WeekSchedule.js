import React from "react";
import PropTypes from "prop-types";

/*  WeekSchedule Component
    Renders a table representing a schoolweek (monday-friday)
    props: takes a "week" prop which is an object representing a school week.
    See default prop for the week structure
*/

function WeekSchedule(props) {
  const calendarRows = props.week.classStart.map(time => {
    return (
      <tr key={time}>
        <td>{time}</td>
        <td>{props.week[props.week.datesInWeek[0]][time]}</td>
        <td>{props.week[props.week.datesInWeek[1]][time]}</td>
        <td>{props.week[props.week.datesInWeek[2]][time]}</td>
        <td>{props.week[props.week.datesInWeek[3]][time]}</td>
        <td>{props.week[props.week.datesInWeek[4]][time]}</td>
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
            <th>Mandag ({Object.keys(props.week)[2]})</th>
            <th>Tirsdag ({Object.keys(props.week)[3]})</th>
            <th>Onsdag ({Object.keys(props.week)[4]})</th>
            <th>Torsdag ({Object.keys(props.week)[5]})</th>
            <th>Fredag ({Object.keys(props.week)[6]})</th>
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