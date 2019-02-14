const express = require('express');
const router = express.Router();
const webScraper = require('../webScraper');

router.get('/', function (req, res) {
    //Get all products in storage
    res.send(`<h1>API</h1>
     <h3>endpoints:
      <li> /schedule/:id </li> 
      <li> /combine/:id1/id2/../id<i>n</i> </li>
    </h3>`);
})

// TODO
router.get('/schedule/:id', async function (req, res) {
    const url = `https://skemasys.akademiaarhus.dk/index.php?${req.params.id}`;
    schedule = await webScraper.scrapeSchedule(url);
    res.json(schedule);
});

// TODO
router.get(/^\/combine\/(.*)/, async function (req, res) {
    const scheduleParams = req.params[0].split('/');

    const schedules = await Promise.all( 
        scheduleParams.map((params) => {
            return webScraper.scrapeSchedule(`https://skemasys.akademiaarhus.dk/index.php?${params}`)
        })
    );

    const combinedSchedules = webScraper.combineSchedules(...schedules); 
    res.json(combinedSchedules);
});

module.exports = router;