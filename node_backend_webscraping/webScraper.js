const fetch = require('request-promise');
const $ = require('cheerio');

const skema = 'https://skemasys.akademiaarhus.dk/index.php?educationId=1&menuId=1&account=timetable_subject&subjectId=18596';


fetchWebsite(skema);

async function fetchWebsite(url){
  let html = await fetch(url);
  const weekTables = $('table.calendar', html);
  const weeks = [];

  for (let i = 0; i<weekTables.length; i++) {
    const week = {classStart: [], Mandag: {}, Tirsdag: {}, Onsdag: {}, Torsdag: {}, Fredag: {}};

    const weekDays = $('.header', weekTables[i]); // length 5, containing the weekdays with dates: 'Weekday dd/mm'
    const classTimes = $('.leftHeader', weekTables[i]); // length 4, containing all the times that classes start 'hh/mm'.  
    const weekClasses = $('.date', weekTables[i]); // length 20, containing all the classes for the week. 


    for (let i = 0; i<weekDays.length; i++) {
      const date = $(weekDays[i]).text().split(' ')[1];
      const weekday = $(weekDays[i]).text().split(' ')[0]; 
      week[weekday].date = date //<-- Build week object

      //console.log(` ----- ${weekday} ${date}`);

      for (let j = 0; j<classTimes.length; j++) {
        const classTime = $(classTimes[j]).text().trim();
        const subject = $(weekClasses[i+j*5]).text().trim();
        week[weekday][classTime] = subject; //<-- Build week object

        //console.log(classTime + ' | ' + subject);
      }
    }

    for (let j = 0; j<classTimes.length; j++) {
      const classTime = $(classTimes[j]).text().trim();
      week.classStart.push(classTime); //<-- Build week object
    }
    console.log(week);

  }

  return '';
}
