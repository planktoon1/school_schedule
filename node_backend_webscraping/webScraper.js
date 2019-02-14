const fetch = require('request-promise');
const $ = require('cheerio');
/*
const iosUrl = 'https://skemasys.akademiaarhus.dk/index.php?educationId=1&menuId=1&account=timetable_subject&subjectId=18596';
const algoritmerUrl = 'https://skemasys.akademiaarhus.dk/index.php?educationId=1&menuId=1&account=timetable_subject&subjectId=18593';
const progSprogUrl = 'https://skemasys.akademiaarhus.dk/index.php?educationId=1&menuId=1&account=timetable_subject&subjectId=18597';

app();

async function app() {
  const [iosSchedule, algSchedule, proSchedule] = await Promise.all([
    scrapeSchedule(iosUrl), 
    scrapeSchedule(algoritmerUrl), 
    scrapeSchedule(progSprogUrl)
  ]);

  const combinedSchedules = combineSchedules(iosSchedule, algSchedule, proSchedule);

  console.log(combinedSchedules);
} 
*/

//Scrapes the url and builds an object with all the dates as individual properties
exports.scrapeSchedule = async (url) => {
  let html = await fetch(url);
  const weekTables = $('table.calendar', html); // Object with all the tables representing a school week
  const schedule = {
    classStart: [],
  };

  // Containing all the times that classes start for the first week 'hh/mm'.
  // Assumes all weeks in the schedule has the same class start times as the first week
  const classTimes = $('.leftHeader', weekTables[0]);

  for (let j = 0; j<classTimes.length; j++) {
    const classTime = $(classTimes[j]).text().trim();
    schedule.classStart.push(classTime); //<-- Build schedule
  }

  //for every week
  for (let i = 0; i<weekTables.length; i++) {
    const weekDays = $('.header', weekTables[i]); // Containing the weekdays with dates: 'Weekday dd/mm'
    const weekClasses = $('.date', weekTables[i]); // Containing all the classes for the week 'CLASS TEACHERALIAS ROOMID'. 
    
    //for every weekday
    for (let i = 0; i<weekDays.length; i++) {
      let date = $(weekDays[i]).text().split(' ')[1]; 
      date = toDateString(date);
      //for each class in that weekday
      for (let j = 0; j<classTimes.length; j++) {
        const classTime = $(classTimes[j]).text().trim();
        const subject = $(weekClasses[i+j*5]).text().trim();

        if (!schedule[date]/* && subject*/) { // Deliberately adding empty days 
          schedule[date] = {};
          schedule[date][classTime] = subject; //<-- Build date object
        } else if (subject && schedule[date]) {
          schedule[date][classTime] = subject; //<-- Build date object
        }
      }
    }
  }
  return schedule;
}

// Combines two or more schedules into one schedule
exports.combineSchedules = (schedule_A, ...moreSchedules) => {
  const newSchedule = JSON.parse(JSON.stringify(schedule_A));

  for (schedule of moreSchedules) {
    // combine schedules 
    for (date in schedule) {
      if (date === 'classStart') continue;
      
      for (time in schedule[date]) {
        
        // the date doesnt exist in the new schedule already
        if (!newSchedule[date]) {
          newSchedule[date] = {};
          newSchedule[date][time] = schedule[date][time];
        }
        // the date exists but the specific class start time does not 
        else if (newSchedule[date] && !newSchedule[date][time]) {
          newSchedule[date][time] = schedule[date][time];  
        } 
        // the date exists and the classstart time already has a class in it
        else if (newSchedule[date] && newSchedule[date][time] && schedule[date][time]) {
          if (newSchedule[date][time] !== schedule[date][time])
            newSchedule[date][time] += `\n${schedule[date][time]}`;
        }
      }
    }
  }
  
  return sortKeysOfObject(newSchedule)
}


// --------------------------- UTILITY FUNCTIONS ---------------------------

// Takes a string in format: 'day/month' and returns '2019-month-day'
// Makes is possible to convert to a Date easily  
function toDateString(dateString) {
  const month = dateString.split('/')[1];
  const day = dateString.split('/')[0];
  return new Date(`2019-${month}/${day}`).toLocaleDateString();
}

//Takes an unordered object and returnes an NEW object where the keys are lexicographically sorted
//(used in 'combineSchedules')  
function sortKeysOfObject(unordered) {
  const ordered = {};

  Object.keys(unordered).sort().forEach(function(key) {
    ordered[key] = unordered[key];
  });

  return ordered;
}