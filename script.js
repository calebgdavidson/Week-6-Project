var apiKey = 'e31a85cd9077f77fd8bc2629c094e48d';
var dateFormat = moment().format('dddd, MMMM Do YYYY');
var citySearches = [];

$('.search').on("click", function (event) {
	event.preventDefault();
	city = $(this).parent('.btnPar').siblings('.textVal').val().trim();
	if (city === "") {return;};
	citySearches.push(city);
	localStorage.setItem('city', JSON.stringify(citySearches));
	weatherFiveDateForecast.empty();
	getSearchHistory();
	getTodaysWeather();});

// search history
var searchHistory = $('.citySearches');
function getSearchHistory() {searchHistory.empty();
for (let i = 0; i < citySearches.length; i++) {
	var weatherRow = $('<row>');
	var weatherBtn = $('<button>').text(`${citySearches[i]}`)
	weatherRow.addClass('row histBtnRow');
	weatherBtn.addClass('btn btn-outline-secondary histBtn');
	weatherBtn.attr('type', 'button');
	searchHistory.prepend(weatherRow);
	weatherRow.append(weatherBtn);
} if (!city) {return;}};

var todayCardContent = $('.weatherContent')
function getTodaysWeather() {
var getApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
$(todayCardContent).empty();
$.ajax({
	url: getApiUrl,
	method: 'GET',
}).then(function (response) {
$('.selectedCity').text(response.name);
$('.currentDate').text(dateFormat);
$('.icons').attr('src', `https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`);
	var tempText = $('<p>').text(`Temperature: ${response.main.temp} °F`); todayCardContent.append(tempText);
	var feelsLikeTemp = $('<p>').text(`Feels Like: ${response.main.feels_like} °F`); todayCardContent.append(feelsLikeTemp);
	var humidText = $('<p>').text(`Humidity: ${response.main.humidity} %`); todayCardContent.append(humidText);});
	getFiveDayForecast();};

var weatherFiveDateForecast = $('.weatherForecastFiveDays');
function getFiveDayForecast() {
var getFiveDay = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;
$.ajax({
	url: getFiveDay,
	method: 'GET',
}).then(function (response) {
	var fiveDayArray = response.list;
	var myWeather = [];
$.each(fiveDayArray, function (index, value) { testObj = {
	dateFormat: value.dt_txt.split(' ')[0],
	time: value.dt_txt.split(' ')[1],
	temp: value.main.temp,
	feels_like: value.main.feels_like,
	icon: value.weather[0].icon,
	humidity: value.main.humidity }
if (value.dt_txt.split(' ')[1] === "12:00:00") {
	myWeather.push(testObj);}})
for (let i = 0; i < myWeather.length; i++) {
    var cardDiv = $('<div>');cardDiv.attr('class', 'card text-white bg-primary mb-3 cardOne');cardDiv.attr('style', 'max-width: 200px;');weatherFiveDateForecast.append(cardDiv);
	var headerDiv = $('<div>');headerDiv.attr('class', 'card-header')
	var mmnt = moment(`${myWeather[i].dateFormat}`).format('MM-DD-YYYY');headerDiv.text(mmnt);cardDiv.append(headerDiv)
	var bodyDiv = $('<div>');bodyDiv.attr('class', 'card-body');cardDiv.append(bodyDiv);
	var iconDiv = $('<img>');iconDiv.attr('class', 'icons');iconDiv.attr('src', `https://openweathermap.org/img/wn/${myWeather[i].icon}@2x.png`);bodyDiv.append(iconDiv);
	var feelsLikeTemp = $('<p>').text(`Temperature: ${myWeather[i].temp} °F`);bodyDiv.append(feelsLikeTemp);
	var feelsLikeDiv = $('<p>').text(`Feels Like: ${myWeather[i].feels_like} °F`);bodyDiv.append(feelsLikeDiv);
	var humidText = $('<p>').text(`Humidity: ${myWeather[i].humidity} %`);bodyDiv.append(humidText);}});};
    initLoad();