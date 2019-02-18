import React, { useState, useEffect } from 'react';
import WeekSchedule from './components/WeekSchedule';
import Input from './components/Input';

// Main Component
function App() {
  const [schedule, setSchedule] = useState({});
  const [currentWeek, setCurrentWeek] = useState({
    weekNo: new Date().getWeek(),
    
  });


  useEffect( () => {
    fetchSchedule('http://localhost:8080/api/combine/educationId=1&menuId=1&account=timetable_subject&subjectId=18596/educationId=1&menuId=1&account=timetable_subject&subjectId=18593/educationId=1&menuId=1&account=timetable_subject&subjectId=18597')
    
  }, []);

  const fetchSchedule = async (url) => {
    fetch(url)
      .then(response => response.json())
      .then(json => {
        setSchedule(json);
      })
  }

  
  return (
    <div className="App">
      <Form changeCurrentWeek={setCurrentWeek}/>
      <WeekSchedule week={currentWeek.schedule}/>
    </div>
  );
}

// Form Component
const Form = (props) => {
  const [values, setValues] = useState({ weekInput: "" });

  const onChange = (name, value) => {
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    props.changeCurrentWeek(values.weekInput);
    console.log(JSON.stringify(values.weekInput));
  }

  return (
    <form onSubmit={e => e.preventDefault() || handleSubmit()}>
      <Input
        name="weekInput"
        placeholder="uge"
        type="text"
        value={values.user}
        onChange={onChange}
      />
      <input type="submit" />
    </form>
  );
};

// --------------------------- UTILITY ---------------------------

// Returns the weeknumber of the date
// eslint-disable-next-line
Date.prototype.getWeek = function() {
  var onejan = new Date(this.getFullYear(),0,1);
  return Math.ceil((((this - onejan) / 86400000) + onejan.getDay())/7);
}

// Extracts the activities from the specified week(week number) and returns a "week schedule"
// Throws an error if the schedule doesn't contain the specified week
function getWeekFromSchedule(schedule, week) {
  console.log('keys: ' + Object.keys(schedule).length)
  console.log('week: ' + week)
  const datesInWeek = Object.keys(schedule).filter(date => new Date(date).getWeek() === week)
  const weekSchedule = {
      classStart: schedule.classStart,
      datesInWeek,
  };
  datesInWeek.forEach( date => {weekSchedule[date] = schedule[date]});

  if (Object.keys(weekSchedule).length === 7)
      return weekSchedule;
  else 
      console.log();//throw new Error('The specified schedule does not contain the specified week');
}

/*
const testSchedule = { '2019-1-28': { '08:30': 'IOS KSD SH-A2.03', '10:30': 'IOS KSD SH-A2.03' },
'2019-1-29': { '08:30': '' },
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
'2019-2-14': { '08:30': '' },
'2019-2-15': { '08:30': '' },
'2019-2-18': { '08:30': '' },
'2019-2-19':
 { '08:30': 'Programmeringssprog MJU SH-A1.13',
   '10:30': 'Programmeringssprog MJU SH-A1.13' },
'2019-2-20': { '08:30': 'IOS KSD SH-A2.03', '10:30': 'IOS KSD SH-A2.03' },
'2019-2-21': { '08:30': '' },
'2019-2-22': { '08:30': '' },
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
'2019-3-12': { '08:30': '' },
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
'2019-3-25': { '08:30': '' },
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
'2019-3-4': { '08:30': '' },
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
'2019-4-2': { '08:30': '' },
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
'2019-4-26': { '08:30': '' },
'2019-4-29': { '08:30': '' },
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
'2019-5-15': { '08:30': '' },
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
'2019-5-21':
 { '08:30': '', '12:30': 'Programmeringssprog PEJU SH-A1.19B' },
'2019-5-22':
 { '08:30': 'Programmeringssprog MJU SH-A2.02',
   '10:30': 'Programmeringssprog MJU SH-A2.02' },
'2019-5-23':
 { '08:30': 'Programmeringssprog PEJU SH-A1.19B',
   '10:30': 'Programmeringssprog PEJU SH-A1.19B' },
'2019-5-24':
 { '08:30': 'Programmeringssprog MJU SH-A2.02',
   '10:30': 'Programmeringssprog PEJU SH-A2.02' },
'2019-5-27': { '08:30': '' },
'2019-5-28': { '08:30': '' },
'2019-5-29': { '08:30': '' },
'2019-5-3': { '08:30': '' },
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
'2019-6-5': { '08:30': '' },
'2019-6-6': { '08:30': 'IOS KSD SH-A2.03', '10:30': 'IOS KSD SH-A2.03' },
'2019-6-7': { '08:30': 'IOS KSD SH-A2.03', '10:30': 'IOS KSD SH-A2.03' },
classStart: [ '08:30', '10:30', '12:30', '14:30' ] };
*/
// ========================================
export default App;