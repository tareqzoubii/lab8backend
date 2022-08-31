'use strict'

const express = require('express');
const server = express();
const cors = require('cors');
server.use((cors()));
require('dotenv').config();
const axios = require('axios');

const PORT = process.env.PORT; // this is my local host port

// https://api.weatherbit.io/v2.0/forecast/daily?city=Amman&key=a9ecd9c216b74668937b705abf50e18a&days=16 // weather api

// test route
// http://localhost:3456/
server.get('/', (req, res) => {
    res.send("Hello from the home route for lab 8 "); // everything is okay untill now ;)
})



// https://api.themoviedb.org/3/search/movie?api_key=1a5043258c133bdf5b01b0f797b85e8d&query=Jack+Reacher  // movie api

// http://localhost:3456/getMovie?movieQuery=city // our end point!!!
server.get('/getMovie', getMovieHandler);
async function getMovieHandler(req, res) {
    const movieQ = req.query.movieQuery;
    //console.log(movieQ);
    const url2 = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.moviekey2}&query=${movieQ}`;
    //console.log(url);

    try
    {
        let apiMovieResult = await axios.get(url2);
        //console.log("HEYYYYY!");
        res.send(apiMovieResult.data);
        let movieArr = apiMovieResult.data.results.map(ele => {
            console.log(ele);
            return new movieInfo(ele);
        })
        res.send(movieArr);
    }
    catch
    {
        //ERORR!!
    }
}

class movieInfo {
    constructor(ele){
        this.poster_path = ele.poster_path;
        this.original_title = ele.original_title;
        this.overview = ele.overview;
        this.vote_average = ele.vote_average;
        this.release_date = ele.release_date;
    }
}


// http://localhost:3456/getWeather?searchQuery=city // our end point!!!
server.get('/getWeather', getWeatherHandler);

async function getWeatherHandler(req, res) {
    const searchQ = req.query.searchQuery;
    //const lonQ = req.query.lonQuery;
    //const latQ = req.query.latQuery;
    // console.log(searchQ); // very good ;)
    // now i have to send a REQ to weatheAPI server
    const URL = `https://api.weatherbit.io/v2.0/forecast/daily?city=${searchQ}&key=${process.env.key}&days=16`;
    // console.log(URL); // every thing is okay ;)


try 
{
let apiResult = await axios.get(URL);
// console.log("Hello!"); ok GOOD! ;)
// now i want to take the weather for 16 day!
//res.send(apiResult.data);
// let cityName = apiResult.data.city_name;
// console.log(cityName);
let weatherArr = apiResult.data.data.map(val => {
    //console.log(val);
    //console.log("HEY TAREQ");
    return new weatherInfo(val);
    
})
res.send(weatherArr);

}
catch
{
    // ERROR!!
}
}


class weatherInfo {
    constructor(val){
        this.description = val.weather.description;
        this.datetime = val.datetime;

    }
}

server.listen(PORT, () =>{
    console.log(`This is the server for  ${PORT} `);
})