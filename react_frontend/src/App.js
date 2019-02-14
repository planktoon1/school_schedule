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

// --------------------------- UTILITY ---------------------------

// Returns the weeknumber of the date
Date.prototype.getWeek = function() {
  var onejan = new Date(this.getFullYear(),0,1);
  return Math.ceil((((this - onejan) / 86400000) + onejan.getDay())/7);
}

// Extracts the activities from the specified week and returns a "week schedule"
function getWeekFromSchedule(schedule, week) {
  const datesInWeek = Object.keys(schedule).filter(date => new Date(date).getWeek() === week)
  const weekSchedule = {};
  datesInWeek.forEach(date => {weekSchedule[date] = schedule[date]});
  return weekSchedule;
}

const schedule = { '2019-1-28': { '08:30': 'IOS KSD SH-A2.03', '10:30': 'IOS KSD SH-A2.03' },
'2019-1-30': { '08:30': 'IOS KSD SH-A2.03', '10:30': 'IOS KSD SH-A2.03' },
'2019-1-31':
 { '08:30': 'Algoritmer JHAJ SH-A1.13',
   '10:30': 'Algoritmer JHAJ SH-A1.13' },
'2019-2-1':
 { '08:30': 'Programmeringssprog PEJU SH-A2.02',
   '10:30': 'Programmeringssprog PEJU SH-A2.02' },
'2019-2-11': { '08:30': 'IOS KSD SH-A2.03', '10:30': 'IOS KSD SH-A2.03' },
'2019-2-12':
 { '08:30': 'Programmeringssprog MJU SH-A1.13',
   '10:30': 'Programmeringssprog MJU SH-A1.13' },
'2019-2-13': { '08:30': 'IOS KSD SH-A2.03', '10:30': 'IOS KSD SH-A2.03' },
'2019-2-19':
 { '08:30': 'Programmeringssprog MJU SH-A1.13',
   '10:30': 'Programmeringssprog MJU SH-A1.13' },
'2019-2-20': { '08:30': 'IOS KSD SH-A2.03', '10:30': 'IOS KSD SH-A2.03' },
'2019-2-25': { '08:30': 'IOS KSD SH-A2.03', '10:30': 'IOS KSD SH-A2.03' },
'2019-2-26':
 { '08:30': 'Programmeringssprog MJU SH-A1.19B',
   '10:30': 'Programmeringssprog MJU SH-A1.19B',
   '12:30': 'Programmeringssprog MJU SH-A1.19B' },
'2019-2-27': { '08:30': 'IOS KSD SH-A2.03', '10:30': 'IOS KSD SH-A2.03' },
'2019-2-28':
 { '08:30': 'Algoritmer JHAJ SH-A1.13',
   '10:30': 'Algoritmer JHAJ SH-A1.13' },
'2019-2-4':
 { '08:30': 'Algoritmer JHAJ SH-A2.02',
   '10:30': 'Algoritmer JHAJ SH-A2.02' },
'2019-2-5':
 { '08:30': 'Programmeringssprog MJU SH-A1.13',
   '10:30': 'Programmeringssprog MJU SH-A1.13' },
'2019-2-6': { '08:30': 'IOS KSD SH-A2.03', '10:30': 'IOS KSD SH-A2.03' },
'2019-2-7':
 { '08:30': 'Algoritmer JHAJ SH-A1.13',
   '10:30': 'Algoritmer JHAJ SH-A1.13' },
'2019-2-8':
 { '08:30': 'Programmeringssprog PEJU SH-A2.02',
   '10:30': 'Programmeringssprog PEJU SH-A2.02' },
'2019-3-1':
 { '08:30': 'Programmeringssprog PEJU SH-A2.02',
   '10:30': 'Programmeringssprog PEJU SH-A2.02' },
'2019-3-11':
 { '08:30': 'Algoritmer JHAJ SH-A1.19B',
   '10:30': 'Algoritmer JHAJ SH-A1.19B' },
'2019-3-13': { '08:30': 'IOS KSD SH-A2.03', '10:30': 'IOS KSD SH-A2.03' },
'2019-3-14':
 { '08:30': 'Algoritmer JHAJ SH-A1.13',
   '10:30': 'Algoritmer JHAJ SH-A1.13' },
'2019-3-15':
 { '08:30': 'Programmeringssprog PEJU SH-A2.02',
   '10:30': 'Programmeringssprog PEJU SH-A2.02' },
'2019-3-18':
 { '08:30': 'Algoritmer JHAJ SH-A1.19B',
   '10:30': 'Algoritmer JHAJ SH-A1.19B' },
'2019-3-19':
 { '08:30': 'Programmeringssprog MJU SH-A1.13',
   '10:30': 'Programmeringssprog MJU SH-A1.13',
   '12:30': 'Programmeringssprog MJU SH-A1.13' },
'2019-3-20': { '08:30': 'IOS KSD SH-A2.03', '10:30': 'IOS KSD SH-A2.03' },
'2019-3-21':
 { '08:30': 'Algoritmer JHAJ SH-A1.19B',
   '10:30': 'Algoritmer JHAJ SH-A1.19B' },
'2019-3-22':
 { '08:30': 'Programmeringssprog PEJU SH-A2.02',
   '10:30': 'Programmeringssprog PEJU SH-A2.02' },
'2019-3-26':
 { '08:30': 'Programmeringssprog MJU SH-A1.13',
   '10:30': 'Programmeringssprog MJU SH-A1.13' },
'2019-3-27': { '08:30': 'IOS KSD SH-A2.03', '10:30': 'IOS KSD SH-A2.03' },
'2019-3-28':
 { '08:30': 'Algoritmer JHAJ SH-A1.19B',
   '10:30': 'Algoritmer JHAJ SH-A1.19B' },
'2019-3-29':
 { '08:30': 'Programmeringssprog PEJU SH-A2.02',
   '10:30': 'Programmeringssprog PEJU SH-A2.02' },
'2019-3-5':
 { '08:30': 'Programmeringssprog MJU SH-A1.13',
   '10:30': 'Programmeringssprog MJU SH-A1.13',
   '12:30': 'Programmeringssprog MJU SH-A1.13' },
'2019-3-6': { '08:30': 'IOS KSD SH-A2.03', '10:30': 'IOS KSD SH-A2.03' },
'2019-3-7':
 { '08:30': 'Algoritmer JHAJ SH-A1.13',
   '10:30': 'Algoritmer JHAJ SH-A1.13' },
'2019-3-8': { '08:30': 'IOS KSD SH-A2.03', '10:30': 'IOS KSD SH-A2.03' },
'2019-4-1':
 { '08:30': 'Algoritmer JHAJ SH-A1.19B',
   '10:30': 'Algoritmer JHAJ SH-A1.19B' },
'2019-4-10': { '08:30': 'IOS KSD SH-A2.03', '10:30': 'IOS KSD SH-A2.03' },
'2019-4-11':
 { '08:30': 'Algoritmer JHAJ SH-A1.11',
   '10:30': 'Algoritmer JHAJ SH-A1.11' },
'2019-4-12':
 { '08:30': 'Programmeringssprog PEJU SH-A2.02',
   '10:30': 'Programmeringssprog PEJU SH-A2.02' },
'2019-4-15':
 { '08:30': 'P�skeferie',
   '10:30': 'P�skeferie',
   '12:30': 'P�skeferie',
   '14:30': 'P�skeferie' },
'2019-4-16':
 { '08:30': 'P�skeferie',
   '10:30': 'P�skeferie',
   '12:30': 'P�skeferie',
   '14:30': 'P�skeferie' },
'2019-4-17':
 { '08:30': 'P�skeferie',
   '10:30': 'P�skeferie',
   '12:30': 'P�skeferie',
   '14:30': 'P�skeferie' },
'2019-4-18':
 { '08:30': 'P�skeferie',
   '10:30': 'P�skeferie',
   '12:30': 'P�skeferie',
   '14:30': 'P�skeferie' },
'2019-4-19':
 { '08:30': 'P�skeferie',
   '10:30': 'P�skeferie',
   '12:30': 'P�skeferie',
   '14:30': 'P�skeferie' },
'2019-4-22':
 { '08:30': 'P�skeferie',
   '10:30': 'P�skeferie',
   '12:30': 'P�skeferie',
   '14:30': 'P�skeferie' },
'2019-4-23':
 { '08:30': 'Programmeringssprog PEJU SH-A1.13',
   '10:30': 'Programmeringssprog PEJU SH-A1.13' },
'2019-4-24': { '08:30': 'IOS KSD SH-A2.03', '10:30': 'IOS KSD SH-A2.03' },
'2019-4-25':
 { '08:30': 'Algoritmer JHAJ SH-A1.19B',
   '10:30': 'Algoritmer JHAJ SH-A1.19B' },
'2019-4-3': { '08:30': 'IOS KSD SH-A2.03', '10:30': 'IOS KSD SH-A2.03' },
'2019-4-30':
 { '08:30': 'Programmeringssprog PEJU SH-A1.13',
   '10:30': 'Programmeringssprog PEJU SH-A1.13' },
'2019-4-4':
 { '08:30': 'Algoritmer JHAJ SH-A1.19B',
   '10:30': 'Algoritmer JHAJ SH-A1.19B' },
'2019-4-5': { '08:30': 'IOS KSD SH-A2.03', '10:30': 'IOS KSD SH-A2.03' },
'2019-4-8':
 { '08:30': 'Algoritmer JHAJ SH-A1.19B',
   '10:30': 'Algoritmer JHAJ SH-A1.19B' },
'2019-4-9':
 { '08:30': 'Programmeringssprog PEJU SH-A1.13',
   '10:30': 'Programmeringssprog PEJU SH-A1.13' },
'2019-5-1': { '08:30': 'IOS KSD SH-A2.03', '10:30': 'IOS KSD SH-A2.03' },
'2019-5-10': { '08:30': 'IOS KSD SH-A2.03', '10:30': 'IOS KSD SH-A2.03' },
'2019-5-13':
 { '08:30': 'Algoritmer JHAJ SH-A1.19B',
   '10:30': 'Algoritmer JHAJ SH-A1.19B',
   '12:30': 'Algoritmer JHAJ SH-A1.19B' },
'2019-5-14':
 { '08:30': 'Algoritmer JHAJ SH-A1.19B',
   '10:30': 'Algoritmer JHAJ SH-A1.19B',
   '12:30': 'Algoritmer JHAJ SH-A1.19B',
   '14:30': 'Algoritmer JHAJ SH-A1.19B' },
'2019-5-16':
 { '08:30': 'Algoritmer JHAJ SH-A1.19B',
   '10:30': 'Algoritmer JHAJ SH-A1.19B',
   '12:30': 'Algoritmer JHAJ SH-A1.19B' },
'2019-5-17':
 { '08:30': 'Bededag',
   '10:30': 'Bededag',
   '12:30': 'Bededag',
   '14:30': 'Bededag' },
'2019-5-2':
 { '08:30': 'Algoritmer JHAJ SH-A1.19B',
   '10:30': 'Algoritmer JHAJ SH-A1.19B' },
'2019-5-20':
 { '08:30': 'Programmeringssprog MJU SH-A2.02',
   '10:30': 'Programmeringssprog MJU SH-A2.02',
   '12:30': 'Programmeringssprog PEJU SH-A2.02' },
'2019-5-21': { '12:30': 'Programmeringssprog PEJU SH-A1.19B' },
'2019-5-22':
 { '08:30': 'Programmeringssprog MJU SH-A2.02',
   '10:30': 'Programmeringssprog MJU SH-A2.02' },
'2019-5-23':
 { '08:30': 'Programmeringssprog PEJU SH-A1.19B',
   '10:30': 'Programmeringssprog PEJU SH-A1.19B' },
'2019-5-24':
 { '08:30': 'Programmeringssprog MJU SH-A2.02',
   '10:30': 'Programmeringssprog PEJU SH-A2.02' },
'2019-5-30':
 { '08:30': 'Kr Himmelfart',
   '10:30': 'Kr Himmelfart',
   '12:30': 'Kr Himmelfart',
   '14:30': 'Kr Himmelfart' },
'2019-5-31':
 { '08:30': 'Kr Himmelfart',
   '10:30': 'Kr Himmelfart',
   '12:30': 'Kr Himmelfart',
   '14:30': 'Kr Himmelfart' },
'2019-5-6':
 { '08:30': 'Algoritmer JHAJ SH-A1.19B',
   '10:30': 'Algoritmer JHAJ SH-A1.19B' },
'2019-5-7':
 { '08:30': 'Programmeringssprog MJU SH-A1.13',
   '10:30': 'Programmeringssprog MJU SH-A1.13',
   '12:30': 'Programmeringssprog MJU SH-A1.13' },
'2019-5-8': { '08:30': 'IOS KSD SH-A2.03', '10:30': 'IOS KSD SH-A2.03' },
'2019-5-9':
 { '08:30': 'Algoritmer JHAJ SH-A1.19B',
   '10:30': 'Algoritmer JHAJ SH-A1.19B' },
'2019-6-3':
 { '08:30': 'IOS KSD SH-A2.03',
   '10:30': 'IOS KSD SH-A2.03',
   '12:30': 'IOS KSD SH-A2.03' },
'2019-6-4':
 { '08:30': 'IOS KSD SH-A2.03',
   '10:30': 'IOS KSD SH-A2.03',
   '12:30': 'IOS KSD SH-A2.03' },
'2019-6-6': { '08:30': 'IOS KSD SH-A2.03', '10:30': 'IOS KSD SH-A2.03' },
'2019-6-7': { '08:30': 'IOS KSD SH-A2.03', '10:30': 'IOS KSD SH-A2.03' },
classStart: [ '08:30', '10:30', '12:30', '14:30' ] };

// ========================================
export default App;