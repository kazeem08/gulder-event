const fs = require('fs');
const rp = require('request-promise');
const elasticSearch = require('elasticsearch');

//create elasticsearch client
let host = 'http://localhost:9200'
const client = new elasticSearch.Client({
    host,
    log: 'trace'
});

let index = 'audience:msisdn';
let type = 'gulder';

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

const url = `${host}/${index}/${type}`

//loop through and save to ES
obj.forEach(async (element) => {
    const options = {
        uri: url,
        method: 'POST',
        body: element,
        json: true
    };
    arr = [];

    try {
        const response2 = await rp(options);
        console.log('RESPONSE', response2)
    } catch (e) {
        fs.appendFile('output.txt', e, err => {
            if(err){
                console.log(err)
            }
        })
    }

});
    

