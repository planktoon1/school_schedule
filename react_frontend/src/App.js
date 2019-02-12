import React, { useState } from "react";

// Main Component
function App() {
  return (
    <div className="App">
      <Calendar />
    </div>
  );
}


// ========================================
// Calendar Component
function Calendar(props) {
  // State
  const [currentWeek, ChangeWeek] = useState({
    classStart: ['08:30', '10:30', '12:30', '14:30'],
    Mandag: {date: '28/01'},
    Tirsdag: {date: '29/01'},
    Onsdag: {date: '30/01'},
    Torsdag: {date: '31/01', '08:30': 'Algoritmer JHAJ SH-A1.13', '10:30': 'Algoritmer JHAJ SH-A1.13'},
    Fredag: {date: '01/02'},
  });

  const calendarRows = currentWeek.classStart.map((time) => {
    return(
      <tr key={time}>
        <td>{time}</td>
        <td>{currentWeek.Mandag[time]}</td>
        <td>{currentWeek.Tirsdag[time]}</td>
        <td>{currentWeek.Onsdag[time]}</td>
        <td>{currentWeek.Torsdag[time]}</td>
        <td>{currentWeek.Fredag[time]}</td>
      </tr>
    );
  });

  return(
    <div className="calendarWrapper"> 
     <h2>Calendar</h2>
      <table>
        <thead>
        <tr>
          <th></th>
          <th>Mandag  ({currentWeek.Mandag.date})</th>
          <th>Tirsdag ({currentWeek.Tirsdag.date})</th>
          <th>Onsdag ({currentWeek.Onsdag.date})</th>
          <th>Torsdag ({currentWeek.Torsdag.date})</th>
          <th>Fredag ({currentWeek.Fredag.date})</th>
        </tr>
        </thead>
        <tbody>
          {calendarRows}
        </tbody>
      </table>
    </div>
  );
}

// ========================================
export default App;