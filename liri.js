var twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var inquirer = require('inquirer');
var keys = require('./key.js');

var client = new twitter(keys);

if (process.argv[2].toLowerCase() === "my-tweets"){
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is your Twitter username?',
            name: 'username'
        }
    ]).then(function (inquirerResponse){

        var params = {
            screen_name: inquirerResponse.username,
            count: 20
        };

        client.get('statuses/user_timeline', params, function (error, tweers, response) {
            if (!error) {
                console.log('Here are your last 20 tweets...');
                console.log('----------------------------------------------');
                for (var i = 0; i < tweets.length; i++) {
                    console.log(tweets[i].created_at);
                    console.log(tweets[i].text);
                    console.log('------------------------------------------');
                }
            } else {
                console.log(error);
            }
            });
        });
    } else if (process.argv[2].toLowerCase() === 'spotify-this-song') {
        var spotift = new Spotify({
            id: 'thingsandstuff',
            secret: 'thingsandstuff'
    });

    inquirer.prompt({
        type: 'input',
        message: 'What song would you like to search?',
        name: 'song'

    }).then(function (inquirerResponse) {

        var song = inquirerResponse.song;

        var search = {
            type: 'track',
            query: song
        };
        spotify
            .search(search)
            .then(function (response) {
                console.log('---------------------------------------------------------------');
                for (var i = 0; i < response.tracks.items[0].artists.length; i++) {
                    console.log('Artist: ' + response.tracks.items[0].artists[i].name);
                }
                console.log('Song: ' + response.tracks.items[0].name);
                console.log('Preview: ' + response.tracks.items[0].external_urls.spotify);
                console.log('Album: ' + response.tracks.items[0].album.name);
            })
            .catch(function (err) {
                console.log(err);
            });
    });
} else if (process.argv[2].toLowerCase() === "movie-this") {
    inquirer.prompt({
        type: 'input',
        message: 'What movie would you like to search?',
        name: 'movie'

    }).then(function (inquirerResponse) {

        var movie = inquirerResponse.movie;
        request('http://www.omdbapi.com/?apikey=40e9cece&s=' + movie.toString(), function (error, response, body) {
            var results = JSON.parse(body);
            console.log('Title:', results.Search[0].Title);
            console.log('Release Year: ', results.Search[0].Year);
        });
    });
}
