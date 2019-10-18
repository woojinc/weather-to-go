
const express = require('express');
const app = express();
const path = require('path');
const fetch = require('node-fetch');
const PORT = process.env.PORT || 8080; // process.env accesses heroku's environment variables
const SECRETKEY = process.env.SECRETKEY || require("./auth_token.js");

app.use(express.static('dist'))

app.get('/', (request, res) => {
    res.sendFile(path.join(__dirname, './dist/index.html'))
})

// create route to get single book by its isbn
// app.get('/oneday', (request, response) => {
//     // make api call using fetch
//     debugger
//     fetch(`https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND&datatypeid=TAVG&locationcategoryid=CITY&startdate=2010-01-01&enddate=2010-01-02`, {
//         method: 'get',
//         headers: {
//             'token': `${token.noaaAuthToken}`,
//             // 'Content-Type': 'application/x-www-form-urlencoded'
//         },
//     })
//         .then((response) => {
//             debugger
//             console.log('0201558025');
//             return response.text();
//         }).then((body) => {
//             let results = JSON.parse(body)
//             console.log(results)   // logs to server
//             response.send(results) // sends to frontend
//         });
// });

// // create route to get single book by its isbn
// app.get('/books/:isbn', (request, response) => {
//     // make api call using fetch
//     fetch(`http://openlibrary.org/api/books?bibkeys=ISBN:${request.params.isbn}&format=json&jscmd=data`)
//         .then((response) => {
//             return response.text();
//         }).then((body) => {
//             let results = JSON.parse(body)
//             console.log(results)   // logs to server
//             response.send(results) // sends to frontend
//         });
// });

// // create a search route
// app.get('/search', (request, response) => {
//     fetch(`http://openlibrary.org/search.json?q=${request.query.string}`)
//         .then((response) => {
//             return response.text();
//         }).then((body) => {
//             let results = JSON.parse(body)
//             console.log(results)
//             response.send(results)
//         });
// });

app.listen(PORT, () => {
    console.log(__dirname);
    console.log(`listening on ${PORT}`)
})