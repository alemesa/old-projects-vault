'use strict';

var _data;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var apiKey = '0ceedd539b0a1efa834d0c7318eb6355';
var searchQuery = 'https://api.themoviedb.org/3/search/movie?api_key=' + apiKey + '&query=Gladiator';

new Vue({
  el: '#app',
  data: (_data = {
    title: '',
    status: '',
    tagline: '',
    seasons: '',
    year: '',
    rated: '',
    runtime: '',
    genre: '',
    plot: '',
    budget: '',
    revenue: '',
    language: '',
    country: '',
    production: '',
    imdbID: '',
    url: 'https://www.utopolis.lu/bundles/utopoliscommon/images/movies/movie-placeholder.j' + 'pg'
  }, _defineProperty(_data, 'imdbID', 'http://www.imdb.com/title/'), _defineProperty(_data, 'search', false), _defineProperty(_data, 'movie', false), _data),
  methods: {
    clearInput: function clearInput() {
      this.title = '';
      this.search = false;
    },
    findData: function findData() {
      var app = this;
      if (this.title !== '') {
        this.title = this.title.charAt(0).toUpperCase() + this.title.slice(1);

        var searchterm = '';
        var decompose = app.title.split(' ');
        for (var i = 0; i < decompose.length; i++) {
          if (i < decompose.length - 1) searchterm += decompose[i] + '+';else searchterm += decompose[i];
        }

        app.status = 'Searching...';
        //GETTING FIRST RESULT
        axios.get('https://api.themoviedb.org/3/search/movie?api_key=' + apiKey + '&query=' + searchterm).then(function (response) {
          console.log(searchterm);

          console.log(response);
          if (response.data.results[0]) {
            console.log('Found one result');
            app.search = true;
            app.status = '✓';

            //GETTING DETAILS
            axios.get('https://api.themoviedb.org/3/movie/' + response.data.results[0].id + '?api_key=0ceedd539b0a1efa834d0c7318eb6355').then(function (response2) {
              console.log(response2.data);
              app.search = true;

              app.title = response2.data.title;
              app.runtime = response2.data.runtime;
              app.tagline = response2.data.tagline;

              /*
              response2.data.genres.forEach(function(element) {
              app.genre += element.name + " | ";
              }, this);
              */

              app.genre = response2.data.genres[0].name;
              if (response2.data.genres[1].name) {
                app.genre += ' | ' + response2.data.genres[1].name;
              }
              if (response2.data.genres[2].name) {
                app.genre += ' | ' + response2.data.genres[2].name;
              }

              app.url = 'https://image.tmdb.org/t/p/w500' + response2.data.poster_path;
              if (app.url == 'N/A') {
                app.url = './images/placeholder.jpg';
              }
              app.year = response2.data.release_date;
              app.rated = response2.data.popularity.toFixed(2);
              app.runtime = response2.data.runtime;
              app.plot = response2.data.overview;

              app.budget = (response2.data.budget / 1000000).toFixed(2);
              app.revenue = (response2.data.revenue / 1000000).toFixed(2);

              app.language = response2.data.spoken_languages[0].name;

              /* response2.data.production_countries.forEach(function(element) {
              app.country += element.name + " | ";
              }, this); */

              app.country = response2.data.production_countries[0].name;

              app.production = response2.data.production_companies[0].name;
              if (response2.data.production_companies[1].name) {
                app.production += ' & ' + response2.data.production_companies[1].name;
              }

              app.imdbID = 'http://www.imdb.com/title/' + response2.data.imdb_id + '/?ref_=nv_sr_1';
            }).catch(function (error) {
              app.search = false;
            });
          } else {
            console.log('No results found');
            app.search = false;
            app.status = '✗';
          }
        }).catch(function (error) {
          app.search = false;
        });
      } else {
        app.status = '<- ?';
        console.log(app.status);
      }
    }
  }
});