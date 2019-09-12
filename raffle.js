const fs = require('fs');
const rp = require('request-promise');
const elasticSearch = require('elasticsearch');
require('dotenv/config');

//create elasticsearch client
let host = process.env.HOST;
const client = new elasticSearch.Client({
    host,
    log: 'trace'
});

let index = process.env.INDEX;
let type = process.env.TYPE;

//checking the conncetion
client.ping({
    // ping usually has a 3000ms timeout
    requestTimeout: 1000
}, function (error) {
    if (error) {
        console.trace('elasticsearch cluster is down!');
    } else {
        console.log('All is well');
    }
});

//read the data
let rawdata = fs.readFileSync('data.json');
console.log(rawdata)
let obj = JSON.parse(rawdata);

//loop through and save to ES
obj.forEach(async (element) => {
    const url = `${host}/${index}/${type}/${element.msisdn}`

    const options = {
        uri: url,
        method: 'POST',
        body: element,
        json: true
    };

    try {
        const response2 = await rp(options);
        console.log('RESPONSE', response2)
    } catch (e) {
        fs.appendFile('output.txt', e, err => {
            if (err) {
                console.log(err)
            }
        })
    }

});



