var time = new Date().getHours();
var getWeather = function(api){
    $.getJSON(api, function(data){
        var temp_c = Math.round(data.main.temp - 273.15);
        var temp_f = Math.round(1.8 * (data.main.temp - 273.15) + 32);
        var desc = data.weather[0].description;
        var id = data.weather[0].id;
        var bg;

        if (id <= 232) {
        bg = 'img/storm.svg';
      } else if (id >= 300 && id <= 321) {
        bg = 'img/rain.svg';
      } else if (id >= 500 && id <= 531) {
        bg = 'img/rain.svg';
      } else if (id >= 600 && id <= 622) {
        bg = 'img/snowflake.svg';
      } else if (id >= 701 && id <= 781) {
        bg = 'img/cloudy.svg';
      } else if (id == 800) {
        if (time > 6 && time < 22) {
            bg = 'img/sun.svg';
        } else {
            bg = 'img/moon.svg';
        }
      } else if (id >= 801 && id <= 804) {
        bg = 'img/cloudy.svg';
      } else if (id >= 900 && id <= 906) {
        bg = 'img/stormy.svg';
      } else if (id >= 951 && id <= 962) {
        bg = 'img/cloudy.svg';
      } else {
        bg = 'img/cloudy.svg';
      }

      $('img').attr('src', bg);
      $('#temp_c').text(temp_c);
      $('#temp_f').text(temp_f);
      $('#description').text(desc+'.');
      response = true;
    });
}

var colors = ['#d62d20', '#0057e7', '#008744', '#ffa700'];
var current = 0;
var response = false;
var typed = false;
var seconds = 0;
$(document).ready(function(){

    $.getJSON('https://freegeoip.net/json/', function(response){
        var lat = response.latitude;
        var lon = response.longitude;
        var key = 'fe97d937ab684597040829d2b17fb071';
        var api = 'https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + key;
        getWeather(api);
    });

    var changeColor = function(){
        current++;
        if (current > 3){
            current = 0;
        }
        $('h1').animate({color: colors[current]}, 1500, changeColor);
    };

    changeColor();

    var transition = function(){
        if (response){
            $('#start').animate({opacity: 0}, 1500, function(){
                $('#start').css('display', 'none');
                $('#weather').animate({opacity: 1}, 1500);
            });
        } else if(!typed && seconds > 4){
            $('#wait').typeTo(' IS DELAYING');
            typed = true;
        } else {
            seconds++;
        }
    }

   setInterval(transition, 1000);

   $('#weather').css('margin-top', ($(window).height())/2-226.5);

   $(window).resize(function(){
      $('#weather').css('margin-top', ($(window).height())/2-226.5);
   });

});