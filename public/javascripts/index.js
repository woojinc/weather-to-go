const axios = require('axios');

document.addEventListener('DOMContentLoaded', () => {

    console.log('0201558025');

    axios.get(`/oneday`)
        .then((response) => {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });

    let isbn = '0201558025';
    axios.get(`/books/${isbn}`)
        .then((response) => {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });

})