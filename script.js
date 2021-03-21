/**
 * Fetch API data
 */
function getAPIdata() {
	var url = 'https://api.openweathermap.org/data/2.5/forecast';
	var apiKey ='85532dca33b10140da462e2297968526';
	var city = 'the%20Hague';

	// construct request
	var request = url + '?' + 'appid=' + apiKey + '&' + 'q=' + city;
	
	// get weather forecast
	fetch(request)

	// parse to JSON format
	.then(function(response) {
		if(!response.ok) throw Error(response.statusText);
		return response.json();
	})
	
	// render weather per day
	.then(function(response) {
		console.log(response);
		// render weatherCondition
		onAPISucces(response);
	})
	
	// catch error
	.catch(function (error) {
		// onAPIError();
		console.error('Request failed', error);
	});
}

/**
 * Render weather listing
 */
function onAPISucces(response) {

	var weatherList = response.list;
	var weatherBoxDegrees = document.getElementById('degrees');
	var weatherBoxIcon = document.getElementById('icon');
	var iconForecast;
	var degreesForecast;

	for(var i=0; i< weatherList.length; i++){
		//calc kelvin to celcius
		var temp = Math.floor(weatherList[i].main.temp - 273.15);
		var iconUrl = 'http://openweathermap.org/img/w/'+weatherList[i].weather[0].icon+'.png';

		iconForecast = "<div id='forecastDegrees'>" + temp + '&#176;C </div>';
		degreesForecast ='<div id=" "> <img id="forecastIcon" src="' + iconUrl + '"> </div>';

		weatherBoxDegrees.innerHTML = degreesForecast;
		weatherBoxIcon.innerHTML = iconForecast;

	}
}

/**
 * Error
 */
function updateUIError() {
	var weatherBoxDegrees = document.getElementById('degrees');
	weatherBoxDegrees.className = 'hidden'; 

	var weatherBoxIcon = document.getElementById('icon');
	weatherBoxIcon.className = 'hidden'; 
}
// init data stream
getAPIdata();
// ----------------------------------------------

//zorg dat alle getallen onder de 10 een 0 krijgen: 01 - 02 - 03 - 04 - 05 - 06 - 07 - 08 - 09
function addLeadingZero(getal) {
	if (getal < 10) {
		getal = "0"+ getal;
	}
	return getal;
}

function timeToday() {
	var date = new Date();
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var seconds = date.getSeconds();
	
	var year = date.getFullYear();
	var month = date.getMonth() + 1; 
	var day =  date.getDate();

    var timeH = document.getElementById("timeH");
    var timeM = document.getElementById("timeM");
		
	// textTime.innerHTML = addLeadingZero(hours) + ":" + addLeadingZero(minutes) + ":" + addLeadingZero(seconds);
	timeH.innerHTML = addLeadingZero(hours);
	timeM.innerHTML = addLeadingZero(minutes);
}
timeToday();

function blink() {
	if (document.getElementById("dubbelepunt").style.opacity == 1) {
		document.getElementById("dubbelepunt").style.opacity = "0";
	} else if (document.getElementById("dubbelepunt").style.opacity == 0) {
		document.getElementById("dubbelepunt").style.opacity = "1";
	}
}
//per seconde de nieuwe tijd weergeven
setInterval(function(){
	timeToday();
},1000);

setInterval(function(){
	blink();
},500);

var slideId = document.getElementById("citySlide");
var tokyoImages = ["Fotos/tokyo/tokyo1.jpg","Fotos/tokyo/tokyo2.jpg","Fotos/tokyo/tokyo3.jpg"];
var dubaiImages = ["Fotos/dubai/dubai1.jfif","Fotos/dubai/dubai2.jpeg","Fotos/dubai/dubai3.jpg"];
var detroitImages = ["Fotos/detroit/detroit1.jpg","Fotos/detroit/detroit2.jpg","Fotos/detroit/detroit3.jpg"];
var slide = 0;
var slideshowCity = tokyoImages;
function startSlideShow() {
	setInterval(function(){
		slideId.src = slideshowCity[slide++];
		if (slide == slideshowCity.length) {
			slide = 0;
		}
	},2000)
}
//zorg dat de foto direct wordt weergeven zonder 2s te wachten
slideId.src = slideshowCity[slide++];
startSlideShow();

var tokyo = document.getElementById("tokyo");
var dubai = document.getElementById("dubai");
var detroit = document.getElementById("detroit");

tokyo.onclick = function() {
	tokyo.classList.add("active");
	dubai.classList.remove("active");
	detroit.classList.remove("active");
	slideshowCity = tokyoImages;
}

dubai.onclick = function() {
	dubai.classList.add("active");
	tokyo.classList.remove("active");
	detroit.classList.remove("active");
	slideshowCity = dubaiImages;
}

detroit.onclick = function() {
	detroit.classList.add("active");
	dubai.classList.remove("active");
	tokyo.classList.remove("active");
	slideshowCity = detroitImages;
}