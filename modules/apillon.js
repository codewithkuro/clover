const { Storage, LogLevel, FileStatus } = require('@apillon/sdk');
const fs = require('fs');

const storage = new Storage({
    key: 'bc7a9ad3-cf60-439b-bf51-8abfe81850c5',
    secret: 'Fws6pFi9kr3L',
    logLevel: LogLevel.VERBOSE
});

let buckets = storage.listBuckets();
buckets.then(b => {
    console.log('Found buckets: ', b);
});


module.exports = storage;

